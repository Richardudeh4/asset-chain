/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import Lottie from "lottie-react";
import metaMask from "../../../../public/assets/metaMask.svg";
import walletConnect from "../../../../public/assets/walletConnet.svg";
import trust from "../../../../public/assets/trust.svg";
import errorIcon from "../../../../public/assets/error.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import spin from "../../../../public/assets/spin.svg";
import { useWallet } from "@/context/web3";
import { WalletType } from "@/lib/wallet";
import { extractError } from "@/lib/helpers";
import localFont from "next/font/local";

// const Lottie = dynamic(
//   () => {
//     if (typeof window !== "undefined") {
//       return import("lottie-react");
//     }
//     return Promise.resolve(() => null);
//   },
//   { ssr: false }
// );


const circularStd = localFont({
  src: "../../../../public/fonts/CircularStd-Medium.woff",
})

const connectWalletItems = [
  { name: "MetaMask", icon: metaMask, key: "metamask" },
  { name: "Wallet Connect", icon: walletConnect, key: "walletconnect" },
  { name: "Trust Wallet", icon: trust, key: "trustwallet" },
];

export function ConnectWallet() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [connectingWallet, setConnectingWallet] = useState(
    connectWalletItems[0]
  );
  const [error, setError] = useState<any>(null);

  const { connect, isConnected } = useWallet();
  // console.log(isConnected, openDialog, 'sksksk')

  useEffect(() => {
    if (step === 2) {
      connectWallet();
    }
  }, [step]);

  async function connectWallet() {
      try {
        setError(null)
        await connect(connectingWallet.key as WalletType);
        setOpen(false);
        setStep(1);
      } catch (error) {
        console.error(error);
        const err = extractError(error);
        setError({
          title: 'Something went wrong',
          body: err.body,
        });
        // setOpen(false);
        setStep(3)
      }
    }

  async function setWallet(wallet: string) {
    console.log(wallet, "wallet");
    setConnectingWallet(
      connectWalletItems.find((item) => item.key === wallet) ||
        connectWalletItems[0]
    );
    setStep(2);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="w-[215px] bg-[#2042B8] hover:bg-[#3CC9CD] hover:text-black  hover:transition-all hover:duration-400 hover:ease-in cursor-pointer rounded-[25.26px]"
          >
            Connect wallet
          </Button>
        </DialogTrigger>

        {/* First modal - Connect Wallet */}
        {open && step === 1 && (
          <DialogContent
            className={`sm:max-w-[414px] bg-[#0B131E] border-none h-[546px] top-1/2 -translate-y-1/2 transition-all   
           duration-500 ease-in-out  ${circularStd.className}`}
          >
            <div className="flex justify-center flex-col gap-2.5">
              <DialogHeader className="text-center">
                <DialogTitle className="text-[32px] font-[450] text-center text-[#FFFFFF]">
                  Connect Wallet
                </DialogTitle>
                <DialogDescription className="text-[18px] text-center text-[#8298AF] font-[450]">
                  Select any of the supported wallet to connect your account to
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2.5">
                {connectWalletItems.map((item, index) => (
                  <div
                    className="h-[70px] px-[33px] items-center flex justify-between flex-row bg-[#0E1A29] rounded-[7.93px] hover:text-[#269497] hover:bg-[#1A2739] cursor-pointer"
                    key={index}
                    onClick={() => setWallet(item.key)}
                  >
                   
                      <h1 className="text-[16px] font-[450] text-[#FFFFFF] hover:text-[#269497]">
                        {item.name}
                      </h1>
                      <Image
                        src={item.icon}
                        alt="itemIcon"
                        className={`${
                          item.icon === 1 ? "w-[38.16px] h-[23.65]" : ""
                        }`}
                      />
                  </div>
                ))}
              </div>
              <p className="text-center text-[11px] font-[450] text-[#8298AF] pt-14">
                We do not own your private keys and cannot access your funds
                without your approval.
              </p>
            </div>
          </DialogContent>
        )}

        {/* Second modal - MetaMask Connection */}
        {open && step === 2 && (
          <DialogContent className={`sm:max-w-[414px] bg-[#0B131E] rounded-[10px] border-none h-[546px] translate-y-0 top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out ${circularStd.className}`}>
            <div className="flex px-10 py-1.5 flex-col justify-between">
              <DialogHeader className="text-center">
                <DialogTitle className="text-[32px] font-[450] text-center text-[#FFFFFF] pt-5">
                  {connectingWallet.name}
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center items-center relative">
                <Image
                  src={spin}
                  width={136}
                  height={136}
                  alt="spin image"
                  className="animate-spin object-cover"
                />
                <Image
                  src={connectingWallet.icon}
                  width={90}
                  height={90}
                  alt="metamask"
                  className="object-contain absolute"
                />
              </div>
              <div className="flex flex-col text-center">
                <h1 className="text-[18px] font-[450] text-white pb-6">
                  Requesting Connection
                </h1>
                <p className="text-[18px] font-[450] text-[#8298AF]">
                  Open the MetaMask Browser extension to connect your wallet.
                </p>
              </div>
            </div>
          </DialogContent>
        )}
        {open && step === 3 && !isConnected && error && (
          <DialogContent className={`sm:max-w-[414px] bg-[#0B131E] rounded-[10px] border-none h-[500px] translate-y-0 top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out ${circularStd.className}`}>
            <div className="px-10 py-1.5">
              <DialogHeader className="text-center">
                <DialogTitle className="text-[25px] font-[450] text-center text-[#FFFFFF] pt-5">
                  {error.title}
                </DialogTitle>
                <DialogDescription className="text-[18px] text-center text-[#8298AF] font-[450]">
                  {error.body}
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center my-10">
                <Image
                  src={errorIcon}
                  className=""
                  width={94}
                  height={94}
                  alt="error icon"
                />
              </div>

              <div className="mt-10 flex justify-center">
                <Button
                  className="bg-[#2042B8] rounded-[25.26px] text-white cursor-pointer"
                  onClick={() => setStep(1)}
                >
                  Try Again
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}

// "use client";
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import metaMask from "../../../../public/assets/metaMask.svg";
// import walletConnect from "../../../../public/assets/walletConnet.svg";
// import trust from "../../../../public/assets/trust.svg";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import spin from "../../../../public/assets/spin.svg";
// import { Progress } from "@/components/ui/progress";
// import loader from "../../../../public/assets/loader.svg";
// import greenTick from "../../../../public/assets/greenTick.svg";

// const connectWalletItems = [
//     {name: "MetaMask", icon: metaMask},
//     {name: "WalletConnet", icon: walletConnect},
//     {name: "Trust", icon: trust},
// ]
// export function ConnectWallet({onConnected, isConnected, bottonLabel} : {onConnected: () => void, isConnected: boolean,bottonLabel: string}) {
//   const [openDialog, setOpenDialog] = useState<"first" | "second" | "bridge" | null>(null);
//   const [showBridgeLoader, setShowBridgeLoader] = useState(true);
//   const [isTransferringToAssetChain, setIsTransferringToAssetChain] = useState(false);
// const [transferComplete, setTransferComplete] = useState(false);

//   useEffect(() => {
//     if (openDialog === "second") {
//       const timer = setTimeout(() => {
//         setOpenDialog(null);
//         onConnected();
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [openDialog, onConnected]);

//   useEffect(() => {
//     if (openDialog === "bridge") {
//       setShowBridgeLoader(true);
//       const loaderTimer = setTimeout(() => {
//         setShowBridgeLoader(false);
//       }, 5000);
//       return () => clearTimeout(loaderTimer);
//     }
//   }, [openDialog]);

//   const handleButtonClick = () => {
//     if (isConnected) {
//       setOpenDialog("bridge");
//     } else {
//       setOpenDialog("first");
//     }
//   };

//   return (
//     <>
//     {/* Button to trigger to the first modal */}
//     <Dialog>
//       <DialogTrigger asChild>
//       <Button onClick={handleButtonClick} className='w-[215px] bg-[#2042B8] cursor-pointer rounded-[25.26px]'>
//             {bottonLabel}
//         </Button>
//       </DialogTrigger>
//       {
//         !isConnected && openDialog === "first" && (
//           <DialogContent className="sm:max-w-[414px] bg-[#0B131E] border-none h-[546px]  top-1/2 -translate-y-1/2
//           transition-all duration-500 ease-in-out">
//         <div className="flex justify-center flex-col  gap-2.5">
//         <DialogHeader className="text-center">
//           <DialogTitle className="text-[32px] font-[450] text-center text-[#FFFFFF]">Connect Wallet</DialogTitle>
//           <DialogDescription className="text-[18px] text-center text-[#8298AF] font-[450]">
//           Select any of the supported wallet to connect your account to
//           </DialogDescription>
//         </DialogHeader>
//        <div className="flex flex-col gap-2.5 ">
//         {
//             connectWalletItems.map((item, index) => (
//             <div className="py-[23px] px-[33px] bg-[#0E1A29] rounded-[7.93px] hover:text-[#269497] hover:bg-[#1A2739] cursor-pointer" key={index}>
//                 <div className="flex items-center justify-between flex-row hover:text-[#269497]" onClick={() => setOpenDialog("second")}>
//                     <h1 className="text-[16px] font-[450] text-[#FFFFFF] hover:text-[#269497]">{item.name}</h1>
//                     <Image src={item.icon} alt="itemIcon" className={`${item.icon === 1 ? "w-[38.16px] h-[23.65]": ""}`}/>
//                 </div>
//             </div>
//             ))

//         }

//        </div>
//       <p className="text-center text-[11px] font-[450] text-[#8298AF] pt-14">We do not own your private keys and cannot access your funds without your approval .</p>
//         </div>
//       </DialogContent>
//         )
//       }

//     {/* second modal  */}

//     {
//        !isConnected && openDialog === "second" && (
//           <DialogContent className="sm:max-w-[414px] bg-[#0B131E] rounded-[10px] border-none h-[546px] translate-y-0 top-1/2 -translate-y-1/2
//           transition-all duration-500 ease-in-out">
//         <div className="flex px-10 py-1.5 flex-col justify-between">
//         <DialogHeader className="text-center">
//           <DialogTitle className="text-[32px] font-[450] text-center text-[#FFFFFF] pt-5">MetaMask</DialogTitle>
//         </DialogHeader>
//        <div className="flex justify-center items-center relative">
//           <Image src={spin} width={136} height={136} alt="spin image" className="animate-spin object-cover"/>
//           <Image src={metaMask} width={90} height={90} alt="metamask" className="object-contain absolute"/>
//        </div>
//     <div className="flex flex-col text-center">
//     <h1 className="text-[18px] font-[450] text-white pb-6">Requesting Connection</h1>
//        <p className="text-[18px] font-[450] text-[#8298AF]">Open the MetaMask Browser extension to connect your wallet.</p>
//     </div>
//        </div>
//       </DialogContent>
//         )
//       }

//       {
//         isConnected && openDialog === "bridge" && (
//           <DialogContent className="w-[658px] bg-[#0B131E] flex-col  rounded-[7.54px] border-none">
//             {
//               showBridgeLoader ? (
//                   <div className="py-10">
//                 <div className="flex flex-col gap-8 justify-center">

//               <DialogHeader className="flex items-center flex-row space-x-0 text-white mt-3">
//             <h1 className="text-[16px] text-[#3CCACE]font-[450]">Bridge</h1>
//             <Progress
//             className="bg-[#262E2D] [&>div]:bg-[#3CCACE] h-[3px]" value={15}/>
//           <h2 className={`text-[16px] ${isTransferringToAssetChain || transferComplete ? "text-[#3CCACE]" : "text-white"} font-[450]`}>
//           Transfer
//         </h2>
//         <Progress
//           className={`bg-[#262E2D] ${isTransferringToAssetChain || transferComplete ? "[&>div]:bg-[#3CCACE]": "[&>div]:bg-[#262E2D]"} h-[3px] mx-2`}
//           value={isTransferringToAssetChain || transferComplete ? 100 : 15}
//         />

//             <h3>Done</h3>
//             </DialogHeader>
//             <div className="flex justify-center">
//                 <Image
//                 src={loader} className=""
//                 alt="spinLoader" width={214} height={214}/>
//             </div>
//             <div className="flex flex-col gap-4 justify-center text-center">
//                 <h1 className="text-[#FCAD31] text-[16px] font-[450] font-circular">Awaiting approval</h1>
//                 <h2 className="font-bold text-[16px] font-circular text-white">Getting <span className="text-[#3CCACE]">345,356 USDC</span> from Base Network</h2>
//             </div>
//             </div>
//             </div>
//               ): (
//                 <div className="flex flex-col gap-8">
//                 <DialogHeader className="flex items-center flex-row space-x-0 text-white mt-5">
//             <h1 className="text-[16px] text-[#3CCACE] font-[450]">Bridge</h1>
//             <Progress
//             className="bg-[#262E2D] [&>div]:bg-[#3CCACE] h-[3px]" value={15}/>
//             <h2>Transfer</h2>
//             <Progress
//             className="bg-[#262E2D] [&>div]:bg-[#262E2D]  h-[3px]" value={15}/>
//             <h3>Done</h3>
//             </DialogHeader>
//               <div className="flex justify-center">
//                 <Image src={greenTick} className="" width={94} height={94} alt="green tick"/>
//               </div>
//               <div className="flex flex-col justify-center gap-4">
//                 <h1 className="text-[16px] font-[450] text-center font-circular text-[#00F482]">Successful</h1>
//                 <h1 className="text-[16px] font-circular font-bold text-center text-white"><span className="text-[#3CCACE]">345,356 USDC</span> has been retrieved from Base Network</h1>
//                 <div className="flex justify-center px-1.5">
//                 <Button className="bg-[#070D16] text-[#5CFFF3] italic rounded-[22px] text-[14px] font-[450]">
//                   Transaction Hash
//                 </Button>
//                 </div>
//                 <div className="mt-3.5 flex justify-center">
//                   <Button
//                   onClick={() => {
//                     setIsTransferringToAssetChain(true);
//                     setTimeout(() => {
//                       setTransferComplete(true);
//                     }, 4000);
//                   }}
//                   className="bg-[#2042B8] rounded-[25.26px] text-white">
//                   Transfer to Asset Chain
//                   </Button>
//                 </div>

//               </div>
//               </div>
//               )
//             }

//         </DialogContent>
//         )
//       }
//     </Dialog>
//     </>
//   )
// }
