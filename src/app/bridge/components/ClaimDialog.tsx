import { SignedTransaction } from "@/context/bridge";
import { BridgeAction, ChainId } from "@/lib/types";
import { ContractTransactionResponse } from "ethers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import greenTick from "../../../../public/assets/greenTick.svg";
import assetLoad from "../../../../public/assets/assetLoad.gif";
import errorIcon from "../../../../public/assets/error.svg";

import { getChain } from "./BuySelect";
import { ChainBlock } from "@/context/web3";
import { blocksToClaim } from "./TransactionList";
import Link from "next/link";
import { getChainScanner } from "@/lib/node";

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
  address: string;
};
export function ClaimDialog(props: Props) {
  // const fromChain = getChain(props.transaction.transaction.fromChain.replace("evm.", "") as ChainId)
  const toChain = getChain(
    props.transaction.transaction.toChain.replace("evm.", "") as ChainId
  );
  const block = blocksToClaim(props.transaction, props.blocks);

  const address = props.transaction.transaction.fromUser;

  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const disabled =
    props.transaction.fulfilled || !block.isConfirmed || props.loading;

  // function onOpenChange(o: boolean) {
  //   if (!o) {
  //     props.setOpen(false);
  //     props.onAction(BridgeAction.CLOSE);
  //   }
  // }
  function returnErrorContent() {
    return (
      <>
        <div className="flex justify-center">
          <Image
            src={errorIcon}
            className=""
            width={94}
            height={94}
            alt="error icon"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 text-center">
          <h1 className="text-[16px] font-[450] font-circular text-[red]">
            {props.error?.title}
          </h1>
          <h1 className="text-[16px] font-circular font-[450] text-white">
            {props.error?.body}
          </h1>
        </div>
        <div className="mt-3.5 flex justify-center">
          <Button
            className="bg-[#2042B8] rounded-[25.26px] text-white cursor-pointer"
            onClick={() => props.onAction(BridgeAction.TRY_AGAIN)}
          >
            Try Again
          </Button>
        </div>
      </>
    );
  }

  function renderClaimOrViewHasBtn() {
    if (props.transaction.fulfilled && props.claimTx) {
      return (
        <Link
          href={`${getChainScanner(
            props.transaction.transaction.toChain.replace("evm.", "") as ChainId
          )}tx/${props.claimTx.hash}`}
          target="_blank"
        >
          <Button className="cursor-pointer italic rounded-[22px] text-[11.78px] font-[450]">
            Transaction hash
          </Button>
        </Link>
      );
    } else
      return (
        <Button
          onClick={() => props.onAction(BridgeAction.CLAIM)}
          disabled={disabled}
          className={` ${disabled ? "bg-[#141A2F]" : "bg-[#2042B8]"}  ${
            disabled ? "text-[#263545]" : ""
          } cursor-pointer font-circular  text-[11.78px] !font-medium w-[215px] rounded-[22px] leading-[8.85px]`}
        >
          {`Claim now`}
        </Button>
      );
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
        <div className="flex justify-center my-10">{returnIcon(false)}</div>
        <h1 className="text-[16px] font-[450] font-circular text-[#00F482] text-center">
          Successful
        </h1>
        <h2 className="font-bold text-[16px] font-circular text-white">
          You have claimed a total of {""}
          <span className="text-[#3CCACE]">
            {props.amount} {props.transaction.symbol}
          </span>{" "}
          <span className="italic">{truncatedAddress}</span>
        </h2>

        <div className="flex justify-center">{renderClaimOrViewHasBtn()}</div>
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
    if (props.error) {
      return returnErrorContent();
    }
    return renderContent();
  }
  return (
    <Dialog
      // onOpenChange={onOpenChange}
      onOpenChange={(o) => {
        if (!o) props.onAction(BridgeAction.CLOSE);
      }}
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
            <DialogTitle className="text-[20px] font-[450] text-center text-[#FFFFFF]">
              Claim
            </DialogTitle>
            <DialogDescription className="text-[15px] text-center text-[#8298AF] font-[450]">
              Claim your bridged asset to your wallet
            </DialogDescription>
          </DialogHeader>
          {render()}
        </DialogContent>
      )}
    </Dialog>
  );
}
