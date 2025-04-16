/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { BridgeAction, BridgeData, ChainId } from "@/lib/types";
import Image from "next/image";

import greenTick from "../../../../public/assets/greenTick.svg";
import assetLoad from "../../../../public/assets/assetLoad.gif";
import blockSpinner from "../../../../public/assets/blockSpinner.svg";
import greenCheck from "../../../../public/assets/greenCheck.svg";

import { getChain } from "./BuySelect";
import { ContractTransactionResponse } from "ethers";
import { useState } from "react";
import { SignedTransaction, useBridge } from "@/context/bridge";
import { useToken } from "@/context/token";
import { blocksToClaim, getAmount } from "./TransactionList";
import { useWallet } from "@/context/web3";
import Link from "next/link";
import { getChainScanner } from "@/lib/node";

type Props = {
  bridgeData: BridgeData;
  disabled: boolean;
  loading: boolean;
  onAction: (type: BridgeAction) => void;
  hasApprove: boolean;
  hasTransferred: boolean;
  hasClaimed: boolean;
  claiming: boolean;
  approvalTx?: ContractTransactionResponse;
  transferTx?: ContractTransactionResponse;
  claimTx?: ContractTransactionResponse;
  error?: { title: string; body: string };
  chainSwitch: { switching: boolean; switchChain: boolean; to: ChainId };
  transaction?: SignedTransaction;
};

