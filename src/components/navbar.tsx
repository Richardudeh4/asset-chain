"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import assetChainLogo from '../../public/assets/assetChainLogo.svg';
import hamBurger from '../../public/assets/hamBurger.svg';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion';

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
// aniamtion variable

const mobileLinkVars = {
    initial:{
      y: "30vh",
      transition:{
        duration:0.5,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open:{
      y:0,
      transition:{
        duration:0.7,
        ease: [0, 0.55,0.45, 1]
      },
    },
  };

  
const menuVars = {
    initial: {
      scaleY : 0,
    },
    animate: {
      scaleY : 1,
      transition:{
        duration:0.5,
        ease: [0.12,0,0.39,0],
      },
    },
    exit:{
      scaleY: 0,
      transition:{
        duration:0.5,
        delay:0.5,
        ease: [0.12,0,0.39,1],
      },
    }
  };
  const containerVars = {
    initial:{
      transition:{
        staggerChildren:0.09,
        staggerDirection: -1,
      },
    },
    open:{
      transition:{
        delayChildren:0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      }
    }
  };
    return (
        <div className='w-full bg-[#1A2739] z-60   border-b-[1px]  border-b-[#1A2739]'>
            <div className='px-[27.38px] py-[27.43px] flex flex-row justify-between items-center'>
                {/* Mobile menu button and logo */}
                <div className="flex items-center space-x-4 md:hidden">
                    {
                        isMenuOpen ? (
                        <div>
                            <div className='cursor-pointer'>
                                <X width={39} height={39} onClick={toggleMenu} color='white'/>
                            </div>
                        </div>
                        ): (
                         <div className="cursor-pointer" onClick={toggleMenu}>
                            <Image src={hamBurger} width={39} height={39} alt="hamburger"/>
                        </div>
                        )
                    }
                   
                    
                </div>

                {/* Desktop logo */}
                <div className='cursor-pointer hidden md:flex'>
                    <Link href="/">
                        <Image src={assetChainLogo} alt="assetChainLogo" height={22} width={126} className=''/>
                    </Link>
                </div>

                {/* Desktop Navlinks */}
                <div className='flex-row items-center space-x-7 hidden md:flex'>
                    {navbarLinks.map((link, index) => (
                        <Link href={link.href} key={index}>
                            <p className={`text-[16px] font-semibold navbar-text ${
                                pathName === link.href 
                                    ? "text-[#3CC9CD] relative after:content-[''] after:absolute after:left-0 after:bottom-[-30px] after:w-full after:h-[3px] after:bg-[#00FFF0]" 
                                    : "text-[#FFFFFF]"
                            }`}>
                                {link.label} 
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Connect Wallet Button */}
                <div className=''>
                    <Button className='bg-[#2042B8] w-[133.01px] rounded-[25.26px]'>
                        Connect Wallet
                    </Button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                variants={menuVars}
                initial="initial"
                animate="animate"
                exit="exit"
                 className="md:hidden bg-[#1A2739] w-full fixed left-0 top-0 origin-top h-screen p-10">
                    <div className="flex flex-col h-full space-y-4">
                    <div className="flex flex-row justify-between items-center">
                                   {/* logo */}
                    <div className='cursor-pointer'>
                    <Link href="/">
                        <Image src={assetChainLogo} alt="assetChainLogo" height={22} width={126} className=''/>
                    </Link>
                     </div>
                     {/* Navbar close */}
                        <div className='cursor-pointer'>
                                <X width={39} height={39} onClick={toggleMenu} color='white'/>
                            </div>
                        </div>
                        <motion.div 
                        variants={containerVars}
                        initial ="initial"
                        exit="initial"
                        animate="open"
                        className='flex flex-col space-y-4 mt-10'
                        >
                    {navbarLinks.map((link, index) => (
                            <motion.div 
                                variants={mobileLinkVars}
                                key={index}
                                onClick={() => setIsMenuOpen(false)}
                                className={`py-2 px-4 rounded-md ${
                                    pathName === link.href 
                                        ? "text-[#3CC9CD] bg-[#2a3a52]" 
                                        : "text-[#FFFFFF] hover:bg-[#2a3a52]"
                                }`}
                            >
                              <Link href={link.href}>
                              {link.label}
                              </Link> 
                            </motion.div>
                        ))}
                        </motion.div>  
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    )
}

export default Navbar

// "use client";
// import Image from 'next/image'
// import React, { useState } from 'react'
// import assetChainLogo from '../../public/assets/assetChainLogo.svg';
// import hamBurger from '../../public/assets/hamBurger.svg';
// // import arrow from '../../public/assets/arrow.svg';
// // import gas from '../../public/assets/gas.svg';
// // import mask from '../../public/assets/mask.svg';
// // import arrowDown from '../../public/assets/arrowDown.svg';
// import Link from 'next/link';
// import { Button } from './ui/button';
// import { usePathname } from 'next/navigation';
// import MobileSidebar from './mobile-sidebar';

// const navbarLinks = [
//     {label: 'Farming', href:"/"},
//     {label: 'Swap', href:"/boost"},
//     {label: 'Liqudity', href:"/referral"},
//     {label: 'Leaderboard', href:"/leaderboard"},
//     {label: 'Bridge', href:"/bridge"},
//     {label: 'Explorer', href:"/swap"},
//     {label: 'Community', href:"/liquidity"},
// ]
// const Navbar = () => {
//     const pathName = usePathname();
//     const [isOpen, setIsOpen] = useState(false);
//     const closeMenu = () => {
//         setIsOpen(false);
//     };
//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };
//   return (
//     <div className='w-full bg-[#1A2739] border-b-[1px] z-[9999px] border-b-[#1A2739]'>
//       <div className='px-[27.38px] py-[27.43px] flex flex-row justify-between items-center'>
//         <div className="flex md:hidden cursor-pointer" onClick={toggleMenu}>
//         <Image src={hamBurger} width={39} height={39} alt="hamburger"/>
//         </div>
//         {/* logo */}
//             <div className='cursor-pointer hidden md:flex'>
//                 <Link href="/">
//                 <Image src={assetChainLogo} alt="assetChainLogo" height={22} width={126}/>
//                 </Link>
//             </div>
//             {/* Navlinks */}
//             <div className='flex-row items-center space-x-7 hidden md:flex'>
//                 {
//                     navbarLinks.map((link, index) => (
//                         <Link href={link.href} key={index} className={`${pathName === link.href} ? "text-[#3CC9CD]" : "" hidden md:flex`}>
//                                 <p className={`text-[16px] font-semibold navbar-text ${pathName === link.href ? "text-[#3CC9CD] relative  after:content-[''] after:absolute after:left-0 after:bottom-[-30px] after:w-full after:h-[3px] after:bg-[#00FFF0]": "text-[#FFFFFF]"}`}>
//                                 {link.label} 
//                             </p>
                               
//                         </Link>
//                     ))
//                 }
            
//             </div>

//             <div className=''>
//             <Button className='bg-[#2042B8] w-[133.01px] rounded-[25.26px]'>
//                 Connect Wallet
//             </Button>
//             </div>

//       </div>
//     </div>
//   )
// }

// export default Navbar