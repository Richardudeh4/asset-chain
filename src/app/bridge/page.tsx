/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import repeat from "../../../public/assets/repeat.svg";
import video from "../../../public/assets/video.svg";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BuySelect from "./components/BuySelect";
import SelectAsset from "./components/SelectAsset";
import { ConnectWallet } from "./components/ConnectWallet";
import bgText from "../../../public/assets/bgText.svg";
import localFont from "next/font/local";
import assetArrow from "../../../public/assets/assetArrow.svg";
// import { Input } from "@/components/ui/input";
import { InputAmount } from "./components/InputAmount";
import { TransactionList } from "./components/TransactionList";
import { BridgeAction, ChainId, Token } from "@/lib/types";
import { useToken } from "@/context/token";
import { extractError, findTokenByChains } from "@/lib/helpers";
import { chains, defaultChainId } from "@/lib/constants";
import { useWallet } from "@/context/web3";
import { ContractTransactionResponse, formatUnits, parseUnits } from "ethers";
import {
  ChainTokenBridgeFees,
  SignedTransaction,
  useBridge,
} from "@/context/bridge";
import useDebounce from "@/hooks/use-debounce";
import { BridgeDialog } from "./components/BridgeDialog";
import {Faqs} from "./components/Faqs";

const circularStd = localFont({
  src: "../../../public/fonts/CircularStd-Medium.woff2",
});

const circularBook = localFont({
  src: "../../../public/fonts/CircularStd-Book.ttf",
})

const defaultFromChain = chains.filter(
  (c) => c.chainId.toString() !== defaultChainId.toString()
)[0];
const defaultToChain = chains.filter(
  (c) => c.chainId.toString() === defaultChainId
)[0];

function getfees(
  inputAmount: string,
  fromChain: ChainId,
  toChain: ChainId,
  fees: ChainTokenBridgeFees,
  token: string | undefined,
  decimal: bigint
) {
  if (
    !inputAmount ||
    !fromChain ||
    !fees ||
    !toChain ||
    !decimal ||
    !token ||
    !fees[fromChain] ||
    !fees[fromChain][token]
  )
    return { feeSend: 0, totalFee: 0 };
  const fromFee = fees[fromChain][token];
  const toFee = fees[toChain][token];
  if (!fromFee || !toFee) return { feeSend: 0, totalFee: 0 };
  const amount = Number(inputAmount);
  if (Number.isNaN(amount)) return { feeSend: 0, totalFee: 0 };
  const feeSend = (amount * Number(fromFee.feeSend)) / 10000;
  const totalFee =
    ((amount - feeSend) * Number(toFee.feeFull)) / 10000 + feeSend;

  return {
    totalFee,
    feeSend,
  };
}

function errorMessage(
  amount: string,
  limit: number,
  balance: number,
  symbol: string,
  contractBalance: number,
  fromChain: ChainId,
) {
  if (!amount) return "Invalid Amount";
  const _amount = Number(amount);
  if (Number.isNaN(_amount)) return "Invalid Amount";
  if (limit <= _amount) return `Amount must be lower then ${limit} ${symbol}`;
  if (_amount > balance) return `Insufficient balance`;
  if (fromChain === defaultChainId && _amount > contractBalance) return `Insufficient liquidity`;
  return "";
}

