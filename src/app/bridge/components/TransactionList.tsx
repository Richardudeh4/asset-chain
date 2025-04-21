/* eslint-disable @typescript-eslint/no-explicit-any */
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import greenCheck from "../../../../public/assets/greenCheck.svg";
import message from "../../../../public/assets/message.svg";
import assetLoad from "../../../../public/assets/assetLoad.gif";

import { ChainBlock, useWallet } from "@/context/web3";
import { useEffect, useState } from "react";
import {
  ChainTokenBridgeFees,
  SignedTransaction,
  useBridge,
} from "@/context/bridge";
import { TokenDecimal, useToken } from "@/context/token";
import { getChain } from "./BuySelect";
import { BridgeAction, ChainId } from "@/lib/types";
import { ContractTransactionResponse, formatUnits } from "ethers";
import { isProd } from "@/config/env-var";
import { convertTimestampDate, extractError } from "@/lib/helpers";
import { ClaimDialog } from "./ClaimDialog";
import { defaultChainId } from "@/lib/constants";

const transactionCategory = [
  { name: "All", key: "all" },
  { name: "Claimed", key: "claimed" },
  { name: "Unclaimed", key: "unclaimed" },
];

export function getAmount(
  amount: bigint,
  decimals: TokenDecimal,
  fromChain: ChainId,
  toChainId: ChainId,
  symbol: string,
  fees: ChainTokenBridgeFees
) {
  if (!decimals || !decimals[fromChain]) return 0;
  if (!decimals || !decimals[toChainId]) return 0;

  const tokenDecimal = decimals[fromChain].find((d) => d.symbol === symbol);
  if (!tokenDecimal) return 0;

  const toTokenDecimal = decimals[toChainId].find((d) => d.symbol === symbol);

  if (!toTokenDecimal) return 0;

  let _amount = +formatUnits(
    amount,
    Math.min(
      Number(tokenDecimal.decimal.toString()),
      Number(toTokenDecimal.decimal.toString())
    )
  );

  const fromFee = fees[fromChain][symbol];
  const toFee = fees[toChainId][symbol];
  if ((symbol === "USDC" && !isProd) || (symbol === "BTC" && !isProd)) {
    _amount *= 10;
  }
  if (!fromFee || !toFee) return _amount;

  const feeSend = (_amount * Number(fromFee.feeSend)) / 10000;
  const totalFee =
    ((_amount - feeSend) * Number(toFee.feeFull)) / 10000 + feeSend;

  return _amount - totalFee;
}

export function blocksToClaim(
  transaction: SignedTransaction,
  currentBlocks: ChainBlock
) {
  if (transaction.fulfilled) {
    return {
      message: "Claimed",
      isConfirmed: true,
      percent: `100%`,
      blockNumber: 0,
    };
  }
  let isConfirmed = false;
  const block =
    currentBlocks[
      transaction.transaction.fromChain.replace("evm.", "") as ChainId
    ];
  const blockNumber = block ? Number(block) : 0;
  if (blockNumber === 0) {
    return {
      message: "Loading...",
      isConfirmed: false,
      percent: `0%`,
      blockNumber,
    };
  }
  const difference =
    Number(transaction.claimInfo.txBlock) +
    transaction.claimInfo.confirmations -
    blockNumber;
  isConfirmed = Math.max(difference, 0) === 0;
  const percent =
    transaction.claimInfo.confirmations > 0
      ? 100 * (1 - difference / transaction.claimInfo.confirmations)
      : 0;

  return {
    message: isConfirmed
      ? "Confirmed"
      : `Blocks left: ${difference} (${percent.toFixed(2)}%)`,
    isConfirmed,
    percent: percent < 0 ? "0%" : `${percent.toFixed(2)}%`,
    blockNumber,
  };
}

