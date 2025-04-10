"use client";

import repeat from "../../../public/assets/repeat.svg";
import video from "../../../public/assets/video.svg";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import Image, { StaticImageData } from 'next/image';
import  BuySelect from './components/BuySelect';
import  SelectAsset  from './components/SelectAsset';
import { Separator } from '@/components/ui/separator';
import polygon from "../../../public/assets/polygon.svg";
import assetChain from "../../../public/assets/assetChain.svg";
import greenCheck from "../../../public/assets/greenCheck.svg";
import {ConnectWallet} from "./components/ConnectWallet";
import bgText from "../../../public/assets/bgText.svg";
import message from "../../../public/assets/message.svg";
import localFont from "next/font/local";


const circularStd = localFont({
    src: "../../../public/fonts/CircularStd-Medium.woff2",
})

interface Asset {
    value: string;
    icon: StaticImageData;
  }
const transactionCategory = [
    {name:"All"},
    {name:"Claimed"},
    {name:"Unclaimed"},
]
const assets :Asset[] = [
    { value: "Polygon", icon: polygon },
    { value: "Asset Chain",icon :assetChain },
  ]
const Bridge = () => {
    const [isConnected, setIsConnected] = useState(false);
  return(
    <div className={`w-full relative py-8 bg-[#0B131E] min-h-screen text-white ${circularStd.className}`}>
      <div className="flex justify-center absolute top-1.5 [&>svg>path]:fill-[#0A111A] items-center">
            <Image src={bgText} alt="bg-text" className="[&>svg>path]:fill-[#0A111A]"/>
      </div>
        <div className='flex flex-col space-y-6 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto'>
            <div className='flex flex-col gap-3 z-[50]'>
            <h1 className='navbar-text font-[450] text-[40px] font-circular'>Bridge</h1>
            <p className='text-[#8298AF] text-[16px] font-[450] leading-[120%] font-circular'>Effortlessly transfer assets from multiple blockchain networks to the <br/> Asset Chain with seamless interoperability and enhanced security.</p>
            </div>
            <div className='flex justify-end items-center'>
                <Button variant="outline" className='z-40 rounded-[25.26px] cursor-pointer hidden  -mb-4.5 bg-[#0A111A] mr-2.5 md:flex flex-row gap-1.5 '>
                    <p>Watch to learn</p>
                    <Image src={video || "/placeholder.svg"} alt="playVideo" width={20} height={20} color='#3CCACE'/>
                </Button>
            </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-[15px] md:gap-[15px]'>
            <div className='py-4.5 px-5 col-span-[554.32px] border border-[#1A2739] bg-[#070E17] rounded-[10px] z-50 flex flex-col gap-3.5'>
               <div className="flex md:flex-row flex-col md:justify-between items-center">
                <div className="flex flex-col gap-6 w-full border-none ">
                <div className="flex flex-col gap-1">
                    <h1>From</h1>
                    <p className="text-[#8298AF] text-[12px] font-[450]">source network</p>
                </div>
                <BuySelect
                />
                    <div className="pt-10 flex flex-col gap-2">
                        <h1 className="text-[16px] font-[450]  pl-5">You Send</h1>
                        <div className="bg-[#030A13] rounded-[10px] text-white px-3.5 py-2 flex flex-col gap-4.5">
                    <SelectAsset/>
                    <div className="flex flex-row justify-between items-center">
                        <h1 className='font-[450] text-[16px] text-white font-circular'>45,8799</h1>
                        <p className='font-[500] text-[16px] text-[#8298AF] font-circular'>~$67,67</p>
                    </div>
                        </div>
                        <p className='font-medium text-[14px] font-circular text-[#8298AF] pl-2.5 pb-3'>Bal 67,989 USDC</p>
                    </div>
                </div>
                
                <div className='py-2.5 px-3 rounded-[50%] cursor-pointer mt-2.5 md:mt-0 hover:bg-[#269497]/90 mb-8 border border-transparent bg-[#269497]'>  
             <Image src={repeat} alt="repeat" color='#3CCACE' className='w-[18px] h-[18px] md:w-[27px] md:h-[27px]'/>
                </div>
                <div className="flex flex-col gap-6 w-full border-none">
                <div className="flex flex-col gap-1.5">
                    <h1>To</h1>
                    <p className="text-[#8298AF] text-[12px] font-[450]">Destination network</p>
                </div>
                <BuySelect
                />
                    <div className="pt-10 flex flex-col gap-2">
                        <h1 className="text-[16px] font-[450] pl-2">You Receive</h1>
                        <div className="bg-[#030A13] rounded-[10px] text-white px-3.5 py-2 flex flex-col gap-4.5">
                    <SelectAsset isMain/>
                    <div className="flex flex-row justify-between items-center">
                        <h1 className='font-[450] text-[16px] text-white font-circular'>45,8799</h1>
                        <p className='font-[500] text-[16px] text-[#8298AF] font-circular'>~$67,67</p>
                    </div>
                        </div>
                        <p className='font-medium text-[14px] font-circular text-[#8298AF] pl-2.5 pb-3'>Bal 67,989 USDC</p>
                    </div>
                </div>
               </div>
        
                <div className='py-3.5'>
                    <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                            <div className='flex flex-col gap-2 px-2 py-2.5 rounded-[10px] w-full sm:w-[212.50px] border border-transparent bg-[#132032]'>
                                <div className='border flex items-center justify-center w-[72.66px] h-[20px]  border-transparent rounded-[10px] bg-[#88FFF308]'>
                                    <p className='text-[12px] font-[450]  text-[#88FFF3]'>Best Price</p>
                                </div>
                                <p className='font-[450] text-[20px] text-white'>$45,8799</p>
                                <p className='text-[#8298AF] text-[12px] font-medium'>0.43% Gas fee</p>
                            </div> 
                            <ConnectWallet 
                             onConnected={() => setIsConnected(true)} 
                             isConnected={isConnected}
                             bottonLabel={isConnected ? "Bridge" : "Connect Wallet"}
                            />
                               
                    </div>

                </div>
                <div className='flex justify-center items-center'>
                    <p className='text-center text-[#8298AF] font-[450] text-[12px]'>By confirming, you agree to Asset Chain’s <span className='text-[#2042B8]'>Terms of Use</span></p>
                </div>
            </div>
            <div className='py-3 px-5 border border-[#1A2739] z-30 bg-[#070E17] rounded-[10px]'>
            <div className="flex flex-col gap-[3px] z-50">
                <p className="text-[16px] font-[450] leading-[145%] font-circular text-white">Transaction History</p>
                <p className="text-[#8298AF] text-[15px] ">View and claim bridged asset</p>
                <Separator className="my-4 bg-[#1A2739]"/>
                {
                    isConnected ? (
                        <>
                        <div className="px-1.5 py-2 flex flex-row justify-between items-center rounded-[54.11px] bg-[#030A13] overflow-x-auto w-full">
                    {
                        transactionCategory.map((item, index) => (
                            <div key={index} className={`px-2 py-1 border border-transparent flex justify-center items-center ${index === 0 ? "bg-[#3CC9CD] text-[#000000] rounded-[66.18px] w-[84.64px]": ""}`}>
                                <p className={`text-[#8298AF] ${index === 0 ? "text-black " : ""} text-[14px] font-[450] leading-[145%] font-circular`}>{item.name}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="px-3 bg-[#070E17] border border-[#1A2739] py-3 flex flex-col gap-5 rounded-[5px]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="flex flex-row space-x-2.5">
                            <div className="flex flex-row -space-x-5">
                                <Image src={polygon || "/placeholder.svg"} alt="polygon" width={42} height={42} className="z-20"/>
                                <Image src={assetChain || "/placeholder.svg"} alt="assetChain" width={42} height={42} className="z-40"/>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h1 className="text-[#8298AF] font-[450] text-[14px]">Bridged asset</h1>
                                <h1 className="text-[#FFFFFF] text-[16px] font-[450]">340,345, USDC</h1>
                            </div>
                        </div>
                        <h1 className="text-[#8298AF] text-[14px] font-[450]">17-05-2056 23:78</h1>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col gap-1.5">
                            <h1 className="text-[#8298AF] text-[14px] font-[450]">Block Verfication</h1>
                            <div className="flex flex-row space-x-1 items-center">
                                <h1 className="text-[16px] font-[450] font-circular">[ 100% ]</h1>
                                <Image src={greenCheck || "/placeholder.svg"} alt="greenCheck" width={16} height={16}/>
                                <p className="text-[16px] pl-1 font-[450] text-[#00F482] font-circular">Verifed</p>
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
                                <Image src={polygon || "/placeholder.svg"} alt="polygon" width={42} height={42} className="z-20"/>
                                <Image src={assetChain || "/placeholder.svg"} alt="assetChain" width={42} height={42} className="z-40"/>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h1 className="text-[#8298AF] font-[450] text-[14px]">Bridged asset</h1>
                                <h1 className="text-[#FFFFFF] text-[16px] font-[450]">340,345, USDC</h1>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                            <h1 className="text-[#8298AF] text-[14px] font-[450]">17-05-2056 23:78</h1>
                            <Button className="font-italic text-[14px] font-[450] text-[#5CFFF3] cursor-pointer bg-[#040A13] w-[86px] rounded-[22px]">Trx Hash</Button>
                        </div>
                      
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col gap-1.5">
                            <h1 className="text-[#8298AF] text-[14px] font-[450]">Block Verfication</h1>
                            <div className="flex flex-row space-x-1 items-center">
                                <h1 className="text-[16px] font-[450] font-circular">[ 100% ]</h1>
                                <Image src={greenCheck || "/placeholder.svg"} alt="greenCheck" width={16} height={16}/>
                                <p className="text-[16px] pl-1 font-[450] text-[#00F482] font-circular">Verifed</p>
                            </div>
                        </div>
                        <Button className="bg-[#070E17] w-[139px] rounded-[25.26px] cursor-pointer border border-[#213040]">
                            Claimed
                        </Button>
                    </div>
                </div>
                        </>
                    ) : (
                        <>
                       <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col gap-6 md:justify-center md:mt-28 items-center">
                                <Image src={message} alt="message" className="w-[120px] h-[120px] md:w-[149px] md:h-[149px]"/>
                                <p className="font-[450] text-[14px] font-circular text-[#8298AF]">Connect wallet to see transaction here</p>
                            </div>
                       </div>
                        </>
                    )
                }
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Bridge
