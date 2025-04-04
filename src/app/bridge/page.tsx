import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Repeat } from 'lucide-react'
import Image from 'next/image'
import repeat from "../../../public/assets/repeat.svg";
// import usdc from "../../../public/assets/usdc.svg";
// import tether from "../../../public/assets/tether.svg";
// import xend from "../../../public/assets/xend.svg";
import video from "../../../public/assets/video.svg";
import React from 'react'
import { Button } from '@/components/ui/button';


const Bridge = () => {
  return (
    <div className='w-full relative px-42 py-8 bg-[#0B131E] min-h-screen text-white'>
        {/* Background text */}
        <div className='absolute inset-0  flex items-center -top-85 -z-[9999px] justify-center overflow-hidden'>
        <h1 className='text-[7rem] font-bold text-gray-600 opacity-10'> 
            <span className='pl-140  tracking-[22.5px]'>Asset Chain</span><br/> <span className='tracking-[23.5px]'>Cross Chain Bridge</span>
            </h1>
        </div>
      
        <div className='flex flex-col space-y-6'>
            <div className='flex flex-col gap-3'>
            <h1 className='navbar-text font-[450] text-[40px] font-circular'>Bridge</h1>
            <p className='text-[#8298AF] text-[16px] font-[450] leading-[120%] font-circular'>Effortlessly transfer assets from multiple blockchain networks to the <br/> Asset Chain with seamless interoperability and enhanced security.</p>
            </div>
            <div className='flex justify-end items-center'>
                <Button variant="outline" className='z-40 rounded-[25.26px] -mb-4.5 bg-[#0A111A] mr-2.5 flex flex-row gap-1.5 '>
                    <p>Watch to learn</p>
                    <Image alt="playVideo" src={video} width={20} height={20} color='#3CCACE'/>
                </Button>
            </div>
        <div className='grid grid-cols-2 gap-2'>
            <div className='py-4.5 px-5 col-span-[554.32px] border border-[#8298AF]  bg-[#1A2739] rounded-[10px] z-50 flex flex-col gap-3.5'>
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
                   richard
                </div> 
                <div>
                   richard
                </div> 
                </div>
                <div className='flex flex-row justify-center items-center cursor-pointer'>
                    <div className='py-2.5 px-3 rounded-[50%] border border-transparent bg-[#269497]'>
                        <Image src={repeat} width={14} height={17} alt="repeat" color='#3CCACE' className=''/>
                    </div>
                </div>
                {/*  START OF THE SEND AND RECEIVE CARD */}
                <div className='flex flex-row justify-between'>
                <div className='flex flex-col gap-3'>
                <h1 className='font-[450] text-[16px] font-circular pl-2.5'>You Send</h1>
                <div className='border border-transparent rounded-[10px] bg-[#030A13]'>
                    <div className='px-3 py-2 w-[236.40px] flex flex-col gap-3.5'>
                            <div>
                            <Select>
                    <SelectTrigger className="w-[142.82px] rounded-[36.14px]">
                    <SelectValue placeholder="Select asset" />
                    </SelectTrigger>
                    <SelectContent className='bg-[#0B131E] w-[142.82px]'>
                    <SelectGroup >
                    {/*selected items should be here */}
                    </SelectGroup>
                    </SelectContent>
                    </Select>
                    </div>

                    <div className='flex flex-row justify-between items-center'>
                        <p className='font-[450] text-[16px] text-white font-circular'>45,8799</p>
                        <p className='font-[500] text-[16px] text-[#8298AF] font-circular'>~$67,67</p>
                    </div>
                    </div>
                </div>
                </div>
                <div className='flex flex-col gap-3'>
                <h1 className='font-[450] text-[16px] font-circular pl-2.5'>You Receive</h1>
                <div className='border border-transparent rounded-[10px] bg-[#030A13]'>
                    <div className='px-3 py-2 w-[236.40px] flex flex-col gap-3.5'>
                            <div>
                            <Select>
                    <SelectTrigger className="w-[142.82px] rounded-[36.14px]">
                    <SelectValue placeholder="Select asset" />
                    </SelectTrigger>
                    <SelectContent className='bg-[#0B131E] w-[142.82px]'>
                    <SelectGroup >
                    {/*selected items should be here */}
                    </SelectGroup>
                    </SelectContent>
                    </Select>
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
                    <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-col gap-2 px-2 py-2.5 rounded-[10px] w-[212.50px] border border-transparent bg-[#132032]'>
                                <div className='border flex items-center justify-center w-[72.66px] h-[20px]  border-transparent rounded-[10px] bg-[#88FFF308]'>
                                    <p className='text-[12px] font-[450]  text-[#88FFF3]'>Best Price</p>
                                </div>
                                <p className='font-[450] text-[20px] text-white'>$45,8799</p>
                                <p className='text-[#8298AF] text-[12px] font-medium'>0.43% Gas fee</p>
                            </div> 
                            <Button className='w-[215px] bg-[#2042B8] rounded-[25.26px]'>
                                Connect Wallet
                            </Button>     
                    </div>

                </div>
                <div className='flex justify-center items-center'>
                    <p className='text-center text-[#8298AF] font-[450] text-[12px]'>By confirming, you agree to Asset Chain’s <span className='text-[#2042B8]'>Terms of Use</span></p>
                </div>
            </div>
            <div className='py-3 px-5 border border-[#070E17] z-50 bg-[#1A2739] rounded-[10px]'>
            <div className="flex flex-col gap-3">
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Bridge