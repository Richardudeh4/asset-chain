/* eslint-disable @typescript-eslint/no-explicit-any */
import { getChainDescription, getChainHex, getChainScanner } from "../node";
import type { ChainId } from "../types";
import { UpdateStoreStateFunction, WalletHandler } from "./wallet-handler";

export class TrustWallet extends WalletHandler {
  constructor(
    public chainIds: readonly ChainId[],
    public defaultChainId: ChainId,
    public updateStoreState: UpdateStoreStateFunction
  ) {
    super(chainIds, defaultChainId, updateStoreState, "trustwallet");
    const ehtProvider = (window as any).trustwallet;

    if (!ehtProvider) {
      const installPrompt = confirm(
        "Trust Wallet extension is not installed. Do you want to install it?"
      );

      if (installPrompt) {
        window.open("https://trustwallet.com/browser-extension/");
      }
    }

    if (ehtProvider.providers)
      this.nativeProvider = ehtProvider.providers.find(
        (provider: any) => provider.isTrustWallet
      );
    else this.nativeProvider = ehtProvider;

    if (!this.nativeProvider) {
      throw new Error("Please set up TrustWallet properly");
    }

    // this.nativeProvider.once('accountsChanged', this.changeWalletHanlder?.bind(this))
    // this.nativeProvider.once('chainChanged', this.changeChainHandler?.bind(this))
  }

  async connect(): Promise<boolean> {
    try {
      this.address = (
        await this.nativeProvider.request({ method: "eth_requestAccounts" })
      )[0] as string;
      await this.updateProviderState();

      if (!this.chainId) return false;

      if (!(this.chainIds as string[]).includes(this.chainId)) {
        await this.switchChain(this.defaultChainId);
      }

      return true;
    } catch (error) {
      if (+(error as any).code == 4001) {
        alert("Please connect to Trust wallet.");
      } else {
        console.error(error);
      }
      return false;
    }
  }

  async switchChain(chainId: ChainId): Promise<boolean> {
    try {
      await this.nativeProvider.request?.({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: getChainHex(chainId) }],
      });
      await this.updateProviderState();
      return true;
    } catch (error) {
      console.error(error);
      return await this.addChain(chainId);
    }
  }

  async addChain(chainId: ChainId): Promise<boolean> {
    try {
      const chainDescription = getChainDescription(chainId);
      const scanner = getChainScanner(chainId);
      const param = {
        chainId: getChainHex(chainId),
        chainName: chainDescription.name,
        nativeCurrency: {
          name: chainDescription.symbol,
          symbol: chainDescription.symbol,
          decimals: 18,
        },
        rpcUrls: [chainDescription.rpc],
        blockExplorerUrls: scanner ? [scanner] : undefined,
      };
      await this.nativeProvider.request?.({
        method: "wallet_addEthereumChain",
        params: [param],
      });
      return true;
    } catch (addError) {
      throw addError;
    }
  }

  async disconnect(): Promise<boolean> {
    this.clear();
    return true;
  }
}
