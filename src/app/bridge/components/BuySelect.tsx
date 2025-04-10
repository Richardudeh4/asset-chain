"use client";
import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import greyCircle from "../../../../public/assets/greyCircle.svg";
import polygon from "../../../../public/assets/polygon.svg";
import assetChain from "../../../../public/assets/assetChain.svg";
import Image from "next/image"
import { ChevronDown } from "lucide-react"

const assets = [
  { value: "Polygon", icon: polygon },
  { value: "Asset Chain",icon :assetChain},
]


export default function BuySelect() {
  const [selectedItem, setSelectedItem] = useState<typeof assets[0] | null>(null)
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  const filteredItems = assets.filter(item =>
    item.value.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#030A13] h-[48px] hover:bg-[#030A13]/10 border  active:border-[#2F87A5] active:shadow-[10px] active:shadow-[#2F87A5]/10 hover:text-white text-white rounded-[54.11px]">
          {selectedItem ? 
          <>
          <div className="flex flex-row space-x-4 items-center -ml-4.5">
          <Image src={selectedItem.icon} width={32} height={32} alt="greyCircle"/>
          <h1>{selectedItem.value}</h1>
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
        <h2 className="text-lg  mb-2 text-white font-[450] text-[20px] pt-2">Select [ To ] Network</h2>
        <Input
          placeholder="Search network"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-4 bg-[#030A13] rounded-[54.11px] hover:border-none  placeholder:text-[15px] placeholder:font-[450] placeholder-[#8298AF] border-none"
        />
        <div className="grid gap-2 ">
          {filteredItems.map(item => (
            <Button
              key={item.value}
              variant="ghost"
              className="justify-start hover:!bg-[#8298AF]"
              onClick={() => {
                setSelectedItem(item)
                setOpen(false)
              }}
            >
              <Image src={item.icon} width={32} height={32} alt="assetNetwork"/>
              {item.value}
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

// import * as React from "react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"
// import { Check, ChevronDown, Search } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Input } from "@/components/ui/input"
// import Image from "next/image"

// export type DropdownOption = {
//   value: string
//   label?: string // Optional custom label display
//   icon: any
//   disabled?: boolean
// }

// interface SearchableDropdownMenuProps {
//   options: DropdownOption[]
//   placeholder?: string
//   searchPlaceholder?: string
//   emptyMessage?: string
//   value?: string
//   onValueChange?: (value: string) => void
//   className?: string
//   disabled?: boolean
//   triggerClassName?: string
//   contentClassName?: string
//   itemClassName?: string
//   showIcons?: boolean
//   customTrigger?: React.ReactNode
// }

// export function BuySelect({
//   options,
//   placeholder = "Select a network",
//   searchPlaceholder = "Search options...",
//   emptyMessage = "No results found.",
//   value,
//   onValueChange,
//   className,
//   disabled = false,
//   triggerClassName,
//   contentClassName,
//   itemClassName,
//   showIcons = true,
//   customTrigger,
// }: SearchableDropdownMenuProps) {
//   const [open, setOpen] = React.useState(false)
//   const [searchQuery, setSearchQuery] = React.useState("")

//   const handleSearchClick = (e: React.MouseEvent) => {
//     e.stopPropagation()
//   }
//     const filteredOptions = React.useMemo(() => {
//     if (!searchQuery) return options

//     return options.filter((option) => option.value.toLowerCase().includes(searchQuery.toLowerCase()))
//   }, [options, searchQuery])

//   const selectedOption = React.useMemo(() => {
//     return options.find((opt) => opt.value === value)
//   }, [value, options])

//   const handleValueChange = (newValue: string) => {
//     onValueChange?.(newValue)
//     setOpen(false)
//     setSearchQuery("");
//   }

//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <DropdownMenuTrigger asChild disabled={disabled}>
//         {customTrigger ? (
//           customTrigger
//         ) : (
//           <Button
//             variant="outline"
//             className={cn(
//               "w-[236.40px] justify-between bg-[#030A13] rounded-[54.11px] hover:bg-[#030A13]",
//               className,
//               triggerClassName
//             )}
//           >
//             <div className="flex items-center">
//               {showIcons && selectedOption?.icon && (
//                 <Image 
//                   src={selectedOption.icon} 
//                   width={24} 
//                   height={24} 
//                   alt={`${selectedOption.value}-icon`}
//                   className="mr-2"
//                 />
//               )}
//               {selectedOption?.label || selectedOption?.value || placeholder}
//             </div>
//             <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         )}
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         className={cn(
//           "w-[236.40px] bg-[#0B131E] !border-none text-white p-1",
//           contentClassName
//         )}
//         align="start"
//       >
//         <div className="flex items-center border border-transparent bg-[#030A13] rounded-[54.11px] mt-2 px-3 py-2">
//           <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
//           <Input
//             placeholder={searchPlaceholder}
//             className="h-8 border-0 bg-transparent p-1 shadow-none focus-visible:ring-0"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onClick={handleSearchClick}
//           />
//         </div>
//         <div className="max-h-[300px] overflow-auto py-4">
//           {filteredOptions.length > 0 ? (
//             filteredOptions.map((option) => (
//               <DropdownMenuItem
//                 key={option.value}
//                 onSelect={() => handleValueChange(option.value)}
//                 className={cn(
//                   "flex items-center flex-row space-x-1.5 !bg-[#0B131E] rounded-[44.11px] hover:!bg-[#8298AF] px-3 py-2",
//                   itemClassName,
//                   option.disabled && "opacity-50 cursor-not-allowed"
//                 )}
//                 disabled={option.disabled}
//               >
//                 {showIcons && option.icon && (
//                   <Image src={option.icon} width={24} height={24} alt={`${option.value}-icon`} />
//                 )}
//                 <p>{option.label || option.value}</p>
//                 {value === option.value && <Check className="h-4 w-4 ml-auto" />}
//               </DropdownMenuItem>
//             ))
//           ) : (
//             <div className="px-3 py-2 text-sm text-muted-foreground">{emptyMessage}</div>
//           )}
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
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
// import assetChain from "../../../../public/assets/assetChain.svg";
// import polygon from "../../../../public/assets/polygon.svg";
// import Image from "next/image"
// import { SelectItemIndicator } from "@radix-ui/react-select";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Check, ChevronDown, Search } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Input } from "@/components/ui/input";

// export type DropdownOption = {
//   value: string;
//   icon: any;
// }

// interface SearchableDropdownMenuProps {
//   options: DropdownOption[]
//   placeholder?: string
//   searchPlaceholder?: string
//   emptyMessage?: string
//   value?: string
//   onValueChange?: (value: string) => void
//   className?: string
//   disabled?: boolean
// }

// export function BuySelect({
//   options,
//   placeholder = "Select a network",
//   searchPlaceholder = "Search options...",
//   emptyMessage = "No results found.",
//   value,
//   onValueChange,
//   className,
//   disabled = false,
// }: SearchableDropdownMenuProps) {
//   const [open, setOpen] = React.useState(false);
//   const [searchQuery, setSearchQuery] = React.useState("");

//   const handleSearchClick = (e: React.MouseEvent) => {
//     e.stopPropagation()
//   }

//   const filteredOptions = React.useMemo(() => {
//     if (!searchQuery) return options

//     return options.filter((option) => option.value.toLowerCase().includes(searchQuery.toLowerCase()))
//   }, [options, searchQuery])


//   const selectedLabel = React.useMemo(() => {
//     if (!value) return placeholder
//     const option = options.find((opt) => opt.value === value)
//     return option ? option.value : placeholder
//   }, [value, options, placeholder])

//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <DropdownMenuTrigger asChild disabled={disabled}>
//         <Button variant="outline" className={cn("w-full justify-between bg-[#030A13] rounded-[54.11px] hover:bg-[#030A13]", className)}>
//           {selectedLabel}
//           <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-[236.40px] bg-[#0B131E] !border-none text-white p-1" align="start">
//         <div className="flex items-center border border-transparent bg-[#030A13] rounded-[54.11px] mt-2 px-3 py-2">
//           <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
//           <Input
//             placeholder={searchPlaceholder}
//             className="h-8 border-0 bg-transparent p-1  shadow-none focus-visible:ring-0"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onClick={handleSearchClick}
//           />
//         </div>
//         <div className="max-h-[300px] overflow-auto py-4">
//           {filteredOptions.length > 0 ? (
//             filteredOptions.map((option) => (
//               <DropdownMenuItem
//                 key={option.value}
//                 onSelect={() => {
//                   onValueChange?.(option.value)
//                   setOpen(false)
//                   setSearchQuery("")
//                 }}
//                 className="flex items-center flex-row space-x-1.5 !bg-[#0B131E] rounded-[44.11px] hover:!bg-[#8298AF] px-3 py-2"
//               >
//               <Image src={option.icon} width={32} height={32} alt="imageIcon"/>
//                 <p>{option.value}</p>
//                 {value === option.value && <Check className="h-4 w-4"/>}
//               </DropdownMenuItem>
//             ))
//           ) : (
//             <div className="px-3 py-2 text-sm text-muted-foreground">{emptyMessage}</div>
//           )}
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
    // <Select>
    //   <SelectTrigger className="w-[236.40px] h-[48px] rounded-[54.11px] bg-[#030A13] active:border active:border-[#2F87A5]">
    //     <SelectValue className="text-[#8298AF] text-[15px] font-[450]" placeholder="Search Network" />
    //   </SelectTrigger>
    //   <SelectContent className="!bg-[#0B131E] border py-2.5 border-[#0B131E]">
    //     <SelectGroup className="text-white pt-3 !bg-[#0B131E]">
    //       <SelectItem value="assetChain" className="flex flex-row space-x-2.5  !bg-[#0B131E]  hover:!bg-[#8298AF]">
    //       <SelectItemIndicator className="!hidden" />
    //         <Image src={assetChain} width={32} height={32} alt="assetChain"/>
    //         <p className="text-white">AssetChain</p>
    //       </SelectItem>
    //       <SelectItem value="polygon" className="flex flex-row space-x-2.5 hover:!bg-[#8298AF]">
    //       <SelectItemIndicator className="hidden" />
    //         <Image src={polygon} width={32} height={32} alt="polygon"/>
    //         <p className="text-white">Polygon</p>
    //       </SelectItem>
    //     </SelectGroup>
    //   </SelectContent>
    // </Select>
 
// Example 1: Basic usage with different data
{/* <BuySelect
  options={[
    { value: "eth", label: "Ethereum", icon: ethIcon },
    { value: "polygon", label: "Polygon", icon: polygonIcon }
  ]}
  value={selectedNetwork}
  onValueChange={setSelectedNetwork}
/>

// Example 2: With custom styling and no icons
<BuySelect
  options={[
    { value: "usdc", label: "USD Coin" },
    { value: "usdt", label: "Tether" }
  ]}
  showIcons={false}
  triggerClassName="bg-blue-500 text-white"
  contentClassName="w-64"
/>

// Example 3: With custom trigger
<BuySelect
  options={networks}
  customTrigger={
    <div className="flex items-center gap-2 p-2 border rounded-lg">
      <span>Select Network</span>
      <ChevronDown className="w-4 h-4" />
    </div>
  }
/> */}