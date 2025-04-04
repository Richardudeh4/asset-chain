import Image from 'next/image'
import React from 'react';
import arrowLeft from "../../public/assets/arrowLeft.svg";

const AssetChainBadge = () => {
  return (
    <div className='flex justify-center w-full items-center h-[33px] bg-gradient-to-r from-[#3CC9CD] from-65% to-[#2042B8]'>
        <div className='flex flex-row space-x-5 items-center'>
            <h1 className='font-medium text-[15px] font-circular'>Join the Asset Chain Farming Point Program</h1>
            <div className='px-1.5 py-1.5 rounded-[50%] border border-black flex justify-center items-center bg-transparent'>
                <Image src={arrowLeft} width={6} height={6} alt="arrowleft"/>
            </div>
        </div>
    </div>
  )
}

export default AssetChainBadge