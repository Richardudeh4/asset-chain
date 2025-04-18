"use client";
import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import greyCircle from "../../../../public/assets/greyCircle.svg";
import polygon from "../../../../public/assets/Polygon.png";
import assetChain from "../../../../public/assets/Assetchain.png";
import binance from "../../../../public/assets/Binance-smart-chain.png";
import arbitrium from "../../../../public/assets/Arbitrium.png";
import base from "../../../../public/assets/Base.png";
import ethereum from "../../../../public/assets/Ethereum.png";
import bitLayer from "../../../../public/assets/bitlayer.png";

import polygonSvg from "../../../../public/assets/polygon.svg";
import assetChainSvg from "../../../../public/assets/assetChain.svg";
import binanceSvg from "../../../../public/assets/binance-smart-chain.svg";
import arbitriumSvg from "../../../../public/assets/arbitrium.svg";
import baseSvg from "../../../../public/assets/base.svg";
import ethereumSvg from "../../../../public/assets/ethereum.svg";
import bitLayerSvg from "../../../../public/assets/bitlayer.svg";
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Chain, ChainId } from "@/lib/types";

export function getChain(chainId: ChainId){
  switch (chainId) {
    case "200810":
      return {
        label: "Bitlayer",
        icon: bitLayer,
        chainId,
        svg: bitLayerSvg
      }
    case '1':
      return {
        label: "Ethereum",
        icon: ethereum,
        chainId,
        svg: ethereumSvg
      }
    case '200901':
      return {
        label: "Bitlayer",
        icon: bitLayer,
        chainId,
        svg: bitLayerSvg
      }
    case '137':
      return {
        label: "Polygon",
        icon: polygon,
        chainId,
        svg: polygonSvg
      }
    case '42161':
      return {
        label: "Arbitrium",
        icon: arbitrium,
        chainId,
        svg: arbitriumSvg
      }
    case '56':
      return {
        label: "Binance Smart Chain",
        icon: binance,
        chainId,
        svg: binanceSvg
      }
    case '8453':
      return {
        label: "Base",
        icon: base,
        chainId,
        svg: baseSvg
      }
    case '42420':
      return {
        label: "Asset Chain",
        icon: assetChain,
        chainId,
        svg: assetChainSvg
      }
    case '42421':
      return {
        label: "Asset Chain",
        icon: assetChain,
        chainId,
        svg: assetChainSvg
      }
    case '84532':
      return {
        label: "Base",
        icon: base,
        chainId,
        svg: baseSvg
      }
    case '421614':
      return {
        label: "Arbitrium",
        icon: arbitrium,
        chainId,
        svg: arbitriumSvg
      }
    case '80001':
      return {
        label: "Polygon",
        icon: polygon,
        chainId,
        svg: polygonSvg
      }
    case '80002':
      return {
        label: "Polygon",
        icon: polygon,
        chainId,
        svg: polygonSvg
      }
    case '11155111':
      return {
        label: "Ethereum",
        icon: ethereum,
        chainId,
        svg: ethereumSvg
      }
    case '421611':
      return {
        label: "Arbitrium",
        icon: arbitrium,
        chainId,
        svg: arbitriumSvg
      }
    case '97':
      return {
        label: "Binance Smart Chain",
        icon: binance,
        chainId,
        svg: binanceSvg
      }
    default:
      return {
        label: "Asset chain",
        icon: assetChain,
        chainId,
        svg: assetChainSvg
      }
  }
}


type Props =  {supportedChains: Chain[], selectedChain: ChainId | null, label: string, onChange: ( chain: ChainId) => void}

export default function BuySelect({supportedChains, selectedChain, label, onChange}: Props) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  const supportedChainDetails = supportedChains.map(chain => {
      const details = getChain(chain.chainId);
      
      return {
        title: details.label,
        subTitle: details.label,
        icon: details.icon,
        chainId: chain.chainId,
      };
    }
  );

  const filteredItems = supportedChainDetails.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  const _selectedChain = selectedChain ? getChain(selectedChain) : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#030A13] h-[48px] hover:bg-[#030A13]/10 border  active:border-[#2F87A5] active:shadow-[10px] active:shadow-[#2F87A5]/10 hover:text-white text-white rounded-[54.11px]">
          {_selectedChain ? 
          <>
          <div className="flex flex-row space-x-4 items-center -ml-4.5">
          <Image src={_selectedChain.icon} width={32} height={32} alt="greyCircle" className="rounded-[50%]"/>
          <h1>{_selectedChain.label}</h1>
          <ChevronDown size={24} color="#88FFF3"/>
          </div>
          </>: 
          (
          <div className="flex flex-row space-x-4 items-center">
            <Image src={greyCircle} width={32} height={32} alt="greyCircle"/>
           <h1>Select network</h1>
           <ChevronDown size={24} color="#8298AF"/>
          </div>
          )
        }
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-[#0B131E] border-none text-white">
        <h2 className="text-lg  mb-2 text-white font-[450] text-[20px] pt-2">Select [ {label} ] Network</h2>
        <Input
          placeholder="Search network"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-4 bg-[#030A13] rounded-[54.11px] hover:border-none  placeholder:text-[15px] placeholder:font-[450] placeholder-[#8298AF] border-none"
        />
        <div className="grid gap-2 ">
          {filteredItems.map(item => (
            <Button
              key={item.chainId}
              variant="ghost"
              className="justify-start hover:!bg-[#8298AF]"
              onClick={() => {
                onChange(item.chainId)
                setOpen(false)
              }}
            >
              <Image src={item.icon} width={32} height={32} alt="assetNetwork" className="rounded-[50%]"/>
              {item.title}
            </Button>
          ))}
          {filteredItems.length === 0 && (
            <p className="text-sm text-muted-foreground">No items found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}