export function TransactionList() {
  const [selectedCategory, setSelectedCategory] = useState(
    transactionCategory[0]
  );
  const [transaction, setTransaction] = useState<SignedTransaction | undefined>(
    undefined
  );
  const [selectedTransactionChain, setSelectedTransactionChain] =
    useState<ChainId | null>(null);
  const [open, setOpen] = useState(false);
  const [chainSwitch, setChainSwitch] = useState({
    switching: false,
    switchChain: false,
    to: defaultChainId,
  });
  const [dialogError, setDialogError] = useState<any>(undefined);
  const [claimTx, setClaimTx] = useState<
    ContractTransactionResponse | undefined
  >(undefined);

  const { isConnected, currentBlocks, switchChain, chainId, address } =
    useWallet();
  const {
    loadingTransactions,
    signedTransactions,
    bridgesFees,
    fulfill,
    bridgeAwaitingTransaction,
    getSignedTransactions,
  } = useBridge();
  const { decimals, getBalances } = useToken();

  const keys = signedTransactions ? Object.keys(signedTransactions) : [];

  // const skip = (page - 1) * limit;

  // console.log
  let transactions: SignedTransaction[] = [];

  keys.forEach((k) => {
    transactions = transactions.concat(
      signedTransactions[k].signedTransactions
    );
  });

  const filteredTransactions = transactions
    .sort(
      (a, b) =>
        Number(b.transaction.timestamp) - Number(a.transaction.timestamp)
    )
    .filter((t) => {
      if (selectedCategory.key === "all") return true;
      if (selectedCategory.key === "claimed") return t.fulfilled;
      if (selectedCategory.key === "unclaimed") return !t.fulfilled;
      return false;
    });

  useEffect(() => {
    _updateTransaction();
  }, [open, selectedTransactionChain, transaction]);

  // useEffect(() => {
  //   if (claimNow) {
  //     claim(transaction);
  //   }
  // }, [claimNow]);

  function _updateTransaction() {
    if (!open || !selectedTransactionChain || !transaction) {
      return;
    }
    const _transactions = signedTransactions[selectedTransactionChain];
    if (!_transactions) return;
    const updatedTransaction =
      _transactions.signedTransactions[transaction.index];
    setTransaction(updatedTransaction);
    setOpen(true);
  }
  async function onAction(action: BridgeAction) {
    if (!transaction) return;
    switch (action) {
      case BridgeAction.SWITCH_CHAIN:
        _switch();
        break;

      case BridgeAction.CLOSE:
        setTransaction(undefined);
        setClaimTx(undefined);
        setOpen(false);
        break;
      case BridgeAction.CLAIM:
        claim(transaction);
        break;
      case BridgeAction.TRY_AGAIN:
        setDialogError(undefined);
        setTransaction(undefined);
        setOpen(false);
        break;
    }
  }

  async function _switch() {
    try {
      setChainSwitch({ ...chainSwitch, switchChain: false, switching: true });
      await switchChain(chainSwitch.to);
      setChainSwitch({ ...chainSwitch, switchChain: false, switching: false });
      claim(transaction);
    } catch (error: any) {
      console.log(error);
      setChainSwitch({ ...chainSwitch, switchChain: false, switching: false });
      setDialogError({
        title: "Error",
        body: error.message,
      });
    }
  }

  async function claim(transaction?: SignedTransaction) {
    try {
      if (!transaction) return;
      if (!chainId) return;
      const to = transaction.transaction.toChain.replace("evm.", "") as ChainId;
      const from = transaction.transaction.fromChain.replace(
        "evm.",
        ""
      ) as ChainId;
      if (chainId !== to) {
        setChainSwitch({ ...chainSwitch, switchChain: true, to });
        return;
      }
      const tx = await fulfill(
        transaction.fulfillTransaction,
        to,
        transaction.transaction.symbol,
        transaction.index
      );
      if (!tx) return;
      setClaimTx(tx);
      getSignedTransactions([from]);
      getBalances([to]);
    } catch (error) {
      console.log(error);
      const err = extractError(error);
      setDialogError({
        title: "Error",
        body: err.body,
      });
    }
  }

  function render() {
    if (loadingTransactions) {
      return (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-6 md:justify-center md:mt-28 items-center">
            <Image
              src={assetLoad}
              className=""
              width={214}
              height={214}
              alt="spinLoader"
            />
            <p className="font-[450] text-[14px] font-circular text-[#8298AF]">
              {"Loading transactions..."}
            </p>
          </div>
        </div>
      );
    }
    if (!isConnected) {
      return (
        <>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-6 md:justify-center md:mt-28 items-center">
              <Image
                src={message}
                alt="message"
                className="w-[120px] h-[120px] md:w-[149px] md:h-[149px]"
              />
              <p className="font-[450] text-[14px] font-circular text-[#8298AF]">
                {"Connect wallet to see transaction here"}
              </p>
            </div>
          </div>
        </>
      );
    } else {
      if (filteredTransactions.length > 0) {
        return (
          <>
<div className="py-2 flex flex-row justify-between items-center rounded-[54.11px] bg-[#030A13] w-[313.px]">
      {transactionCategory.map((item) => (
        <div
          onClick={() => setSelectedCategory(item)}
          key={item.key}
          className={`py-1 border border-transparent flex items-center cursor-pointer w-[84.64px] rounded-[66.18px] ${
            selectedCategory.key === item.key ? "bg-[#3CC9CD]" : ""
          }`}
        >
          <p
            className={`${
              selectedCategory.key === item.key ? "text-black" : "text-[#8298AF]"
            } text-[16px] font-[500] leading-[145%]`}
          >
            {item.name}
          </p>
        </div>
      ))}
    </div>
            {/* <div className="px-1.5 py-2 flex flex-row justify-between items-center text-center rounded-[54.11px] bg-[#030A13] overflow-x-auto w-full">
              {transactionCategory.map((item) => (
                <div
                  onClick={() => setSelectedCategory(item)}
                  key={item.key}
                  className={`py-1 border border-transparent !text-center flex justify-center items-center cursor-pointer  w-[84.64px]  rounded-[66.18px]  ${
                    selectedCategory.key === item.key
                      ? "bg-[#3CC9CD] text-[#000000] text-center"
                      : ""
                  }`}
                >
                  <p
                    className={`text-[#8298AF] ${
                      selectedCategory.key === item.key ? "text-black " : ""
                    } text-[14px] font-[450] leading-[145%] font-circular`}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
            </div> */}
            <div className="scrollbar-thin scrollbar-thumb-[#1A2739] scrollbar-track-[#0B131E] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-auto max-h-[500px] mt-4">
              {filteredTransactions.map((t, index) => {
                const fromChain = getChain(
                  t.transaction.fromChain.replace("evm.", "") as ChainId
                );
                const toChain = getChain(
                  t.transaction.toChain.replace("evm.", "") as ChainId
                );
                const amount = getAmount(
                  t.transaction.amount,
                  decimals,
                  t.transaction.fromChain,
                  t.transaction.toChain,
                  t.symbol,
                  bridgesFees
                );
                const block = blocksToClaim(t, currentBlocks);
                const dateTime = convertTimestampDate(t.transaction.timestamp);
                return (
                  <div
                    key={index}
                    className="px-3 bg-[#070E17] border border-[#1A2739] py-3 flex flex-col gap-5 rounded-[5px]"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex flex-row space-x-2.5">
                        <div className="flex flex-row -space-x-5 items-center">
                          <Image
                            src={fromChain.svg || "/placeholder.svg"}
                            alt={fromChain.label}
                            width={42}
                            height={42}
                            className="z-20 rounded-[50%]"
                          />
                          <Image
                            src={toChain.svg || "/placeholder.svg"}
                            alt={toChain.label}
                            width={42}
                            height={42}
                            className="z-40 rounded-[50%]"
                          />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <h1 className="text-[#8298AF] font-[450] text-[14px]">
                            Bridged asset
                          </h1>
                          <h1 className="text-[#FFFFFF] text-[16px] font-[450]">
                            {amount} {t.symbol}
                          </h1>
                        </div>
                      </div>
                      <h1 className="text-[#8298AF] text-[14px] font-[450]">
                        {dateTime}
                      </h1>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-col gap-1.5">
                        <h1 className="text-[#8298AF] text-[14px] font-[450]">
                          Block Verfication
                        </h1>
                        <div className="flex flex-row space-x-1 items-center">
                          {!t.fulfilled && (
                            <h1 className="text-[16px] font-[450] font-circular">
                              {[block.message]}
                            </h1>
                          )}
                          <Image
                            src={greenCheck || "/placeholder.svg"}
                            alt="greenCheck"
                            width={16}
                            height={16}
                          />
                          <p className="text-[16px] pl-1 font-[450] text-[#00F482] font-circular">
                            {t.fulfilled
                              ? "Claimed"
                              : block.isConfirmed
                              ? "Confirmed"
                              : "Pending..."}
                          </p>
                        </div>
                      </div>
                      <ClaimDialog
                        amount={amount}
                        chainSwitch={chainSwitch}
                        loading={
                          bridgeAwaitingTransaction || loadingTransactions
                        }
                        onAction={onAction}
                        open={open}
                        transaction={t}
                        claimTx={claimTx}
                        error={dialogError}
                        blocks={currentBlocks}
                        address={address!}
                        setOpen={(o) => {
                          setOpen(o);
                          setTransaction(t);
                          setSelectedTransactionChain(
                            t.transaction.fromChain.replace(
                              "evm.",
                              ""
                            ) as ChainId
                          );
                          claim(t);
                          // }
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      }
      return (
        <>
          <div className="px-1.5 py-2 flex flex-row justify-between items-center rounded-[54.11px] bg-[#030A13] overflow-x-auto w-full">
            {transactionCategory.map((item) => (
              <div
                onClick={() => setSelectedCategory(item)}
                key={item.key}
                className={`px-2 py-1 border border-transparent flex justify-center items-center cursor-pointer ${
                  selectedCategory.key === item.key
                    ? "bg-[#3CC9CD] text-[#000000] rounded-[66.18px] w-[84.64px]"
                    : ""
                }`}
              >
                <p
                  className={`text-[#8298AF] ${
                    selectedCategory.key === item.key ? "text-black " : ""
                  } text-[14px] font-[450] leading-[145%] font-circular`}
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-6 md:justify-center md:mt-28 items-center">
              <Image
                src={message}
                alt="message"
                className="w-[120px] h-[120px] md:w-[149px] md:h-[149px]"
              />
              <p className="font-[450] text-[14px] font-circular text-[#8298AF]">
                {"No transaction history"}
              </p>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <div className="py-3 px-5 border border-[#1A2739] z-30 bg-[#070E17] rounded-[10px]">
        <div className="flex flex-col gap-[3px] z-50">
          <p className="text-[16px] font-[450] leading-[145%] font-circular text-white">
            Transaction History
          </p>
          <p className="text-[#8298AF] text-[15px] ">
            View and claim bridged asset
          </p>
          <Separator className="my-4 bg-[#1A2739]" />
          {render()}
        </div>
      </div>
    </>
  );
}

{
  /* <div className="px-3 bg-[#070E17] border border-[#1A2739] py-3 flex flex-col gap-5 rounded-[5px]">
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
  <div className="flex flex-row space-x-2.5">
    <div className="flex flex-row -space-x-5">
      <Image
        src={polygon || "/placeholder.svg"}
        alt="polygon"
        width={42}
        height={42}
        className="z-20"
      />
      <Image
        src={assetChain || "/placeholder.svg"}
        alt="assetChain"
        width={42}
        height={42}
        className="z-40"
      />
    </div>
    <div className="flex flex-col gap-0.5">
      <h1 className="text-[#8298AF] font-[450] text-[14px]">
        Bridged asset
      </h1>
      <h1 className="text-[#FFFFFF] text-[16px] font-[450]">
        340,345, USDC
      </h1>
    </div>
  </div>
  <h1 className="text-[#8298AF] text-[14px] font-[450]">
    17-05-2056 23:78
  </h1>
</div>
<div className="flex flex-row justify-between items-center">
  <div className="flex flex-col gap-1.5">
    <h1 className="text-[#8298AF] text-[14px] font-[450]">
      Block Verfication
    </h1>
    <div className="flex flex-row space-x-1 items-center">
      <h1 className="text-[16px] font-[450] font-circular">
        [ 100% ]
      </h1>
      <Image
        src={greenCheck || "/placeholder.svg"}
        alt="greenCheck"
        width={16}
        height={16}
      />
      <p className="text-[16px] pl-1 font-[450] text-[#00F482] font-circular">
        Verifed
      </p>
    </div>
  </div>
  <Button className="bg-[#2042B8] cursor-pointer w-[139px] rounded-[25.26px]">
    Claim
  </Button>
</div>
</div>
<div className="px-3 bg-[#070E17] border border-[#1A2739] py-3 flex flex-col gap-5 rounded-[5px]">
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
  <div className="flex flex-row space-x-2.5">
    <div className="flex flex-row -space-x-5">
      <Image
        src={polygon || "/placeholder.svg"}
        alt="polygon"
        width={42}
        height={42}
        className="z-20"
      />
      <Image
        src={assetChain || "/placeholder.svg"}
        alt="assetChain"
        width={42}
        height={42}
        className="z-40"
      />
    </div>
    <div className="flex flex-col gap-0.5">
      <h1 className="text-[#8298AF] font-[450] text-[14px]">
        Bridged asset
      </h1>
      <h1 className="text-[#FFFFFF] text-[16px] font-[450]">
        340,345, USDC
      </h1>
    </div>
  </div>
  <div className="flex flex-col gap-2 items-end">
    <h1 className="text-[#8298AF] text-[14px] font-[450]">
      17-05-2056 23:78
    </h1>
    <Button className="font-italic text-[14px] font-[450] text-[#5CFFF3] cursor-pointer bg-[#040A13] w-[86px] rounded-[22px]">
      Trx Hash
    </Button>
  </div>
</div>
<div className="flex flex-row justify-between items-center">
  <div className="flex flex-col gap-1.5">
    <h1 className="text-[#8298AF] text-[14px] font-[450]">
      Block Verfication
    </h1>
    <div className="flex flex-row space-x-1 items-center">
      <h1 className="text-[16px] font-[450] font-circular">
        [ 100% ]
      </h1>
      <Image
        src={greenCheck || "/placeholder.svg"}
        alt="greenCheck"
        width={16}
        height={16}
      />
      <p className="text-[16px] pl-1 font-[450] text-[#00F482] font-circular">
        Verifed
      </p>
    </div>
  </div>
  <Button className="bg-[#070E17] w-[139px] rounded-[25.26px] cursor-pointer border border-[#213040]">
    Claimed
  </Button>
</div>
</div> */
}
