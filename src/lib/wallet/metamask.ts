/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getChainDescription,
  getChainHex,
  getChainName,
  getChainScanner,
} from "../node";
import type { ChainId } from "../types";
import { WalletHandler, UpdateStoreStateFunction } from "./wallet-handler";

export class Metamask extends WalletHandler {
  constructor(
    public chainIds: readonly ChainId[],
    public defaultChainId: ChainId,
    public updateStoreState: UpdateStoreStateFunction,
  ) {
    super(chainIds, defaultChainId, updateStoreState, 'metamask');
    
    this.initializeProvider();
    this.setupEventListeners();
  }

  private initializeProvider() {
    if (!window.ethereum) {
      throw new Error("MetaMask not installed");
    }

    // Handle multiple providers case (like Coinbase + MetaMask)
    if (window.ethereum.providers?.length) {
      this.nativeProvider = window.ethereum.providers.find(
        (provider) => (provider as any).isMetaMask
      );
    } else {
      this.nativeProvider = window.ethereum;
    }

    if (!this.nativeProvider || !(this.nativeProvider as any).isMetaMask) {
      throw new Error("MetaMask provider not found");
    }
  }

  private setupEventListeners() {
    if (!this.nativeProvider) return;

    this.nativeProvider.on("accountsChanged", this.changeWalletHandler);
    this.nativeProvider.on("chainChanged", this.changeChainHandler);
  }

  private removeEventListeners() {
    if (!this.nativeProvider) return;

    this.nativeProvider.removeListener("accountsChanged", this.changeWalletHandler);
    this.nativeProvider.removeListener("chainChanged", this.changeChainHandler);
  }

  async connect(): Promise<boolean> {
    try {
      if (!this.nativeProvider) {
        throw new Error("MetaMask provider not available");
      }

      const accounts = await this.nativeProvider.request({ 
        method: "eth_requestAccounts" 
      }) as string[];

      if (!accounts?.length) {
        throw new Error("No accounts returned");
      }

      this.address = accounts[0];
      await this.updateProviderState();

      if (!this.chainId) {
        return false;
      }

      if (!this.chainIds.includes(this.chainId)) {
        return await this.switchChain(this.defaultChainId);
      }

      return true;
    } catch (error) {
      console.error("MetaMask connection error:", error);
      
      if ((error as any).code === 4001) {
        // User rejected the request
        this.clear();
      }
      
      return false;
    }
  }

  async switchChain(chainId: ChainId): Promise<boolean> {
    try {
      if (!this.nativeProvider) {
        throw new Error("Provider not available");
      }

      await this.nativeProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: getChainHex(chainId) }],
      });

      await this.updateProviderState();
      return true;
    } catch (error) {
      console.error("Chain switch error:", error);
      
      if ((error as any).code === 4902) {
        // Chain not added to wallet
        return this.addChain(chainId);
      }
      
      return false;
    }
  }

  async addChain(chainId: ChainId): Promise<boolean> {
    try {
      if (!this.nativeProvider) {
        throw new Error("Provider not available");
      }

      const chainDescription = getChainDescription(chainId);
      const scanner = getChainScanner(chainId);

      const params = {
        chainId: getChainHex(chainId),
        chainName: getChainName(chainId),
        nativeCurrency: {
          name: chainDescription.symbol,
          symbol: chainDescription.symbol,
          decimals: 18,
        },
        rpcUrls: [chainDescription.rpc],
        blockExplorerUrls: scanner ? [scanner] : undefined,
      };

      await this.nativeProvider.request({
        method: "wallet_addEthereumChain",
        params: [params],
      });

      return true;
    } catch (error) {
      console.error("Add chain error:", error);
      return false;
    }
  }

  async disconnect(): Promise<boolean> {
    this.removeEventListeners();
    this.clear();
    return true;
  }
}