function isNative(fromChain: ChainId, symbol: string) {
  if (symbol !== "RWA" && symbol !== "BTC") return false;
  if (symbol === "RWA") {
    if (fromChain === defaultChainId) return true;
    else return false;
  } else {
    if (fromChain === "200810" || fromChain === "200901") return true;
    else return false;
  }
}
const Bridge = () => {
  //   const [value, setValue] = useState("");
  const [amount, setAmount] = useState("");
  const [destinationAmount, setDestinationAmount] = useState("");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromChain, setFromChain] = useState<ChainId>(defaultFromChain.chainId);
  const [destinationChain, setDestinationChain] = useState<ChainId>(
    defaultToChain.chainId
  );
  const [error, setError] = useState("");
  const [dialogError, setDialogError] = useState<any>(undefined);
  const [userHasAllowance, setUserHasAllowance] = useState(false);
  const [hasTransferred, setHasTransferred] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [approvalTx, setApprovalTx] = useState<
    ContractTransactionResponse | undefined
  >(undefined);
  const [transferTx, setTransferTx] = useState<
    ContractTransactionResponse | undefined
  >(undefined);
  const [claimTx, setClaimTx] = useState<
    ContractTransactionResponse | undefined
  >(undefined);
  const [chainSwitch, setChainSwitch] = useState({
    switching: false,
    switchChain: false,
    to: defaultChainId,
  });
  const [dialogTransaction, setDialogTransaction] = useState<
    SignedTransaction | undefined
  >(undefined);

  const {
    selectedToken,
    setSelectedToken,
    balances,
    decimals,
    hasAllowance,
    approve,
    awaitingTransaction,
    getBalances,
  } = useToken();
  const { isConnected, chainId, switchChain } = useWallet();
  const {
    bridgesFees,
    bridgeAwaitingTransaction,
    send,
    getSignedTransactions,
    fulfill,
    signedTransactions,
    loadingTransactions,
  } = useBridge();

  const _hasAllowance = useDebounce(checkAllownce, 500);

  useEffect(() => {
    setToken();
  }, [fromChain, destinationChain]);

  useEffect(() => {
    willReceive();
  }, [amount]);

  useEffect(() => {
    _hasAllowance();
  }, [amount, fromChain, selectedToken]);

  useEffect(() => {
    _setDialogTransaction();
  }, [loadingTransactions, signedTransactions, hasTransferred]);

  function _setDialogTransaction() {
    if (!hasTransferred) {
      setDialogTransaction(undefined);
      return;
    }
    const _transactions = signedTransactions[fromChain];
    if (!_transactions) return;
    const lastTransaction =
      _transactions.signedTransactions[
        _transactions.signedTransactions.length - 1
      ];
    setDialogTransaction(lastTransaction);
  }

  function setChain(type: "from" | "to", chainId: ChainId) {
    // if (!selectedToken) return;
    if (symbol === "RWA" && type === "from" && chainId === defaultChainId)
      return;
    if (symbol === "RWA" && type === "to" && chainId !== defaultChainId) return;
    const chain = chains.find((s) => s.chainId === chainId);
    if (!chain) return;
    if (type === "from") {
      if (chainId !== destinationChain) {
        setFromChain(chainId);
      } else {
        const newTochain = chains.find((s) => s.chainId !== chainId);
        setFromChain(chainId);
        setDestinationChain(newTochain ? newTochain.chainId : defaultChainId);
      }
    } else {
      if (chainId !== fromChain) {
        setDestinationChain(chainId);
      } else {
        const newFromchain = chains.find((s) => s.chainId !== chainId);
        setFromChain(newFromchain ? newFromchain.chainId : defaultChainId);
        setDestinationChain(chainId);
      }
    }
  }

  async function setToken() {
    // if (!selectedToken || !supportedChains) return;
    // if (!supportedChains[selectedToken.symbol]) return;
    const _tokens = findTokenByChains(fromChain, destinationChain);
    if (!_tokens) {
      setTokens([]);
      setSelectedToken(null);
      return;
    }

    const realTokens = _tokens.map((t) => ({ label: t, value: t }));
    // console.log(realTokens, 'real tokens')
    setTokens(realTokens);
    setSelectedToken(realTokens.length > 0 ? realTokens[0] : null);
  }

  function handleAmountChange(value: string) {
    // const _value = Number(value);

    const error = errorMessage(
      value,
      limit,
      userBalance,
      symbol,
      contractBalance,
      fromChain
    );

    setError(error);
    setAmount(value);
  }

  function willReceive() {
    if (!amount) {
      setDestinationAmount("0");
      return;
    }
    const _amount = Number(amount);
    if (Number.isNaN(_amount)) {
      setDestinationAmount("0");
      return;
    }
    setDestinationAmount((_amount - fees.totalFee).toString());
  }

  function toggle() {
    if (symbol === "RWA" && fromChain !== defaultChainId) return;
    setFromChain(destinationChain);
    setDestinationChain(fromChain);
  }

  async function checkAllownce() {
    if (!fromChain) return;
    if (!amount) return;
    if (Number.isNaN(amount)) return;

    const allowance = await hasAllowance(
      fromChain,
      parseUnits(amount, tokenDecimal)
    );
    setUserHasAllowance(allowance);
  }

  async function bridge(action: BridgeAction) {
    console.log(action);
    switch (action) {
      case BridgeAction.APPROVE:
        approveToken();
        break;
      case BridgeAction.SWITCH_CHAIN:
        _switch();
        break;
      case BridgeAction.TRANSFER:
        transfer();
        break;
      case BridgeAction.CLOSE:
        setHasTransferred(false);
        setHasClaimed(false);
        setDialogTransaction(undefined);
        setApprovalTx(undefined);
        setTransferTx(undefined);
        setClaimTx(undefined);
        setHasClaimed(false);
        setClaiming(false);
        setAmount("");
        break;
      case BridgeAction.CLAIM:
        claim(dialogTransaction);
        break;
      case BridgeAction.TRY_AGAIN:
        setDialogError(undefined);
        break;
    }
  }

  async function _switch() {
    try {
      setChainSwitch({ ...chainSwitch, switchChain: false, switching: true });
      await switchChain(chainSwitch.to);
      setChainSwitch({ ...chainSwitch, switchChain: false, switching: false });
    } catch (error) {
      console.log(error);
      setChainSwitch({ ...chainSwitch, switchChain: false, switching: false });
    }
  }

  async function approveToken() {
    try {
      if (!fromChain) return;
      if (!amount) return;
      if (!selectedToken) return;
      if (!chainId) return;
      if (chainId !== fromChain) {
        setChainSwitch({ ...chainSwitch, switchChain: true, to: fromChain });
        return;
      }
      const tx = await approve(fromChain, parseUnits(amount, tokenDecimal));
      if (!tx) return;
      setApprovalTx(tx);
      setUserHasAllowance(true);
      checkAllownce();
    } catch (error) {
      console.log(error);
      const err = extractError(error)
      setDialogError({
        title: "Error",
        body: err.body,
      });
    }
  }

  async function transfer() {
    try {
      if (!fromChain) return;
      if (!amount) return;
      if (!selectedToken) return;
      if (!chainId) return;
      if (chainId !== fromChain) {
        setChainSwitch({ ...chainSwitch, switchChain: true, to: fromChain });
        return;
      }
      const tx = await send(
        parseUnits(amount, tokenDecimal),
        fromChain,
        destinationChain
      );
      if (!tx) return;
      setTransferTx(tx);
      setHasTransferred(true);
      checkAllownce();
      getSignedTransactions([fromChain]);
      getBalances([fromChain]);
    } catch (error) {
      console.log(error);
      const err = extractError(error);
      setDialogError({
        title: "Error",
        body: err.body,
      });
    }
  }

  async function claim(transaction?: SignedTransaction) {
    try {
      if (!transaction) return;
      if (!chainId) return;
      const to = transaction.transaction.toChain.replace("evm.", "") as ChainId;
      if (chainId !== to) {
        setChainSwitch({ ...chainSwitch, switchChain: true, to });
        return;
      }
      setClaiming(true);
      const tx = await fulfill(
        transaction.fulfillTransaction,
        to,
        transaction.transaction.symbol,
        transaction.index
      );
      setClaiming(false);
      if (!tx) return;
      setClaimTx(tx);
      setHasClaimed(true);
      checkAllownce();
      getSignedTransactions([fromChain]);
      getBalances([to]);
    } catch (error) {
      console.log(error);
      const err = extractError(error);
      setClaiming(false);

      setDialogError({
        title: "Error",
        body: err.body,
      });
    }
  }

  const symbol = selectedToken ? selectedToken.value : "---";
  const balance = balances[fromChain]
    ? balances[fromChain].find((b) => b.symbol === symbol)
    : null;
  const toBalance = balances[destinationChain]
    ? balances[destinationChain].find((b) => b.symbol === symbol)
    : null;
  const decimal = decimals[fromChain]
    ? decimals[fromChain].find((b) => b.symbol === symbol)
    : null;
  const toDecimal = decimals[destinationChain]
    ? decimals[destinationChain].find((b) => b.symbol === symbol)
    : null;
  const tokenDecimal = decimal ? decimal.decimal : BigInt(18);
  const toTokenDecimal = toDecimal ? toDecimal.decimal : BigInt(18);
  const userBalance = balance
    ? Number(formatUnits(balance.user, tokenDecimal))
    : 0;
  const contractBalance = toBalance
    ? Number(formatUnits(toBalance.bridgeAssist, toTokenDecimal))
    : 0;

  const limit =
    selectedToken &&
    bridgesFees[fromChain] &&
    bridgesFees[fromChain][selectedToken.value]
      ? +formatUnits(
          bridgesFees[fromChain][selectedToken.value].limitPerSend,
          tokenDecimal
        )
      : 0;

  const fees = getfees(
    amount,
    fromChain,
    destinationChain,
    bridgesFees,
    selectedToken?.value,
    tokenDecimal
  );

  const _amount = Number(amount);
  const isValidInput =
    !!amount &&
    !Number.isNaN(_amount) &&
    _amount <= userBalance &&
    limit > _amount;

  const tokenIsNative = isNative(fromChain, symbol);

  function returnInfo() {
    if (!isConnected) return null;
    if (fromChain === defaultChainId)
      return (
        <p className="font-medium text-[14px] font-circular text-[#8298AF] pl-2.5 pb-3">
          Total liquidity {contractBalance.toFixed(6)}... {symbol}
        </p>
      );
    return (
      <p className="font-medium text-[14px] font-circular text-[#8298AF] pl-2.5 pb-3">
        Limit/transaction {symbol === "RWA" ? 100 : limit} {symbol}
      </p>
    );
  }

  return (
    <div
      className={`w-full relative py-8 bg-[#0B131E] min-h-screen text-white ${circularStd.className}`}
    >
      <div className="flex justify-center absolute top-1.5 [&>svg>path]:fill-[#0A111A] items-center">
        <Image
          src={bgText}
          alt="bg-text"
          className="[&>svg>path]:fill-[#0A111A]"
        />
      </div>
      <div className="flex flex-col space-y-6 px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col gap-3 z-[50]">
          <h1 className={`${circularBook.className} font-[450] text-[40px] font-circular`}>
            Bridge
          </h1>
          <p className="text-[#8298AF] text-[16px] font-[450] leading-[120%] font-circular">
            Effortlessly transfer assets from multiple blockchain networks to
            the <br /> Asset Chain with seamless interoperability and enhanced
            security.
          </p>
        </div>
        <div className="flex justify-end items-center">
          <Button
            variant="outline"
            className="z-40 rounded-[25.26px] cursor-pointer hidden  -mb-4.5 bg-[#0A111A] mr-2.5 md:flex flex-row gap-1.5 "
          >
            <p>Watch to learn</p>
            <Image
              src={video || "/placeholder.svg"}
              alt="playVideo"
              width={20}
              height={20}
              color="#3CCACE"
            />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15px] md:gap-[15px]">
          <div className="py-4.5 px-5 col-span-[554.32px] border relative border-[#1A2739] bg-[#070E17] rounded-[10px] z-50 flex flex-col gap-3.5">
       
            <div className="flex md:flex-row flex-col md:justify-between items-center">
              <div className="flex flex-col gap-6 w-full border-none ">
                <div className="flex flex-col gap-1">
                  <h1>From</h1>
                  <p className="text-[#8298AF] text-[12px] font-[450]">
                    Source network
                  </p>
                </div>
                <BuySelect
                  label="From"
                  onChange={(chainId) => setChain("from", chainId)}
                  selectedChain={fromChain}
                  supportedChains={chains}
                />
                <div className="pt-10 flex flex-col gap-2">
                  <h1 className="text-[16px] font-[450]  pl-5">You Send</h1>
                  <div className="bg-[#030A13] rounded-[10px] text-white px-3.5 py-2 flex flex-col gap-4.5">
                    <SelectAsset tokens={tokens} />
                    <div className="flex flex-row justify-between items-center">
                      <InputAmount
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                      />
                      {/* <h1 className='font-[450] text-[16px] text-white font-circular'>45,8799</h1> */}
                      {/* <p className="font-[500] text-[16px] text-[#8298AF] font-circular">
                        {selectedToken ? selectedToken.value : "---"}
                      </p> */}
                    </div>
                  </div>
                  {isConnected && (
                    <p className="font-medium text-[14px] font-circular text-[#8298AF] pl-2.5 pb-3">
                      Bal {userBalance}{" "}
                      {selectedToken ? selectedToken.value : "---"}
                    </p>
                  )}
                </div>
              </div>

              <div
                onClick={toggle}
                className="py-3 px-3  rounded-[50%] cursor-pointer hover:bg-[#269497]/90 md:mt-0 mt-4  border border-transparent bg-[#269497]"
              >
                <Image
                  src={repeat}
                  width={22}
                  height={22}
                  alt="repeat"
                  color="#3CCACE"
                  className=""
                />
              </div>
              <div className="flex flex-col gap-6 w-full border-none">
                <div className="flex flex-col gap-1.5">
                  <h1>To</h1>
                  <p className="text-[#8298AF] text-[12px] font-[450]">
                    Destination network
                  </p>
                </div>
                <BuySelect
                  label="To"
                  onChange={(chainId) => setChain("to", chainId)}
                  selectedChain={destinationChain}
                  supportedChains={chains}
                />
                <div className="pt-10 flex flex-col gap-2">
                  <h1 className="text-[16px] font-[450] pl-2">You Receive</h1>
                  <div className="bg-[#030A13] rounded-[10px] text-white px-3.5 py-2 flex flex-col gap-4.5">
                    <SelectAsset isMain tokens={tokens} />
                    <div className="flex flex-row justify-between items-center">
                      <InputAmount readOnly value={destinationAmount} />
                      {/* <h1 className='font-[450] text-[16px] text-white font-circular'>45,8799</h1> */}
                      {/* <p className="font-[500] text-[16px] text-[#8298AF] font-circular">
                        {selectedToken ? selectedToken.value : "---"}
                      </p> */}
                    </div>
                  </div>
                  {returnInfo()}
                </div>
              </div>
            </div>

            <div className="py-3.5">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-col gap-2 px-2 py-2.5 rounded-[10px] w-full sm:w-[212.50px] border border-transparent bg-[#132032]">
                  <div className="border flex items-center justify-center w-[72.66px] h-[20px]  border-transparent rounded-[10px] bg-[#88FFF308]">
                    <p className="text-[10px] font-[350]  text-[#88FFF3]">
                      Net Quote
                    </p>
                  </div>
                  <p className="font-[350] text-[18px] text-white">
                    {destinationAmount} {symbol}
                  </p>
                  <p className="text-[#8298AF] text-[12px] font-medium">
                    {fees.totalFee} {symbol} fee
                  </p>
                </div>
                {isConnected ? (
                  <BridgeDialog
                    hasApprove={userHasAllowance}
                    disabled={
                      !isValidInput ||
                      awaitingTransaction ||
                      bridgeAwaitingTransaction ||
                      (fromChain === defaultChainId &&
                        _amount > contractBalance)
                    }
                    loading={
                      awaitingTransaction ||
                      bridgeAwaitingTransaction ||
                      loadingTransactions
                    }
                    onAction={bridge}
                    bridgeData={{
                      amount: _amount.toString(),
                      fromChain,
                      fromUser: "",
                      toChain: destinationChain,
                      token: symbol,
                      tokenIsNative,
                    }}
                    hasTransferred={hasTransferred}
                    approvalTx={approvalTx}
                    transferTx={transferTx}
                    chainSwitch={chainSwitch}
                    error={dialogError}
                    transaction={dialogTransaction}
                    claiming={claiming}
                    hasClaimed={hasClaimed}
                    claimTx={claimTx}
                  />
                ) : (
                  <ConnectWallet />
                )}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-center text-[#8298AF] font-[450] text-[12px]">
                By confirming, you agree to Asset Chain’s{" "}
                <span className="text-[#2042B8]">Terms of Use</span>
              </p>
            </div>
          </div>
          <TransactionList />
        </div>
       <div className="pt-6 flex flex-col gap-6">
            <h1 className="pl-2.5 text-[24px] font-[450]">Frequently Asked Question</h1>
            <Faqs/>
       </div>
      </div>
    </div>
  );
};

export default Bridge;
