
"use client"

import  { Input} from "@/components/ui/input";
import { InputHTMLAttributes } from "react"

interface DecimalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  readOnly?: boolean
  maxDecimals?: number
}

export function InputAmount({
  readOnly = false,
  maxDecimals = 10,
  value,
  onChange,
  ...props
}: DecimalInputProps) {
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return

    const newValue = e.target.value
    if (newValue === "") {
        onChange?.(e)
        return
      }
  
    const decimalRegex = maxDecimals
      ? new RegExp(`^\\d*\\.?\\d{0,${maxDecimals}}$`)
      : /^\d*\.?\d*$/


      if (
        /^\d+$/.test(newValue) || // Whole numbers
        (newValue.includes('.') && decimalRegex.test(newValue)) // Decimal numbers
      ) {
        onChange?.(e)
      }
  }

  return (
    <Input
    type="text"
      placeholder="Enter amount"
      inputMode="decimal"
      value={value}
      onChange={handleChange}
      readOnly={readOnly}
    className={`
      w-[142.82px] rounded-[54.11px] 
      border-0 !border-none !outline-none 
      focus:border-0 focus:!border-none focus:!outline-none focus:!ring-0 
      active:border-0 active:!border-none active:!outline-none
      !placeholder-[#67829e] !text-[16px] !font-[450] 
      ${readOnly ? "cursor-default opacity-80" : ""}
      [&:focus]:border-none [&:focus]:outline-none
    `}
  />
  )
}