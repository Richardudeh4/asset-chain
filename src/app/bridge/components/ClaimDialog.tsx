/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignedTransaction } from "@/context/bridge";
import { BridgeAction, ChainId } from "@/lib/types";
import { ContractTransactionResponse } from "ethers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import greenTick from "../../../../public/assets/greenTick.svg";
import assetLoad from "../../../../public/assets/assetLoad.gif";
import { getChain } from "./BuySelect";
import { ChainBlock } from "@/context/web3";
import { blocksToClaim } from "./TransactionList";

type Props = {
  transaction: SignedTransaction;
  claimTx?: ContractTransactionResponse;
  error?: { title: string; body: string };
  chainSwitch: { switching: boolean; switchChain: boolean; to: ChainId };
  loading: boolean;
  onAction: (action: BridgeAction) => void;
  amount: number;
  blocks: ChainBlock;
  open: boolean;
  setOpen: (open: boolean) => void;
};
export function ClaimDialog(props: Props) {
  // const fromChain = getChain(props.transaction.transaction.fromChain.replace("evm.", "") as ChainId)
  const toChain = getChain(
    props.transaction.transaction.toChain.replace("evm.", "") as ChainId
  );
  const block = blocksToClaim(props.transaction, props.blocks);

  const disabled =
    props.transaction.fulfilled || !block.isConfirmed || props.loading;
  const message = props.transaction.fulfilled
    ? `Congratulations. you have successfuly claimed ${props.amount} on ${toChain.label} network`
    : block.isConfirmed
    ? `${props.amount} ${props.transaction.symbol} is ready to be claimed on ${toChain.label} ${toChain.label} network`
    : `Your transaction is being processed. Please wait the blocks to be confirmed`;

  
  function onOpenChange(o : boolean){
    if (!o) {
      props.setOpen(false);
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
  function renderLoading() {
    return (
      <>
        <div className="flex justify-center">{returnIcon(true)}</div>
        <div className="flex flex-col gap-4 justify-center text-center my-4">
          <h1 className="text-[#FCAD31] text-[16px] font-[450] font-circular">
            Awaiting token claim
          </h1>
          <h2 className="font-bold text-[16px] font-circular text-white">
            of{" "}
            <span className="text-[#3CCACE]">
              {props.amount} {props.transaction.symbol}
            </span>{" "}
            on {toChain.label} Network
          </h2>
        </div>
      </>
    );
  }
  function renderContent() {
    return (
      <>
        <div className="flex justify-center">{returnIcon(false)}</div>
        <h2 className="text-center font-bold text-[16px] font-circular text-white">
          {message}
        </h2>
        <div className="flex md:justify-between justify-center pl-10.5 flex-col gap-2.5 md:flex-row md:px-1.5 mt-6">
          <Button
            onClick={() => props.onAction(BridgeAction.CLAIM)}
            disabled={disabled}
            className={` ${disabled ? "bg-[#141A2F]" : "bg-[#2042B8]"}  ${
              disabled ? "text-[#263545]" : ""
            } cursor-pointer font-circular  text-[11.78px] !font-medium w-[215px] rounded-[22px] leading-[8.85px]`}
          >
            {props.transaction.fulfilled ? `Claimed` : `Claim now`}
          </Button>
          <Button
            onClick={() => {
              props.onAction(BridgeAction.CLOSE);
            }}
            className="w-[215px] rounded-[22px] !font-medium  bg-transparent cursor-pointer border border-[#42E8E0]"
          >
            {props.transaction.fulfilled ? "Close" : "Claim Later"}
          </Button>
        </div>
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
              Awaiting network switch
            </h1>
            <h2 className="font-bold text-[16px] font-circular text-white">
              Switching to {getChain(props.chainSwitch.to).label}...
            </h2>
          </div>
        </>
      );
    }
    if (props.loading) return renderLoading();
    if (props.error) return <h1>{props.error.body}</h1>;
    return renderContent();
  }
  return (
    <Dialog
      // onOpenChange={onOpenChange}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            props.setOpen(true);
          }}
          className="bg-[#2042B8] cursor-pointer w-[139px] rounded-[25.26px]"
          disabled={disabled}
        >
          {props.transaction.fulfilled
            ? "Claimed"
            : block.isConfirmed
            ? "Claim"
            : "Pending..."}
        </Button>
      </DialogTrigger>
      {props.open && (
        <DialogContent
          className="w-[658px] bg-[#0B131E] flex-col rounded-[7.54px] border-none -translate-y-1/2 transition-all   
           duration-500 ease-in-out"
        >
          <DialogHeader className="text-center">
            <DialogTitle className="text-[32px] font-[450] text-center text-[#FFFFFF]">
              Claim
            </DialogTitle>
          </DialogHeader>
          {render()}
        </DialogContent>
      )}
    </Dialog>
  );
}
