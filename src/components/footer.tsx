import localFont from 'next/font/local';
import React from 'react'

const circularStd = localFont({
  src: "../../public/fonts/CircularStd-Medium.woff2",
});

const Footer = () => {
  return (
    <div className={`px-4 sm:px-8 md:px-[47.38px] py-4 sm:py-6 md:py-[27.43px] flex flex-col md:flex-row justify-between items-center ${circularStd.className}`}>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-[#8298AF] text-xs sm:text-sm md:text-[14px] font-medium mb-3 md:mb-0">
        <p>Give Feedback</p>
        <p>Support</p>
        <p>Explorer</p>
        <p>Doc</p>
      </div>
      <div className="text-[#8298AF] font-medium text-xs sm:text-sm md:text-[14px]">
        <p>Version 1.2</p>
      </div>
    </div>
  )
}

export default Footer


