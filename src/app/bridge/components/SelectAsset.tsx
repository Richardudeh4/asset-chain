import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,

  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import usdc from "../../../../public/assets/usdc.svg";
import tether from "../../../../public/assets/tether.svg";
import xend from "../../../../public/assets/xend.svg";
import { SelectItemIndicator } from "@radix-ui/react-select";

export function SelectAsset() {
  return (
    <Select>
      <SelectTrigger className="w-[142.82px] rounded-[36.14px] h-[48px] bg-[#132032]">
        <SelectValue className="text-[#8298AF] text-[15px] font-[450]" placeholder="Select Asset" />
      </SelectTrigger>
      <SelectContent className="bg-[#0B131E] border-none w-[172.82px] border py-2.5">
        <SelectGroup className="text-white">
          <SelectItem value="usdc" className="flex flex-row space-x-1 items-center  pl-0.5 !bg-[#0B131E] hover:!bg-[#8298AF]">
          <SelectItemIndicator className="hidden" />
                <Image src={usdc} alt="usdc" width={28} height={28}/>
                <div className="flex flex-col text-white">
                    <p>USDC</p>
    
                </div>
          </SelectItem>
          <SelectItem value="tether" className="flex flex-row space-x-1 items-center pl-0.5 !bg-[#0B131E] hover:!bg-[#8298AF]">
          <SelectItemIndicator className="hidden" />
                <Image src={tether} alt="tether" width={28} height={28} />
                <div className="flex flex-col text-white ">
                    <p>USDT</p>
                </div>
          </SelectItem>
          <SelectItem value="xend" className="flex flex-row space-x-1 items-center  pl-0.5 !bg-[#0B131E] hover:!bg-[#8298AF]">
          <SelectItemIndicator className="hidden" />
                <Image src={xend} alt="xend" width={28} height={28}/>
                <div className="flex flex-col  text-white ">
                    <p>XEND</p>
                </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
