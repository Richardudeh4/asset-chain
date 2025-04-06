"use client";
import Image from 'next/image'
import React from 'react'
import assetChainLogo from '../../public/assets/assetChainLogo.svg';
import hamBurger from '../../public/assets/hamBurger.svg';
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
    <div className='w-full bg-[#1A2739] border-b-[1px] z-[9999px] border-b-[#1A2739]'>
      <div className='px-[27.38px] py-[27.43px] flex flex-row justify-between items-center'>
        <div className="flex md:hidden">
        <Image src={hamBurger} width={39} height={39} alt="hamburger"/>
        </div>
        {/* logo */}
            <div className='cursor-pointer hidden md:flex '>
                <Link href="/">
                <Image src={assetChainLogo} alt="assetChainLogo" height={22} width={126}/>
                </Link>
            </div>
            {/* Navlinks */}
            <div className='flex-row items-center space-x-7 hidden md:flex'>
                {
                    navbarLinks.map((link, index) => (
                        <Link href={link.href} key={index} className={`${pathName === link.href} ? "text-[#3CC9CD]" : "" hidden md:flex`}>
                                <p className={`text-[16px] font-semibold navbar-text ${pathName === link.href ? "text-[#3CC9CD] relative  after:content-[''] after:absolute after:left-0 after:bottom-[-30px] after:w-full after:h-[3px] after:bg-[#00FFF0]": "text-[#FFFFFF]"}`}>
                                {link.label} 
                            </p>
                               
                        </Link>
                    ))
                }
            
            </div>

            <div className=''>
            <Button className='bg-[#2042B8] w-[133.01px] rounded-[25.26px]'>
                Connect Wallet
            </Button>
            </div>

      </div>
    </div>
  )
}

export default Navbar