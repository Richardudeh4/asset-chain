"use client";

import repeat from "../../../public/assets/repeat.svg";
import video from "../../../public/assets/video.svg";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BuySelect from "./components/BuySelect";
import SelectAsset from "./components/SelectAsset";
import { ConnectWallet } from "./components/ConnectWallet";
import bgText from "../../../public/assets/bgText.svg";
import localFont from "next/font/local";
import assetArrow from "../../../public/assets/assetArrow.svg";
import { Input } from "@/components/ui/input";
import { InputAmount } from "./components/InputAmount";
import { TransactionList } from "./components/TransactionList";
import { ChainId, Token } from "@/lib/types";
import { useToken } from "@/context/token";
import { findTokenByChains } from "@/lib/helpers";
import { chains, defaultChainId } from "@/lib/constants";
import { useWallet } from "@/context/web3";

const circularStd = localFont({
  src: "../../../public/fonts/CircularStd-Medium.woff2",
});

const defaultFromChain = chains.filter(
  (c) => c.chainId.toString() !== defaultChainId.toString()
)[0];
const defaultToChain = chains.filter(
  (c) => c.chainId.toString() === defaultChainId
)[0];
const Bridge = () => {
  //   const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromChain, setFromChain] = useState<ChainId>(defaultFromChain.chainId);
  const [destinationChain, setDestinationChain] = useState<ChainId>(
    defaultToChain.chainId
  );

  const { selectedToken, setSelectedToken } = useToken();
  const { isConnected } = useWallet();

  useEffect(() => {
    setToken();
  }, [fromChain, destinationChain]);

  function setChain(type: "from" | "to", chainId: ChainId) {
    // if (!selectedToken) return;
    const chain = chains.find((s) => s.chainId === chainId);
    if (!chain) return;
    if (type === "from") {
      if (chainId !== destinationChain) {
        setFromChain(chainId);
      } else {
        const newTochain = chains.find((s) => s.chainId !== chainId);
        setFromChain(chainId);
        setDestinationChain(newTochain ? newTochain.chainId : defaultChainId);
      }
    } else {
      if (chainId !== fromChain) {
        setDestinationChain(chainId);
      } else {
        const newFromchain = chains.find((s) => s.chainId !== chainId);
        setFromChain(newFromchain ? newFromchain.chainId : defaultChainId);
        setDestinationChain(chainId);
      }
    }
  }

  async function setToken() {
    // if (!selectedToken || !supportedChains) return;
    // if (!supportedChains[selectedToken.symbol]) return;
    const _tokens = findTokenByChains(fromChain, destinationChain);
    if (!_tokens) {
      setTokens([]);
      setSelectedToken(null);
      return;
    }

    const realTokens = _tokens.map((t) => ({ label: t, value: t }));
    // console.log(realTokens, 'real tokens')
    setTokens(realTokens);
    setSelectedToken(realTokens.length > 0 ? realTokens[0] : null);
  }

  return (
    <div
      className={`w-full relative py-8 bg-[#0B131E] min-h-screen text-white ${circularStd.className}`}
    >
      <div className="flex justify-center absolute top-1.5 [&>svg>path]:fill-[#0A111A] items-center">
        <Image
          src={bgText}
          alt="bg-text"
          className="[&>svg>path]:fill-[#0A111A]"
        />
      </div>
      <div className="flex flex-col space-y-6 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 z-[50]">
          <h1 className="navbar-text font-[450] text-[40px] font-circular">
            Bridge
          </h1>
          <p className="text-[#8298AF] text-[16px] font-[450] leading-[120%] font-circular">
            Effortlessly transfer assets from multiple blockchain networks to
            the <br /> Asset Chain with seamless interoperability and enhanced
            security.
          </p>
        </div>
        <div className="flex justify-end items-center">
          <Button
            variant="outline"
            className="z-40 rounded-[25.26px] cursor-pointer hidden  -mb-4.5 bg-[#0A111A] mr-2.5 md:flex flex-row gap-1.5 "
          >
            <p>Watch to learn</p>
            <Image
              src={video || "/placeholder.svg"}
              alt="playVideo"
              width={20}
              height={20}
              color="#3CCACE"
            />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15px] md:gap-[15px]">
          <div className="py-4.5 px-5 col-span-[554.32px] border relative border-[#1A2739] bg-[#070E17] rounded-[10px] z-50 flex flex-col gap-3.5">
            <Image
              src={assetArrow}
              className="absolute top-2 -right-0 hidden md:flex"
              alt="BridgeArrow "
            />
            <div className="flex md:flex-row flex-col md:justify-between items-center">
              <div className="flex flex-col gap-6 w-full border-none ">
                <div className="flex flex-col gap-1">
                  <h1>From</h1>
                  <p className="text-[#8298AF] text-[12px] font-[450]">
                    source network
                  </p>
                </div>
                <BuySelect
                  label="From"
                  onChange={(chainId) => setChain("from", chainId)}
                  selectedChain={fromChain}
                  supportedChains={chains}
                />
                <div className="pt-10 flex flex-col gap-2">
                  <h1 className="text-[16px] font-[450]  pl-5">You Send</h1>
                  <div className="bg-[#030A13] rounded-[10px] text-white px-3.5 py-2 flex flex-col gap-4.5">
                    <SelectAsset tokens={tokens} />
                    <div className="flex flex-row justify-between items-center">
                      <InputAmount
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      {/* <h1 className='font-[450] text-[16px] text-white font-circular'>45,8799</h1> */}
                      <p className="font-[500] text-[16px] text-[#8298AF] font-circular">
                        ~$67,67
                      </p>
                    </div>
                  </div>
                  {isConnected && (
                    <p className="font-medium text-[14px] font-circular text-[#8298AF] pl-2.5 pb-3">
                      Bal 67,989 USDC
                    </p>
                  )}
                </div>
              </div>

              <div className="py-3 px-3  rounded-[50%] cursor-pointer hover:bg-[#269497]/90 md:mt-0 mt-4  border border-transparent bg-[#269497]">
                <Image
                  src={repeat}
                  width={22}
                  height={22}
                  alt="repeat"
                  color="#3CCACE"
                  className=""
                />
              </div>
              <div className="flex flex-col gap-6 w-full border-none">
                <div className="flex flex-col gap-1.5">
                  <h1>To</h1>
                  <p className="text-[#8298AF] text-[12px] font-[450]">
                    Destination network
                  </p>
                </div>
                <BuySelect
                  label="To"
                  onChange={(chainId) => setChain("to", chainId)}
                  selectedChain={destinationChain}
                  supportedChains={chains}
                />
                <div className="pt-10 flex flex-col gap-2">
                  <h1 className="text-[16px] font-[450] pl-2">You Receive</h1>
                  <div className="bg-[#030A13] rounded-[10px] text-white px-3.5 py-2 flex flex-col gap-4.5">
                    <SelectAsset isMain tokens={tokens} />
                    <div className="flex flex-row justify-between items-center">
                      <InputAmount readOnly value={inputValue} />
                      {/* <h1 className='font-[450] text-[16px] text-white font-circular'>45,8799</h1> */}
                      <p className="font-[500] text-[16px] text-[#8298AF] font-circular">
                        ~$67,67
                      </p>
                    </div>
                  </div>
                  {isConnected && (
                    <p className="font-medium text-[14px] font-circular text-[#8298AF] pl-2.5 pb-3">
                      Bal 67,989 USDC
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="py-3.5">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-col gap-2 px-2 py-2.5 rounded-[10px] w-full sm:w-[212.50px] border border-transparent bg-[#132032]">
                  <div className="border flex items-center justify-center w-[72.66px] h-[20px]  border-transparent rounded-[10px] bg-[#88FFF308]">
                    <p className="text-[12px] font-[450]  text-[#88FFF3]">
                      Best Price
                    </p>
                  </div>
                  <p className="font-[450] text-[20px] text-white">$45,8799</p>
                  <p className="text-[#8298AF] text-[12px] font-medium">
                    0.43% Gas fee
                  </p>
                </div>
                <ConnectWallet
                  bottonLabel={isConnected ? "Brigde" : "Connect wallet"}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-center text-[#8298AF] font-[450] text-[12px]">
                By confirming, you agree to Asset Chain’s{" "}
                <span className="text-[#2042B8]">Terms of Use</span>
              </p>
            </div>
          </div>
          <TransactionList />
        </div>
      </div>
    </div>
  );
};

export default Bridge;
