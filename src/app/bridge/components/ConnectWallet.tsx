"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import metaMask from "../../../../public/assets/metaMask.svg";
import walletConnect from "../../../../public/assets/walletConnet.svg";
import trust from "../../../../public/assets/trust.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import spin from "../../../../public/assets/spin.svg";



const connectWalletItems = [
    {name: "MetaMask", icon: metaMask},
    {name: "WalletConnet", icon: walletConnect},
    {name: "Trust", icon: trust},
]
export function ConnectWallet() {
  const [openDialog, setOpenDialog] = useState<"first" | "second" | null>(null);
  useEffect(() => {
    if (openDialog === "second") {
      const timer = setTimeout(() => {
        setOpenDialog(null); // Close after 5 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup if dialog closes early
    }
  }, [openDialog]);

  return (
    <>
    {/* Button to trigger to the first modal */}
    <Dialog>
      <DialogTrigger asChild>
      <Button  onClick={() => setOpenDialog("first")} className='w-[215px] bg-[#2042B8] cursor-pointer rounded-[25.26px]'>
            Connect Wallet
        </Button>  
      </DialogTrigger>
      {
        openDialog === "first" && (
          <DialogContent className="sm:max-w-[414px] bg-[#0B131E] border-none h-[546px] translate-y-0 top-1/2 -translate-y-1/2 
          transition-all duration-500 ease-in-out">
        <div className="flex justify-center flex-col  gap-2.5">
        <DialogHeader className="text-center">
          <DialogTitle className="text-[32px] font-[450] text-center text-[#FFFFFF]">Connect Wallet</DialogTitle>
          <DialogDescription className="text-[18px] text-center text-[#8298AF] font-[450]">
          Select any of the supported wallet to connect your account to
          </DialogDescription>
        </DialogHeader>
       <div className="flex flex-col gap-2.5 ">
        {
            connectWalletItems.map((item, index) => (
            <div className="py-[23px] px-[33px] bg-[#0E1A29] rounded-[7.93px] hover:text-[#269497] hover:bg-[#1A2739] cursor-pointer" key={index}>
                <div className="flex items-center justify-between flex-row hover:text-[#269497]" onClick={() => setOpenDialog("second")}>
                    <h1 className="text-[16px] font-[450] text-[#FFFFFF] hover:text-[#269497]">{item.name}</h1>
                    <Image src={item.icon} alt="itemIcon" className={`${item.icon === 1 ? "w-[38.16px] h-[23.65]": ""}`}/>
                </div>
            </div>
            ))
        
        }
      
       </div>
      <p className="text-center text-[11px] font-[450] text-[#8298AF] pt-14">We do not own your private keys and cannot access your funds without your approval .</p>
        </div>
      </DialogContent>
        )
      }
 
    {/* second modal  */}

    {
        openDialog === "second" && (
          <DialogContent className="sm:max-w-[414px] bg-[#0B131E] rounded-[10px] border-none h-[546px] translate-y-0 top-1/2 -translate-y-1/2 
          transition-all duration-500 ease-in-out">
        <div className="flex px-10 py-1.5 flex-col justify-between">
        <DialogHeader className="text-center">
          <DialogTitle className="text-[32px] font-[450] text-center text-[#FFFFFF] pt-5">MetaMask</DialogTitle>
        </DialogHeader>
       <div className="flex justify-center items-center relative">
          <Image src={spin} width={136} height={136} alt="spin image" className="animate-spin object-cover"/>
          <Image src={metaMask} width={90} height={90} alt="metamask" className="object-contain absolute"/>
       </div>
    <div className="flex flex-col text-center">
    <h1 className="text-[18px] font-[450] text-white pb-6">Requesting Connection</h1>
       <p className="text-[18px] font-[450] text-[#8298AF]">Open the MetaMask Browser extension to connect your wallet.</p>
    </div>
       </div>
      </DialogContent>
        )
      }
    </Dialog>
    </>
  )
}
