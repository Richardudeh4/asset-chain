
"use client"

import { Input,InputProps} from "@/components/ui/input";
import { useState } from "react"

interface DecimalInputProps extends InputProps {
  readOnly?: boolean
  maxDecimals?: number
}

export function InputAmount({
  readOnly = false,
  maxDecimals = 2,
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
    // if (
    //   newValue === "" || 
    //   /^\d*$/.test(newValue) || // Whole numbers
    //   (newValue.includes('.') && decimalRegex.test(newValue)) // Decimal numbers
    // ) {
    //   setValue(newValue)
    // }
  }

  return (
    <Input
      type="text"
      placeholder="Enter amount"
      inputMode="decimal"
      value={value}
      onChange={handleChange}
      readOnly={readOnly}
      className={`w-[142.82px] rounded-[54.11px] placeholder-slate-300 ${readOnly ? "cursor-default opacity-80" : ""}`}
      {...props}
    />
  )
}