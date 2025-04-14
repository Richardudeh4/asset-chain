/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcSigner, BrowserProvider } from "ethers";
import type { ChainId } from "../types";
import { WalletType } from ".";

declare global {
  interface Window {
    ethereum?: any
  }
}

export type UpdateStoreStateFunction = (
  signer: JsonRpcSigner | null,
  wallet: string | null,
  chainId: string | null,
  walletType: WalletType,
  login?: boolean,
) => void;

export abstract class WalletHandler {
  public provider: BrowserProvider | null = null;
  public signer: JsonRpcSigner | null = null;
  public address: string | null = null;
  public chainId: ChainId | null = null;
  public nativeProvider: any;
  public actual = true;

  constructor(
    public chainIds: readonly ChainId[],
    public defaultChainId: ChainId,
    public updateStoreState: UpdateStoreStateFunction,
    public walletType: WalletType
  ) {}

  abstract connect(): Promise<boolean>;
  abstract disconnect(): Promise<boolean>;
  abstract switchChain(chainId: ChainId): Promise<boolean>;
  abstract addChain(chainId: ChainId): Promise<boolean>;

  async updateProviderState() {
    try {
      if (!this.nativeProvider) {
        throw new Error("No provider available");
      }

      this.provider = new BrowserProvider(this.nativeProvider);
      this.signer = await this.getSigner();
      this.address = await this.getAddress();
      const chainId = await this.getChainId();
      
      this.chainId = chainId ? chainId.toString() as ChainId : null;
      
      this.updateStoreState(
        this.signer,
        this.address,
        this.chainId,
        this.walletType,
        !!this.address
      );
    } catch (error) {
      console.error("Error updating provider state:", error);
      this.clear();
      throw error;
    }
  }

  changeChainHandler = async (chainId: string | number) => {
    if (!this.actual) return;
    
    try {
      const numericChainId = typeof chainId === 'string' 
        ? parseInt(chainId, 16) 
        : chainId;

      if (this.chainId && parseInt(this.chainId.toString()) === numericChainId) {
        return;
      }

      if (!this.chainIds.includes(numericChainId.toString() as ChainId)) {
        await this.switchChain(this.defaultChainId);
        return;
      }

      await this.updateProviderState();
    } catch (error) {
      console.error("Error handling chain change:", error);
    }
  };

  changeWalletHandler = async (accounts: string[]) => {
    if (!this.actual || !accounts.length) {
      this.clear();
      return;
    }

    try {
      if (accounts[0] === this.address) return;
      await this.updateProviderState();
    } catch (error) {
      console.error("Error handling wallet change:", error);
    }
  };

  clear() {
    this.actual = false;
    this.provider = null;
    this.signer = null;
    this.address = null;
    this.chainId = null;
    this.updateStoreState(null, null, null, this.walletType, false);
  }

  async getSigner(): Promise<JsonRpcSigner | null> {
    if (!this.provider) return null;
    try {
      const signer = await this.provider.getSigner();
      // Verify the signer has an address
      await signer.getAddress();
      return signer;
    } catch (error) {
      console.error("Error getting signer:", error);
      return null;
    }
  }

  async getChainId(): Promise<bigint | null> {
    if (!this.provider) return null;
    try {
      const network = await this.provider.getNetwork();
      return network.chainId;
    } catch (error) {
      console.error("Error getting chain ID:", error);
      return null;
    }
  }

  async getAddress(): Promise<string | null> {
    try {
      const signer = await this.getSigner();
      return signer ? await signer.getAddress() : null;
    } catch (error) {
      console.error("Error getting address:", error);
      return null;
    }
  }
}