export function BridgeDialog(props: Props) {
  const [open, setOpen] = useState(false);
  const fromChain = getChain(props.bridgeData.fromChain);
  const toChain = getChain(props.bridgeData.toChain);

  const { currentBlocks } = useWallet();
  const { decimals } = useToken();
  const { bridgeAwaitingTransaction, bridgesFees } = useBridge();

  function onOpenChange(o: boolean) {
    if (!o) {
      props.onAction(BridgeAction.CLOSE);
    }
  }

  function returnIcon(loading: boolean) {
    if (loading) {
      return (
        <Image
          src={assetLoad}
          className=""
          width={214}
          height={214}
          alt="spinLoader"
        />
      );
    } else {
      return (
        <Image
          src={greenTick}
          className=""
          width={94}
          height={94}
          alt="green tick"
        />
      );
    }
  }

  function returnOnReadyToTransferContent(loading: boolean) {
    if (loading) {
      return (
        <div className="flex flex-col gap-4 justify-center text-center">
          <h1 className="text-[#FCAD31] text-[16px] font-[450] font-circular">
            Awaiting transfer
          </h1>
          <h2 className="font-bold text-[16px] font-circular text-white">
            of{" "}
            <span className="text-[#3CCACE]">
              {props.bridgeData.amount} {props.bridgeData.token}
            </span>{" "}
            from
            {fromChain.label} Network
          </h2>
        </div>
      );
    } else {
      if (props.hasTransferred) return returnOnReadyToClaimContent();
      else if (props.error) return <div>error</div>;
      else
        return (
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-[16px] font-[450] text-center font-circular text-[#00F482]">
              Ready to transfer
            </h1>
            {!props.bridgeData.tokenIsNative && (
              <>
                <h1 className="text-[16px] font-circular font-bold text-center text-white">
                  <span className="text-[#3CCACE]">
                    {props.bridgeData.amount} {props.bridgeData.token}
                  </span>{" "}
                  on {fromChain.label} Network
                </h1>
                {props.approvalTx && (
                  <div className="flex justify-center px-1.5">
                    <Link
                      href={`${getChainScanner(fromChain.chainId)}tx/${
                        props.approvalTx.hash
                      }`}
                      target="_blank"
                    >
                      <Button className="cursor-pointer bg-[#070D16] text-[#5CFFF3] italic rounded-[22px] text-[14px] font-[450]">
                        View approve transaction
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
            <div className="mt-3.5 flex justify-center">
              <Button
                className="bg-[#2042B8] rounded-[25.26px] text-white cursor-pointer"
                onClick={() => props.onAction(BridgeAction.TRANSFER)}
                disabled={props.loading}
              >
                {props.loading
                  ? "Transferring..."
                  : `Transfer to ${toChain.label}`}
              </Button>
            </div>
          </div>
        );
    }
  }

  function returnNeedToApproveContent(loading: boolean) {
    if (loading) {
      return (
        <div className="flex flex-col gap-4 justify-center text-center">
          <h1 className="text-[#FCAD31] text-[16px] font-[450] font-circular">
            Awaiting approval
          </h1>
          <h2 className="font-bold text-[16px] font-circular text-white">
            of{" "}
            <span className="text-[#3CCACE]">
              {props.bridgeData.amount} {props.bridgeData.token}
            </span>{" "}
            on
            {fromChain.label} Network
          </h2>
        </div>
      );
    } else {
      if (props.approvalTx)
        return (
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-[16px] font-[450] text-center font-circular text-[#00F482]">
              Successfully Approved
            </h1>
            {!props.bridgeData.tokenIsNative && (
              <>
                {" "}
                <h1 className="text-[16px] font-circular font-bold text-center text-white">
                  <span className="text-[#3CCACE]">
                    {props.bridgeData.amount} {props.bridgeData.token}
                  </span>{" "}
                  on
                  {fromChain.label} Network
                </h1>
                <div className="flex justify-center px-1.5">
                  <Link
                    href={`${getChainScanner(fromChain.chainId)}tx/${
                      props.approvalTx.hash
                    }`}
                    target="_blank"
                  >
                    <Button className="cursor-pointer bg-[#070D16] text-[#5CFFF3] italic rounded-[22px] text-[14px] font-[450]">
                      View approve transaction
                    </Button>
                  </Link>
                </div>
              </>
            )}
            <div className="mt-3.5 flex justify-center">
              <Button
                className="cursor-pointer bg-[#2042B8] rounded-[25.26px] text-white"
                onClick={() => props.onAction(BridgeAction.TRANSFER)}
                disabled={props.loading}
              >
                {props.loading
                  ? "Transferring..."
                  : `Transfer to ${toChain.label}`}
              </Button>
            </div>
          </div>
        );
      else if (props.error) return <div>error</div>;
      else
        return (
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-[16px] font-[450] text-center font-circular text-white">
              Need to Approved {props.bridgeData.amount} {props.bridgeData.token} on {fromChain.label}
            </h1>
            
            <div className="mt-3.5 flex justify-center">
              <Button
                className="cursor-pointer bg-[#2042B8] rounded-[25.26px] text-white"
                onClick={() => props.onAction(BridgeAction.APPROVE)}
                disabled={props.loading}
              >
                {props.loading
                  ? "Transferring..."
                  : `Approve to ${toChain.label}`}
              </Button>
            </div>
          </div>
        );
    }
  }

  function returnOnReadyToClaimContent() {
    let amount = 0;
    let block: any = {};
    let disableBtn = true;
    if (props.transaction) {
      amount = getAmount(
        props.transaction.transaction.amount,
        decimals,
        props.transaction.transaction.fromChain,
        props.transaction.transaction.toChain,
        props.transaction.transaction.symbol,
        bridgesFees
      );
      block = blocksToClaim(props.transaction, currentBlocks);
      disableBtn =
        props.transaction.fulfilled ||
        !block.isConfirmed ||
        bridgeAwaitingTransaction;
    }

    return (
      <>
        <div className="flex justify-center">{returnIcon(false)}</div>
        <div className="flex flex-col justify-center gap-4 text-center">
          <h1 className="text-[16px] font-[450] font-circular text-[#00F482]">
            Done!
          </h1>
          <h1 className="text-[16px] font-circular font-[450] text-white">
            {`Your bridging process is complete. You can now claim your assets
              to your wallet on the ${toChain.label} network.`}
          </h1>
          {props.transaction && (
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-1.5 items-center">
                <div className="flex flex-row -space-x-5">
                  <Image
                    src={fromChain.svg}
                    alt={fromChain.label}
                    width={42}
                    height={42}
                    className="z-20 rounded-[50%]"
                  />
                  <Image
                    src={toChain.svg}
                    alt={toChain.label}
                    width={42}
                    height={42}
                    className="z-40 rounded-[50%]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h1 className="text-[#8298AF] text-[14px] font-[450]">
                    Bridged Asset
                  </h1>
                  <h1 className="text-[16px] font-[450] text-white">
                    {amount} {props.transaction.transaction.symbol}
                  </h1>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <h1 className="text-[#8298AF] text-[14px] -pl-2.5 font-[450]">
                  Block Verification
                </h1>
                <div className="flex flex-row space-x-1.5">
                  <h1 className="text-[16px] font-[450] text-white">
                    [{block.isConfirmed ? "100%" : block.percent}]
                  </h1>
                  <Image
                    src={block.isConfirmed ? greenCheck : blockSpinner}
                    width={15}
                    height={15}
                    className={block.isConfirmed ? "" : "animate-spin"}
                    alt="blockspinner"
                  />
                  <p className="italic text-[#FCAD31] font-[450] text-[16px]">
                    {block.isConfirmed ? "Confirmed" : "Pending"}
                  </p>
                </div>
              </div>
              <div></div>
            </div>
          )}
        </div>
        {props.transaction && (
          <div className="flex md:justify-between justify-center pl-10.5 flex-col gap-2.5 md:flex-row md:px-1.5 mt-6">
            <Button
              onClick={() => props.onAction(BridgeAction.CLAIM)}
              disabled={disableBtn}
              className={` ${
                bridgeAwaitingTransaction || disableBtn || props.loading
                  ? "bg-[#141A2F]"
                  : "bg-[#2042B8]"
              }  ${
                bridgeAwaitingTransaction || disableBtn || props.loading
                  ? "text-[#263545]"
                  : ""
              } cursor-pointer font-circular  text-[11.78px] !font-medium w-[215px] rounded-[22px] leading-[8.85px]`}
            >
              Claim now
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                props.onAction(BridgeAction.CLOSE);
              }}
              className="w-[215px] rounded-[22px] !font-medium  bg-transparent cursor-pointer border border-[#42E8E0]"
            >
              Claim Later
            </Button>
          </div>
        )}
      </>
    );
  }

  function render() {
    if (props.chainSwitch.switchChain) {
      return (
        <div className="flex flex-col gap-4 justify-center text-center">
          <h1 className="text-[#FCAD31] text-[16px] font-[450] font-circular">
            Switch Network
          </h1>
          <h2 className="font-bold text-[16px] font-circular text-white">
            You have to switch to {getChain(props.chainSwitch.to).label} Network
            to continue
          </h2>
          <div className="mt-3.5 flex justify-center">
            <Button
              className="bg-[#2042B8] rounded-[25.26px] text-white cursor-pointer"
              onClick={() => props.onAction(BridgeAction.SWITCH_CHAIN)}
              disabled={props.loading}
            >
              {`Switch Network`}
            </Button>
          </div>
        </div>
      );
    } else if (props.chainSwitch.switching) {
      return (
        <>
          <div className="flex justify-center">{returnIcon(true)}</div>
          <div className="flex flex-col gap-4 justify-center text-center">
            <h1 className="text-[#FCAD31] text-[16px] font-[450] font-circular">
              Awaiting Network switch
            </h1>
            <h2 className="font-bold text-[16px] font-circular text-white">
              Switching to {getChain(props.chainSwitch.to).label}...
            </h2>
          </div>
        </>
      );
    } else if (props.claiming && props.transaction) {
      const amount = getAmount(
        props.transaction.transaction.amount,
        decimals,
        props.transaction.transaction.fromChain,
        props.transaction.transaction.toChain,
        props.transaction.transaction.symbol,
        bridgesFees
      );
      return (
        <>
          <div className="flex justify-center">{returnIcon(true)}</div>
          <div className="flex flex-col gap-4 justify-center text-center">
            <h1 className="text-[#FCAD31] text-[16px] font-[450] font-circular">
              Awaiting token claim
            </h1>
            <h2 className="font-bold text-[16px] font-circular text-white">
              Trying to claim {amount} {props.transaction.symbol}{" "}
              {
                getChain(
                  props.transaction.transaction.toChain.replace(
                    "evm.",
                    ""
                  ) as ChainId
                ).label
              }
              ...
            </h2>
          </div>
        </>
      );
    } else if (props.hasClaimed && props.transaction) {
      return (
        <>
          <div className="flex justify-center">{returnIcon(false)}</div>
          <div className="flex flex-col justify-center gap-4 text-center">
            <h1 className="text-[16px] font-[450] font-circular text-[#00F482]">
              Done!
            </h1>
            <h1 className="text-[16px] font-circular font-[450] text-white">
              {`Your claiming process was successful. your funds is now in your wallet on 
            ${
              getChain(
                props.transaction.transaction.toChain.replace(
                  "evm.",
                  ""
                ) as ChainId
              ).label
            } network.`}
            </h1>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => {
                setOpen(false);
                props.onAction(BridgeAction.CLOSE);
              }}
              className={`bg-[#2042B8] cursor-pointer font-circular text-[11.78px] !font-medium w-[215px] rounded-[22px] leading-[8.85px]`}
            >
              Close
            </Button>
          </div>
        </>
      );
    }
    if (props.hasTransferred) return returnOnReadyToClaimContent();
    if (props.hasApprove) {
      return (
        <>
          <div className="flex justify-center">{returnIcon(props.loading)}</div>
          {returnOnReadyToTransferContent(props.loading)}
        </>
      );
    } else {
      return (
        <>
          <div className="flex justify-center">{returnIcon(props.loading)}</div>
          {returnNeedToApproveContent(props.loading)}
        </>
      );
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setOpen(true);
              if (!props.hasApprove) props.onAction(BridgeAction.APPROVE);
            }}
            className="w-[215px] bg-[#2042B8] cursor-pointer rounded-[25.26px]"
            disabled={props.disabled}
          >
            Bridge
          </Button>
        </DialogTrigger>

        {open && (
          <DialogContent className="w-[658px] bg-[#0B131E] flex-col rounded-[7.54px] border-none">
            <div className="flex flex-col gap-8">
              <DialogHeader className="flex items-center flex-row space-x-0 text-white mt-5">
                <h1 className="text-[16px] text-[#3CCACE] font-[450]">
                  Bridge
                </h1>
                <Progress
                  className="bg-[#262E2D] [&>div]:bg-[#3CCACE] h-[3px]"
                  value={
                    props.hasApprove || props.hasTransferred || props.hasClaimed || props.approvalTx
                      ? 100
                      : 15
                  }
                />
                <h2 className={props.hasApprove ? "text-[#3CCACE]" : ""}>
                  Transfer
                </h2>
                <Progress
                  className="bg-[#262E2D] [&>div]:bg-[#3CCACE] h-[3px]"
                  value={
                    props.hasTransferred || props.hasClaimed
                      ? 100
                      : props.hasApprove
                      ? 15
                      : 0
                  }
                />
                <h3>Done</h3>
              </DialogHeader>
              {render()}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
