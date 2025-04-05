import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import assetChain from "../../../../public/assets/assetChain.svg";
import polygon from "../../../../public/assets/polygon.svg";
import Image from "next/image"
import { SelectItemIndicator } from "@radix-ui/react-select";

export function BuySelect() {
  return (
    <Select >
      <SelectTrigger className="w-[236.40px] h-[48px] rounded-[54.11px] bg-[#030A13] active:border active:border-[#2F87A5]">
        <SelectValue className="text-[#8298AF] text-[15px] font-[450]" placeholder="Search Network" />
      </SelectTrigger>
      <SelectContent className="!bg-[#0B131E] border py-2.5 border-[#0B131E]">
        <SelectGroup className="text-white pt-3 !bg-[#0B131E]">
          <SelectItem value="assetChain" className="flex flex-row space-x-2.5  !bg-[#0B131E]  hover:!bg-[#8298AF]">
          <SelectItemIndicator className="!hidden" />
            <Image src={assetChain} width={32} height={32} alt="assetChain"/>
            <p className="text-white">AssetChain</p>
          </SelectItem>
          <SelectItem value="polygon" className="flex flex-row space-x-2.5 hover:!bg-[#8298AF]">
          <SelectItemIndicator className="hidden" />
            <Image src={polygon} width={32} height={32} alt="polygon"/>
            <p className="text-white">Polygon</p>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
