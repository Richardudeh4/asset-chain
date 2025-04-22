import { Metamask } from "./metamask";
import { TrustWallet } from "./trust-wallet";
import { Walletconnect } from "./wallet-connect";

export const registerWallets = {
  metamask: Metamask,
  walletconnect: Walletconnect,
  trustwallet: TrustWallet,
  // coinbase: CoinBase,
  // native: Native,
  // trustwallet: TrustWallet,
  // okxwallet: OKXWallet,
  // madwallet: MadWallet,
};
export type WalletType = keyof typeof registerWallets;