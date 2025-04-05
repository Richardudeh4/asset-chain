"use client";
import Image from 'next/image'
import React from 'react'
import assetChainLogo from '../../public/assets/assetChainLogo.svg';
// import arrow from '../../public/assets/arrow.svg';
// import gas from '../../public/assets/gas.svg';
// import mask from '../../public/assets/mask.svg';
// import arrowDown from '../../public/assets/arrowDown.svg';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

const navbarLinks = [
    {label: 'Farming', href:"/"},
    {label: 'Swap', href:"/boost"},
    {label: 'Liqudity', href:"/referral"},
    {label: 'Leaderboard', href:"/leaderboard"},
    {label: 'Bridge', href:"/bridge"},
    {label: 'Explorer', href:"/swap"},
    {label: 'Community', href:"/liquidity"},
]
const Navbar = () => {
    const pathName = usePathname();
  return (
    <div className='w-full bg-[#1A2739] border-b z-[9999px] border-b-gray-400'>
      <div className='px-[27.38px] py-[27.43px] flex flex-row justify-between items-center'>
        {/* logo */}
            <div className='cursor-pointer'>
                <Link href="/">
                <Image src={assetChainLogo} alt="assetChainLogo" height={22} width={126}/>
                </Link>
            </div>
            {/* Navlinks */}
            <div className='flex flex-row items-center space-x-7'>
                {
                    navbarLinks.map((link, index) => (
                        <Link href={link.href} key={index} className={`${pathName === link.href} ? "text-[#3CC9CD]" : ""`}>
                                <p className={`text-[16px] font-semibold navbar-text ${pathName === link.href ? "text-[#3CC9CD] relative  after:content-[''] after:absolute after:left-0 after:bottom-[-30px] after:w-full after:h-[3px] after:bg-[#00FFF0]": "text-[#FFFFFF]"}`}>
                                {link.label} 
                            </p>
                               
                        </Link>
                    ))
                }
            
            </div>

            <div className='flex '>
            {/* <Button variant="outline" className='rounded-[65.37px] bg-transparent flex flex-row space-x-1.5'>
                <Image src={gas} alt="gas" width={20} height={20}/>
                <p className='md:flex hidden font-circular text-white'>Get Gas</p>
            </Button>
            <Button variant="outline" className='rounded-[65.37px] flex bg-transparent flex-row space-x-0.25'>
                <Image src={mask} width={22} height={19} alt="mask logo"/>
                <p className='font-semibold text-[12.51px] leading-2 font-fira text-white'>0xtG...45Fgh0</p>
                <Image src={arrowDown} width={16} height={16} alt="arrowDown"/>
            </Button> */}
            <Button className='bg-[#2042B8] w-[133.01px] rounded-[25.26px]'>
                Connect Wallet
            </Button>
            </div>

      </div>
    </div>
  )
}

export default Navbar