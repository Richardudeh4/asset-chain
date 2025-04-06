import Image from 'next/image'
import React from 'react';
import arrowLeft from "../../public/assets/arrowLeft.svg";

const AssetChainBadge = () => {
  return (
    <div className="flex justify-center w-full items-center h-auto py-2 px-4 bg-gradient-to-r from-[#3CC9CD] from-65% to-[#2042B8]">
      <div className="flex sm:flex-row  items-center justify-center  sm:space-x-5 space-x-2 sm:space-y-0 text-center">
        <h1 className="font-medium text-[14px] hidden sm:flex sm:text-[15px] font-circular leading-snug">
          Join the Asset Chain Farming Point Program
        </h1>
        <h1 className='font-medium text-[14.79px] flex  sm:hidden sm:text-[15px] font-circular leading-snug'>
        Add Liquidity to wEth/USDT to earn 4,000p
        </h1>
        <div className="px-2 py-2 rounded-full border border-black flex justify-center items-center bg-transparent">
          <Image src={arrowLeft} width={8} height={8} alt="arrow left" />
        </div>
      </div>
    </div>
  )
}

export default AssetChainBadge;


// import Image from 'next/image'
// import React from 'react';
// import arrowLeft from "../../public/assets/arrowLeft.svg";

// const AssetChainBadge = () => {
//   return (
//     <div className='flex justify-center w-full items-center h-[33px] bg-gradient-to-r from-[#3CC9CD] from-65% to-[#2042B8]'>
//         <div className='flex flex-row space-x-5 items-center'>
//             <h1 className='font-medium text-[15px] font-circular'>Join the Asset Chain Farming Point Program</h1>
//             <div className='px-1.5 py-1.5 rounded-[50%] border border-black flex justify-center items-center bg-transparent'>
//                 <Image src={arrowLeft} width={6} height={6} alt="arrowleft"/>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default AssetChainBadge