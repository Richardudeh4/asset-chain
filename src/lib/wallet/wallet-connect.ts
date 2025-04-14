/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChainId } from "../types";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import {
  UpdateStoreStateFunction,
  WalletHandler,
} from "./wallet-handler";
import { realChainIds } from "../node/misc";
import { getChainDescription, getChainHex, getChainName, getChainRpc, node } from "../node";

export class Walletconnect extends WalletHandler {
  public appName!: string;

  constructor(
    public chainIds: readonly ChainId[],
    public defaultChainId: ChainId,
    public updateStoreState: UpdateStoreStateFunction,
  ) {
    super(
      chainIds,
      defaultChainId,
      updateStoreState,
      'walletconnect'
    );
    this.initProvider();
  }

  async initProvider() {
    if (this.nativeProvider) return;

    const rpc = {} as { [key: number]: string };

    for (const chainTag of Object.keys(
      realChainIds
    ) as (keyof typeof realChainIds)[]) {
      const chainId =
        `${realChainIds[chainTag]}` as `${(typeof realChainIds)[typeof chainTag]}`;
      rpc[parseInt(chainId)] = node(chainTag).rpc;
    }

    this.nativeProvider = await EthereumProvider.init({
      projectId: "26e976b28693cb52ee780dd3f54307ac",
      showQrModal: true,
      rpcMap: rpc,
      chains: [parseInt(this.defaultChainId)],
    });
  }

  async connect(): Promise<boolean> {
    await this.initProvider();
    try {
      await this.nativeProvider.enable();
      console.log(this.nativeProvider);
      // this.appName = this.nativeProvider.wc._peerMeta.name
      await this.updateProviderState();

      if (!this.chainId) return false;

      if (
        !(this.chainIds as string[]).includes(this.chainId.toString())
      ) {
        await this.switchChain(this.defaultChainId);
      }

      this.nativeProvider.on(
        "accountsChanged",
        this.changeWalletHandler?.bind(this)
      );
      this.nativeProvider.on(
        "chainChanged",
        this.changeChainHandler?.bind(this)
      );

      const disconnectHandler = async () => {
        if (!this.actual) return;
        this.nativeProvider.on(
          "disconnect",
          async () => await disconnectHandler()
        );
      };

      this.nativeProvider.on(
        "disconnect",
        async () => await disconnectHandler()
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  clear() {
    super.clear();
    this.nativeProvider.removeListener("disconnect", async () => {
      this.updateProviderState()
    });
  }

  async switchChain(chainId: ChainId): Promise<boolean> {
    try {
      await this.initProvider();
      const _chainId = await this.getChainId();
      if (_chainId && _chainId.toString() === chainId) {
        return false;
      }

      await this.nativeProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: getChainHex(chainId) }],
      });
      await this.updateProviderState();
      return true;
    } catch (error: any) {
      if (parseInt((error).code) == 4902)
        return await this.addChain(chainId);
      return false
    }
    
  }
  async addChain(chainId: ChainId): Promise<boolean> {
    console.log("Add chain");
    await this.initProvider();
    const chainDescription = getChainDescription(chainId);
    try {
      const param = {
        chainId: getChainHex(chainId),
        chainName: getChainName(chainId),
        nativeCurrency: {
          name: chainDescription.name,
          symbol: chainDescription.symbol,
          decimals: 18,
        },
        rpcUrls: [getChainRpc(chainId)],
        blockExplorerUrls: [chainDescription.scanner]
      };
      await this.nativeProvider.request({
        method: "wallet_addEthereumChain",
        params: [param],
      });
      return true;
    } catch (addError) {
      console.log(addError);
      return false;
    }
  }

  async disconnect() {
    await this.initProvider();

    this.clear();
    await this.nativeProvider.disconnect();
    return true;
  }

  async getSigner() {
    await this.initProvider();

    return this.provider?.getSigner() ?? null;
  }

  async getAddress() {
    await this.initProvider();

    return (await this.getSigner())?.getAddress() ?? null;
  }
}
