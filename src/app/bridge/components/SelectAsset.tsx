
"use client";

import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import greyCircle from "../../../../public/assets/greyCircle.svg"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Token } from "@/lib/types";
import { assets } from "@/lib/constants";
import { useToken } from "@/context/token";


export default function SelectAsset({ isMain, tokens }: { isMain?: boolean, tokens: Token[] }) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

   const {selectedToken, setSelectedToken} = useToken()

  const supportedTokensWithAssets = tokens.map(token => {
    const asset = assets.find(a => a.title === token.value);
    
    return {
      title: token.value,
      subTitle: asset ? asset.subTitle : token.label,
      icon: asset ? asset.icon : require("../../../../public/assets/USDT.png")
    };
  });

  function _setToken(value: string) {
    const token = tokens.find((t) => t.value === value);
    setSelectedToken(token ? token : null);
    setOpen(false)
  }

  const filteredItems =  supportedTokensWithAssets.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  const selectedAsset = selectedToken ? assets.find(asset => asset.title === selectedToken.value) : undefined;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#132032] px-1 w-[142.82px] h-[48px] hover:bg-[#030A13]/10 hover:text-white text-white rounded-[54.11px]"
        >
          {selectedAsset ? (
            <div className="flex justify-between items-center w-full px-4 flex-row">
              <Image src={selectedAsset.icon} width={28} height={28} alt="assetIcon" className="rounded-[50%]" />
              <h1>{selectedAsset.title}</h1>
              {!isMain && <ChevronDown size={24} color="#88FFF3" />}
            </div>
          ) : (
            <div className="flex justify-between items-center w-full px-4 flex-row">
              <Image src={greyCircle} width={28} height={28} alt="greyCircle" />
              <ChevronDown size={24} color="#8298AF" />
            </div>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-[#0B131E] border-none text-white">
        <h2 className="text-lg mb-2 text-white font-[450] text-[20px] pt-2">Select asset</h2>
        <Input
          placeholder="Search asset"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-4 bg-[#030A13] rounded-[54.11px] placeholder:text-[15px] placeholder:font-[450] placeholder-[#8298AF] border-none"
        />
        <div className="grid gap-2 ">
          {filteredItems.map(item => (
            <Button
              key={item.title}
              variant="ghost"
              className="justify-start hover:!bg-[#142438] !text-white py-3"
              onClick={() => _setToken(item.title)}
            >
              <div className="flex flex-row space-x-3.5 items-center">
                <Image src={item.icon} width={32} height={32} alt="assetNetwork" className="rounded-[50%]"/>
                <div className="flex flex-col gap-0">
                  <p className="text-left text-[14px] font-[450] text-white">{item.title}</p>
                  <p className="text-[11px] font-[450] text-[#8298AF]">{item.subTitle}</p>
                </div>
              </div>
            </Button>
          ))}
          {filteredItems.length === 0 && (
            <p className="text-sm text-muted-foreground">No Asset found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}


// "use client"

// import { useState } from "react"
// import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import greyCircle from "../../../../public/assets/greyCircle.svg";
// import usdc from "../../../../public/assets/usdc.svg";
// import tether from "../../../../public/assets/tether.svg";
// import xend from "../../../../public/assets/xend.svg";
// import Image from "next/image"
// import { ChevronDown } from "lucide-react"

// const assets = [
//    { title: "USDC", 
//     subTitle: "USD Coin",
//     icon: usdc},
//     {
//       title: "USDT", 
//       subTitle: "Tether",
//       icon: tether
//     },
//   { title: "  XEND", 
//     subTitle: "Xend Finance",
//     icon: xend },
  
// ]


// export default function SelectAsset() {
//   const [selectedItem, setSelectedItem] = useState<typeof assets[0] | null>(null)
//   const [search, setSearch] = useState("")
//   const [open, setOpen] = useState(false)

//   const filteredItems = assets.filter(item =>
//     item.title.toLowerCase().includes(search.toLowerCase())
//   )

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline"  className="bg-[#132032] px-1 w-[142.82px] h-[48px] hover:bg-[#030A13]/10 hover:text-white text-white rounded-[54.11px]">
//           {selectedItem ? 
//           <>
//           <div className="flex flex-row justify-between space-x-5 items-center">
//           <Image src={selectedItem.icon} width={28} height={28} alt="greyCircle"/>
//           <h1>{selectedItem.title}</h1>
//           <ChevronDown size={24} color="#88FFF3"/>
//           </div>
//           </>: 
//           (
//           <div className="flex flex-row justify-between space-x-18 items-center">
//           <Image src={greyCircle} width={28} height={28} alt="greyCircle"/>
//            <ChevronDown size={24} color="#8298AF"/>
//           </div>
//           )
//         }
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-md bg-[#0B131E] border-none text-white">
//         <h2 className="text-lg  mb-2 text-white font-[450] text-[20px] pt-2">Select [ To ] Network</h2>
//         <Input
//           placeholder="Search network"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="mb-4 bg-[#030A13] rounded-[54.11px] hover:border-none  placeholder:text-[15px] placeholder:font-[450] placeholder-[#8298AF] border-none"
//         />
//         <div className="grid gap-2 ">
//           {filteredItems.map(item => (
//             <Button
//               key={item.title}
//               variant="ghost"
//               className="justify-start hover:!bg-[#132032] py-2"
//               onClick={() => {
//                 setSelectedItem(item)
//                 setOpen(false)
//               }}
//             >
//               <div className="flex flex-row space-x-3.5 items-center">
//               <Image src={item.icon} width={32} height={32} alt="assetNetwork"/>
//               <div className="flex flex-col gap-0">
//               <p className="text-left text-[14px] font-[450] text-white">{item.title}</p>
//               <p className="text-[11px] font-[450] text-[#8298AF]">{item.subTitle}</p>
//               </div>
              
//               </div>
              
//             </Button>
//           ))}
//           {filteredItems.length === 0 && (
//             <p className="text-sm text-muted-foreground">No items found.</p>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }



// import * as React from "react"

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,

//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import Image from "next/image"
// import usdc from "../../../../public/assets/usdc.svg";
// import tether from "../../../../public/assets/tether.svg";
// import xend from "../../../../public/assets/xend.svg";
// import { SelectItemIndicator } from "@radix-ui/react-select";

// export function SelectAsset() {
//   return (
//     <Select>
//       <SelectTrigger className=" w-[172.82px] rounded-[36.14px] h-[48px] bg-[#132032]">
//         <SelectValue className="text-[#8298AF] text-[15px] font-[450]" placeholder="Select Asset" />
//       </SelectTrigger>
//       <SelectContent className="bg-[#0B131E] border-none w-[172.82px] border py-2.5">
//         <SelectGroup className="text-white">
//           <SelectItem value="usdc" className="flex flex-row space-x-1 items-center  pl-0.5 !bg-[#0B131E] hover:!bg-[#8298AF]">
//           <SelectItemIndicator className="hidden" />
//                 <Image src={usdc} alt="usdc" width={28} height={28}/>
//                 <div className="flex flex-col text-white">
//                     <p>USDC</p>
    
//                 </div>
//           </SelectItem>
//           <SelectItem value="tether" className="flex flex-row space-x-1 items-center pl-0.5 !bg-[#0B131E] hover:!bg-[#8298AF]">
//           <SelectItemIndicator className="hidden" />
//                 <Image src={tether} alt="tether" width={28} height={28} />
//                 <div className="flex flex-col text-white ">
//                     <p>USDT</p>
//                 </div>
//           </SelectItem>
//           <SelectItem value="xend" className="flex flex-row space-x-1 items-center  pl-0.5 !bg-[#0B131E] hover:!bg-[#8298AF]">
//           <SelectItemIndicator className="hidden" />
//                 <Image src={xend} alt="xend" width={28} height={28}/>
//                 <div className="flex flex-col  text-white ">
//                     <p>XEND</p>
//                 </div>
//           </SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   )
// }
