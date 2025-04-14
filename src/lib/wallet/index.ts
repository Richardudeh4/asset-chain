import { Metamask } from "./metamask";
import { Walletconnect } from "./wallet-connect";

export const registerWallets = {
  metamask: Metamask,
  walletconnect: Walletconnect,
  // coinbase: CoinBase,
  // native: Native,
  // trustwallet: TrustWallet,
  // okxwallet: OKXWallet,
  // madwallet: MadWallet,
};
export type WalletType = keyof typeof registerWallets;