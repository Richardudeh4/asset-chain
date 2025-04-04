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

export function BuySelect() {
  return (
    <Select>
      <SelectTrigger className="w-[236.40px] rounded-[54.11px]">
        <SelectValue className="text-[#8298AF] text-[15px] font-[450]" placeholder="Search Network" />
      </SelectTrigger>
      <SelectContent className="bg-[#0B131E] border py-2.5 border-[#8298AF]">
        <SelectGroup className="text-white  pt-3">
          <SelectItem value="assetChain" className="flex flex-row space-x-2.5 hover:bg-red-400">
            <Image src={assetChain} width={32} height={32} alt="assetChain"/>
            <p className="text-gray-500">AssetChain</p>
          </SelectItem>
          <SelectItem value="polygon" className="flex flex-row space-x-2.5">
            <Image src={polygon} width={32} height={32} alt="polygon"/>
            <p className="text-gray-500">Polygon</p>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
