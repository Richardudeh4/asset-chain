"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import assetChainLogo from "../../public/assets/assetChainLogo.svg";
import hamBurger from "../../public/assets/hamBurger.svg";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import localFont from "next/font/local";
import navArrow from "../../public/assets/navArrow.svg";
import asset from "../../public/assets/asset.svg";
import { ConnectWalletHeader } from "@/app/bridge/components/ConnectWalletHeader";
import arrowExpand from "../../public/assets/arrowExpand.svg";
import blue from "../../public/assets/blue.svg";
import { useWallet } from "@/context/web3";
import menuWidget from "../../public/assets/menuWidget.svg";
import metaMask from "../../public/assets/metaMask.svg";
import walletConnect from "../../public/assets/walletConnet.svg";
import trust from "../../public/assets/trust.svg";
import { isProd } from "@/config/env-var";


const circularStd = localFont({
  src: "../../public/fonts/CircularStd-Medium.woff2",
});

const swap = isProd
  ? "https://swap.assetchain.org/"
  : "https://swap-testnet.assetchain.org/";
const explorer = isProd
  ? "https://scan.assetchain.org/"
  : "https://scan-testnet.assetchain.org/";

const navbarLinks = [
  { label: "Bridge", href: "/", newTab: false },
  {
    label: "Liqudity Mining",
    href: "https://liquidity-testnet.assetchain.org/",
    newTab: true,
  },
  { label: "Swap", href: swap, newTab: true },
  { label: "Explorer", href: explorer, newTab: true },
  { label: "Give Feedback", href: "GiveFeedback", newTab: false },
  { label: "Support", href: "https://docs.assetchain.org/", newTab: true },
  { label: "FAQs", href: "#faqs", newTab: false },
];

// aniamtion variable

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0, 0.55, 0.45, 1],
    },
  },
};

const menuVars = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.12, 0, 0.39, 0],
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      duration: 0.5,
      delay: 0.5,
      ease: [0.12, 0, 0.39, 1],
    },
  },
};
const containerVars = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

const connectWalletItems = [
  { name: "MetaMask", icon: metaMask, key: "metamask" },
  { name: "Wallet Connect", icon: walletConnect, key: "walletconnect" },
  { name: "Trust Wallet", icon: trust, key: "trustwallet",  },
];

const Navbar = () => {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the popover when a click is made outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDesktopMenu(false);
      }
    };

    if (openDesktopMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDesktopMenu]);

  const { isConnected, address, walletType } = useWallet();

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";
  const connectedWallet = connectWalletItems.find((w) => w.key === walletType);

  return (
    <div
      className={`w-full bg-[#1A2739] z-60 border-b-[1px] border-b-[#1A2739] ${circularStd.className}`}
    >
      <div className="md:px-[47.38px] px-[27.38px] py-[27.43px] flex flex-row justify-between items-center">
        {/* Mobile menu button and logo */}
        <div className="flex items-center space-x-4 md:hidden">
          {isMenuOpen ? (
            <div>
              <div className="cursor-pointer">
                <X width={39} height={39} onClick={toggleMenu} color="white" />
              </div>
            </div>
          ) : (
            <div className="cursor-pointer" onClick={toggleMenu}>
              <Image src={hamBurger} width={39} height={39} alt="hamburger" />
            </div>
          )}
        </div>

        {/* Desktop logo */}
        <div className="cursor-pointer md:flex-row md:items-center md:space-x-2.5 hidden md:flex">
          <Link href="/">
            <Image
              src={assetChainLogo}
              alt="assetChainLogo"
              height={22}
              width={126}
              className=""
            />
          </Link>
          <div className="border border-[#283B53] h-[32.93px]" />
          <div
            className="flex flex-row cursor-pointer space-x-3 items-center"
            onClick={() => setOpenDesktopMenu(!openDesktopMenu)}
            ref={menuRef}
          >
            <Image
              src={menuWidget}
              width={24}
              height={24}
              alt="menuWidget"
              className="hover:text-[#3CC9CD] hover:transition-all hover:duration-400 hover:ease-in"
            />
            <h1 className="text-[16px] font-[500] text-[#FFFFFF] hover:text-[#3CC9CD] hover:transition-all hover:duration-400 hover:ease-in">
              Menu
            </h1>
          </div>
        </div>
        {openDesktopMenu && (
          <div
            className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
            onClick={() => setOpenDesktopMenu(false)}
          />
        )}
        {openDesktopMenu && (
          <div
            className="absolute left-42 mt-[498px] w-[243px] bg-[#070E17] rounded-[10px] shadow-lg z-50"
            ref={menuRef}
          >
            <div className="py-8 px-8 flex flex-col space-y-8">
              {navbarLinks.map((link, index) => (
                <Link
                  href={link.href}
                  key={index}
                  target={link.newTab ? "_blank" : undefined}
                  className="flex flex-row space-x-4 items-center"
                >
                  <p
                    className={`text-[16.09px] font-medium navbar-text ${
                      pathName === link.href
                        ? "text-[#3CC9CD]"
                        : "text-[#FFFFFF] hover:text-[#3CC9CD] hover:transition-all hover:duration-400 hover:ease-in"
                    }`}
                  >
                    {link.label}
                  </p>
                  {link.newTab && (
                    <Image
                      src={navArrow}
                      width={12}
                      height={12}
                      alt="navArrow"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Connect Wallet Button */}
        <div className="">
          <ConnectWalletHeader
            bottonLabel={
              isConnected ? (
                <div className="flex flex-row space-x-1.5 justify-between items-center">
                  <Image
                    src={connectedWallet ? connectedWallet.icon : blue}
                    width={22}
                    height={19}
                    alt=""
                  />
                  <p className="text-[#FFFFFF] text-[12.51px] font-semibold">
                    {truncatedAddress}
                  </p>
                  <Image
                    src={arrowExpand}
                    width={16}
                    height={16}
                    alt="arrowExpand"
                  />
                </div>
              ) : (
                "Connect Wallet"
              )
            }
          />
        
    
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
            className="md:hidden bg-[#070E17] w-full fixed left-0 top-0 origin-top h-screen p-10"
          >
            <div className="flex flex-col h-full space-y-4">
              <div className="flex flex-row justify-between items-center">
                {/* logo */}
                {/* <div className='cursor-pointer'>
                    <Link href="/">
                        <Image src={assetChainLogo} alt="assetChainLogo" height={22} width={126} className=''/>
                    </Link>
                     </div> */}
                {/* Navbar close */}
                <div className="flex flex-row items-center space-x-2.5">
                  <div className="cursor-pointer p-2 border border-[#1A2739]  rounded-[6.09px]">
                    <X
                      width={29}
                      height={29}
                      onClick={toggleMenu}
                      color="white"
                    />
                  </div>
                  <div className="cursor-pointer">
                    <Link href="/">
                      <Image
                        src={asset}
                        alt="assetChainLogo"
                        height={32}
                        width={47}
                        className=""
                      />
                    </Link>
                  </div>
                </div>
                <Button className="bg-[#2042B8] w-[133.01px] rounded-[25.26px]">
                  Connect Wallet
                </Button>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                exit="initial"
                animate="open"
                className="flex flex-col space-y-4 mt-10"
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
                    <Link
                      href={link.href}
                      className="flex flex-row space-x-1.5 items-center"
                      target={link.newTab ? "_blank" : undefined}
                    >
                      <p className="text-[20.18px] font-medium">{link.label}</p>
                      {link.newTab ? (
                        <Image
                          src={navArrow}
                          width={13}
                          height={13}
                          alt="purpleArrow"
                        />
                      ) : (
                        ""
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

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
