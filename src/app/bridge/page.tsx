"use client";
// import { Repeat } from 'lucide-react'
// import Image from 'next/image'
import repeat from "../../../public/assets/repeat.svg";
// import usdc from "../../../public/assets/usdc.svg";
// import tether from "../../../public/assets/tether.svg";
// import xend from "../../../public/assets/xend.svg";
import video from "../../../public/assets/video.svg";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { BuySelect } from './components/BuySelect';
import { SelectAsset } from './components/SelectAsset';
import { Separator } from '@/components/ui/separator';
import polygon from "../../../public/assets/polygon.svg";
import assetChain from "../../../public/assets/assetChain.svg";
import greenCheck from "../../../public/assets/greenCheck.svg";
import {ConnectWallet} from "./components/ConnectWallet";


const transactionCategory = [
    {name:"All"},
    {name:"Claimed"},
    {name:"Unclaimed"},
]

const Bridge = () => {
    const [isConnected, setIsConnected] = useState(false);
  return (
    <div className='w-full relative  py-8 bg-[#0B131E] min-h-screen text-white'>
        {/* Background text */}
        <div className='top-[25.05px] z-[1] overflow-hidden hidden md:block'>
            <div className='font-semibold tracking-[0%] flex flex-col'> 
                <h1 className='text-[81.08px] md:text-[120px] lg:text-[154.29px] absolute left-0 md:left-[200px] lg:left-[600px] -mt-7 text-left font-semibold text-gray-600 opacity-10'>Asset <span className="italic font-medium">Chain</span></h1> 
                <h1 className='text-[81.08px] md:text-[120px] lg:text-[154.29px] absolute mt-32 left-1.5 font-semibold text-gray-600 opacity-10'>Cross Chain Bridge</h1>
            </div>
        </div>
      
        <div className='flex flex-col space-y-6 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto'>
            <div className='flex flex-col gap-3'>
            <h1 className='navbar-text font-[450] text-[40px] font-circular'>Bridge</h1>
            <p className='text-[#8298AF] text-[16px] font-[450] leading-[120%] font-circular'>Effortlessly transfer assets from multiple blockchain networks to the <br/> Asset Chain with seamless interoperability and enhanced security.</p>
            </div>
            <div className='flex justify-end items-center'>
                <Button variant="outline" className='z-40 rounded-[25.26px] cursor-pointer -mb-4.5 bg-[#0A111A] mr-2.5 flex flex-row gap-1.5 '>
                    <p>Watch to learn</p>
                    <Image src={video || "/placeholder.svg"} alt="playVideo" width={20} height={20} color='#3CCACE'/>
                </Button>
            </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
            <div className='py-4.5 px-5 col-span-[554.32px] border border-[#1A2739]  bg-[#070E17] rounded-[10px] z-50 flex flex-col gap-3.5'>
                <div className='flex flex-row justify-between'>
                <div className='flex flex-col gap-1 pl-2.5'>
                    <h1 className='text-[16px] leading-[145%] font-[450] font-circular'>From</h1>
                    <p className='text-[#8298AF] text-[12px] font-[450] '>Source Network</p>
                </div>
                <div className='flex flex-col gap-1 pr-32'>
                    <h1 className='text-[16px] leading-[145%] font-[450] font-circular'>From</h1>
                    <p className='text-[#8298AF] text-[12px] font-[450] '>Source Network</p>
                </div>
                </div>
                <div className='flex flex-row justify-between items-center'>
                <div>
                   <BuySelect/>
                </div> 
                <div>
                <BuySelect/>
                </div> 
                </div>
                <div className='flex flex-row justify-center items-center cursor-pointer'>
                    <div className='py-2.5 px-3 rounded-[50%] border border-transparent bg-[#269497]'>
                        <Image src={repeat || "/placeholder.svg"} width={14} height={17} alt="repeat" color='#3CCACE' className=''/>
                    </div>
                </div>
                {/*  START OF THE SEND AND RECEIVE CARD */}
                <div className='flex flex-col sm:flex-row justify-between gap-4'>
                    <div className='flex flex-col gap-3 w-full sm:w-1/2'>
                        <h1 className='font-[450] text-[16px] font-circular pl-2.5'>You Send</h1>
                        <div className='border border-transparent rounded-[10px] bg-[#030A13]'>
                            <div className='px-3 py-2 w-full flex flex-col gap-3.5'>
                                <div>
                                 <SelectAsset/>
                                </div>

                                <div className='flex flex-row justify-between items-center'>
                                    <p className='font-[450] text-[16px] text-white font-circular'>45,8799</p>
                                    <p className='font-[500] text-[16px] text-[#8298AF] font-circular'>~$67,67</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 w-full sm:w-1/2'>
                        <h1 className='font-[450] text-[16px] font-circular pl-2.5'>You Receive</h1>
                        <div className='border border-transparent rounded-[10px] bg-[#030A13]'>
                            <div className='px-3 py-2 w-full flex flex-col gap-3.5'>
                                <div>
                                   <SelectAsset/>
                                </div>

                                <div className='flex flex-row justify-between items-center'>
                                    <p className='font-[450] text-[16px] text-white font-circular'>45,8799</p>
                                    <p className='font-[500] text-[16px] text-[#8298AF] font-circular'>~$67,67</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='font-medium text-[14px] font-circular text-[#8298AF] pl-2.5'>Bal 67,989 USDC</p>
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
                <Separator className="my-4 bg-[#1A2739]" />
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
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Bridge

// "use client";
// // import { Repeat } from 'lucide-react'
// // import Image from 'next/image'
// import repeat from "../../../public/assets/repeat.svg";
// // import usdc from "../../../public/assets/usdc.svg";
// // import tether from "../../../public/assets/tether.svg";
// // import xend from "../../../public/assets/xend.svg";
// import video from "../../../public/assets/video.svg";
// import React, { useState } from 'react'
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import { BuySelect } from './components/BuySelect';
// import { SelectAsset } from './components/SelectAsset';
// import { Separator } from '@/components/ui/separator';
// import polygon from "../../../public/assets/polygon.svg";
// import assetChain from "../../../public/assets/assetChain.svg";
// import greenCheck from "../../../public/assets/greenCheck.svg";
// import {ConnectWallet} from "./components/ConnectWallet";


// const transactionCategory = [
//     {name:"All"},
//     {name:"Claimed"},
//     {name:"Unclaimed"},
// ]

// const Bridge = () => {
//     const [isConnected, setIsConnected] = useState(false);
//   return (
//     <div className='w-full relative  py-8 bg-[#0B131E] min-h-screen text-white'>
//         {/* Background text */}
//         <div className='top-[25.05px] z-[9999px]  overflow-hidden'>
//         <div className=' font-semibold tracking-[0%] flex flex-col '> 
//             <h1 className='md:text-[154.29px] text-[81.08px] absolute left-[600px] -mt-7 text-left font-semibold text-gray-600 opacity-10'>Asset <span className="italic font-medium">Chain</span></h1> 
//             <h1 className=' md:text-[154.29px] absolute mt-32 left-1.5 font-semibold text-[81.08px]  text-gray-600 opacity-10'>Cross Chain Bridge</h1>
//         </div>
//         </div>
      
//         <div className='flex flex-col space-y-6 px-42'>
//             <div className='flex flex-col gap-3'>
//             <h1 className='navbar-text font-[450] text-[40px] font-circular'>Bridge</h1>
//             <p className='text-[#8298AF] text-[16px] font-[450] leading-[120%] font-circular'>Effortlessly transfer assets from multiple blockchain networks to the <br/> Asset Chain with seamless interoperability and enhanced security.</p>
//             </div>
//             <div className='flex justify-end items-center'>
//                 <Button variant="outline" className='z-40 rounded-[25.26px] cursor-pointer -mb-4.5 bg-[#0A111A] mr-2.5 flex flex-row gap-1.5 '>
//                     <p>Watch to learn</p>
//                     <Image src={video} alt="playVideo" width={20} height={20} color='#3CCACE'/>
//                 </Button>
//             </div>
//         <div className='grid grid-cols-2 gap-2'>
//             <div className='py-4.5 px-5 col-span-[554.32px] border border-[#1A2739]  bg-[#070E17] rounded-[10px] z-50 flex flex-col gap-3.5'>
//                 <div className='flex flex-row justify-between'>
//                 <div className='flex flex-col gap-1 pl-2.5'>
//                     <h1 className='text-[16px] leading-[145%] font-[450] font-circular'>From</h1>
//                     <p className='text-[#8298AF] text-[12px] font-[450] '>Source Network</p>
//                 </div>
//                 <div className='flex flex-col gap-1 pr-32'>
//                     <h1 className='text-[16px] leading-[145%] font-[450] font-circular'>From</h1>
//                     <p className='text-[#8298AF] text-[12px] font-[450] '>Source Network</p>
//                 </div>
//                 </div>
//                 <div className='flex flex-row justify-between items-center'>
//                 <div>
//                    <BuySelect/>
//                 </div> 
//                 <div>
//                 <BuySelect/>
//                 </div> 
//                 </div>
//                 <div className='flex flex-row justify-center items-center cursor-pointer'>
//                     <div className='py-2.5 px-3 rounded-[50%] border border-transparent bg-[#269497]'>
//                         <Image src={repeat} width={14} height={17} alt="repeat" color='#3CCACE' className=''/>
//                     </div>
//                 </div>
//                 {/*  START OF THE SEND AND RECEIVE CARD */}
//                 <div className='flex flex-row justify-between'>
//                 <div className='flex flex-col gap-3'>
//                 <h1 className='font-[450] text-[16px] font-circular pl-2.5'>You Send</h1>
//                 <div className='border border-transparent rounded-[10px] bg-[#030A13]'>
//                     <div className='px-3 py-2 w-[236.40px] flex flex-col gap-3.5'>
//                     <div>
//                      <SelectAsset/>
//                     </div>

//                     <div className='flex flex-row justify-between items-center'>
//                         <p className='font-[450] text-[16px] text-white font-circular'>45,8799</p>
//                         <p className='font-[500] text-[16px] text-[#8298AF] font-circular'>~$67,67</p>
//                     </div>
//                     </div>
//                 </div>
//                 </div>
//                 <div className='flex flex-col gap-3'>
//                 <h1 className='font-[450] text-[16px] font-circular pl-2.5'>You Receive</h1>
//                 <div className='border border-transparent rounded-[10px] bg-[#030A13]'>
//                     <div className='px-3 py-2 w-[236.40px] flex flex-col gap-3.5'>
//                             <div>
//                        <SelectAsset/>
//                     </div>

//                     <div className='flex flex-row justify-between items-center'>
//                         <p className='font-[450] text-[16px] text-white font-circular'>45,8799</p>
//                         <p className='font-[500] text-[16px] text-[#8298AF] font-circular'>~$67,67</p>
//                     </div>
//                     </div>
//                 </div>
//                 </div>
//                 </div>
//                 <div>
//                     <p className='font-medium text-[14px] font-circular text-[#8298AF] pl-2.5'>Bal 67,989 USDC</p>
//                 </div>
//                 <div className='py-3.5'>
//                     <div className='flex flex-row justify-between items-center'>
//                             <div className='flex flex-col gap-2 px-2 py-2.5 rounded-[10px] w-[212.50px] border border-transparent bg-[#132032]'>
//                                 <div className='border flex items-center justify-center w-[72.66px] h-[20px]  border-transparent rounded-[10px] bg-[#88FFF308]'>
//                                     <p className='text-[12px] font-[450]  text-[#88FFF3]'>Best Price</p>
//                                 </div>
//                                 <p className='font-[450] text-[20px] text-white'>$45,8799</p>
//                                 <p className='text-[#8298AF] text-[12px] font-medium'>0.43% Gas fee</p>
//                             </div> 
//                             <ConnectWallet 
//                              onConnected={() => setIsConnected(true)} 
//                              isConnected={isConnected}
//                              bottonLabel={isConnected ? "Bridge" : "Connect Wallet"}
//                             />
                               
//                     </div>

//                 </div>
//                 <div className='flex justify-center items-center'>
//                     <p className='text-center text-[#8298AF] font-[450] text-[12px]'>By confirming, you agree to Asset Chain’s <span className='text-[#2042B8]'>Terms of Use</span></p>
//                 </div>
//             </div>
//             <div className='py-3 px-5 border border-[#1A2739] z-30 bg-[#070E17] rounded-[10px]'>
//             <div className="flex flex-col gap-[3px] z-50">
//                 <p className="text-[16px] font-[450] leading-[145%] font-circular text-white">Transaction History</p>
//                 <p className="text-[#8298AF] text-[15px] ">View and claim bridged asset</p>
//                 <Separator className="my-4 bg-[#1A2739]" />
//                 <div className="px-1.5 py-2 flex flex-row justify-between items-center rounded-[54.11px] bg-[#030A13] overflow-scroll max-w-[313.1px]">
//                     {
//                         transactionCategory.map((item, index) => (
//                             <div key={index} className={`px-2 py-1 border border-transparent flex justify-center items-center ${index === 0 ? "bg-[#3CC9CD] text-[#000000] rounded-[66.18px] w-[84.64px]": ""}`}>
//                                 <p className={`text-[#8298AF] ${index === 0 ? "text-black " : ""} text-[14px] font-[450] leading-[145%] font-circular`}>{item.name}</p>
//                             </div>
//                         ))
//                     }
//                 </div>
//                 <div className="px-3 bg-[#070E17] border border-[#1A2739] py-3 flex flex-col gap-5 rounded-[5px]">
//                     <div className="flex flex-row justify-between items-center">
//                         <div className="flex flex-row space-x-2.5">
//                             <div className="flex flex-row -space-x-5">
//                                 <Image src={polygon} alt="polygon" width={42} height={42} className="z-20"/>
//                                 <Image src={assetChain} alt="assetChain" width={42} height={42} className="z-40"/>
//                             </div>
//                             <div className="flex flex-col gap-0.5">
//                                 <h1 className="text-[#8298AF] font-[450] text-[14px]">Bridged asset</h1>
//                                 <h1 className="text-[#FFFFFF] text-[16px] font-[450]">340,345, USDC</h1>
//                             </div>
//                         </div>
//                         <h1 className="text-[#8298AF] text-[14px] font-[450]">17-05-2056 23:78</h1>
//                     </div>
//                     <div className="flex flex-row justify-between items-center">
//                         <div className="flex flex-col gap-1.5">
//                             <h1 className="text-[#8298AF] text-[14px] font-[450]">Block Verfication</h1>
//                             <div className="flex flex-row space-x-1 items-center">
//                                 <h1 className="text-[16px] font-[450] font-circular">[ 100% ]</h1>
//                                 <Image src={greenCheck} alt="greenCheck" width={16} height={16}/>
//                                 <p className="text-[16px] pl-1 font-[450] text-[#00F482] font-circular">Verifed</p>
//                             </div>
//                         </div>
//                         <Button className="bg-[#2042B8] cursor-pointer w-[139px] rounded-[25.26px]">
//                             Claim
//                         </Button>
//                     </div>
//                 </div>
//                 <div className="px-3 bg-[#070E17] border border-[#1A2739] py-3 flex flex-col gap-5 rounded-[5px]">
//                     <div className="flex flex-row justify-between items-center">
//                         <div className="flex flex-row space-x-2.5">
//                             <div className="flex flex-row -space-x-5">
//                                 <Image src={polygon} alt="polygon" width={42} height={42} className="z-20"/>
//                                 <Image src={assetChain} alt="assetChain" width={42} height={42} className="z-40"/>
//                             </div>
//                             <div className="flex flex-col gap-0.5">
//                                 <h1 className="text-[#8298AF] font-[450] text-[14px]">Bridged asset</h1>
//                                 <h1 className="text-[#FFFFFF] text-[16px] font-[450]">340,345, USDC</h1>
//                             </div>
//                         </div>
//                         <div className="flex flex-col gap-2">
//                         <h1 className="text-[#8298AF] text-[14px] font-[450]">17-05-2056 23:78</h1>
//                         <Button className="font-italic text-[14px] font-[450] text-[#5CFFF3] cursor-pointer bg-[#040A13] w-[86px] ml-8 rounded-[22px]">Trx Hash</Button>
//                         </div>
                      
//                     </div>
//                     <div className="flex flex-row justify-between items-center">
//                         <div className="flex flex-col gap-1.5">
//                             <h1 className="text-[#8298AF] text-[14px] font-[450]">Block Verfication</h1>
//                             <div className="flex flex-row space-x-1 items-center">
//                                 <h1 className="text-[16px] font-[450] font-circular">[ 100% ]</h1>
//                                 <Image src={greenCheck} alt="greenCheck" width={16} height={16}/>
//                                 <p className="text-[16px] pl-1 font-[450] text-[#00F482] font-circular">Verifed</p>
//                             </div>
//                         </div>
//                         <Button className="bg-[#070E17] w-[139px] rounded-[25.26px] cursor-pointer border border-[#213040]">
//                             Claimed
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             </div>
//         </div>
//         </div>
//     </div>
//   )
// }

// export default Bridge