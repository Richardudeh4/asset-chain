
"use client";
import { createContext, useContext, useState, ReactNode } from "react"

const assets = [
  { title: "USDC", subTitle: "USD Coin", icon: "/assets/usdc.svg" },
  { title: "USDT", subTitle: "Tether", icon: "/assets/tether.svg" },
  { title: "XEND", subTitle: "Xend Finance", icon: "/assets/xend.svg" }
]

type Asset = typeof assets[0]

interface AssetContextType {
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset) => void;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined)

export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)

  return (
    <AssetContext.Provider value={{ selectedAsset, setSelectedAsset }}>
      {children}
    </AssetContext.Provider>
  )
}

export const useAsset = () => {
  const context = useContext(AssetContext)
  if (!context) throw new Error("useAsset must be used within AssetProvider")
  return context
}
