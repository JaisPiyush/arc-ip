import axios from "https://esm.sh/axios@1.3.4";
import {
  signal,
  effect,
  Signal,
} from "https://esm.sh/@preact/signals-core@1.2.3";
import { SubscribeFunction, Tipset } from "./types.ts";
import { logger } from "../logger.ts";

export class FilecoinTipSetIndexer {
  readonly rpcEndpoint: string;
  pollInterval: number;
  private store: Signal<number>;
  private listeners: Array<SubscribeFunction> = [];
  private readonly revoker: () => void;
  private poller: number | null = null;

  constructor(opts: {
    rpcEndpoint: string;
    initHeight?: number;
    pollInterval?: number;
  }) {
    this.store = signal(opts.initHeight || 0);
    this.revoker = effect(() => {
      this.listeners.forEach((func) => {
        if (func !== undefined) {
          func(this.store.value);
        }
      });
    });
    this.rpcEndpoint = opts.rpcEndpoint;
    this.pollInterval = opts.pollInterval || 15000;
  }

  public async makeRpcRequest<T>(
    method: string,
    ...params: unknown[]
  ): Promise<T> {
    const { data } = await axios.post<{ result: T }>(
      this.rpcEndpoint,
      {
        jsonrpc: "2.0",
        method: `Filecoin.${method}`,
        params: [...params],
        id: 1,
      },
      {
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
          Accept: "*/*",
        },
      }
    );

    logger.info(
      "FilecoinTipSetIndexer:makeRpcRequest",
      "Method: ",
      `Filecoin.${method}`
    );

    return data.result;
  }

  public async getChainHead(): Promise<Tipset> {
    return await this.makeRpcRequest<Tipset>("ChainHead");
  }

  public getLastPolledHeight(): number {
    return this.store.value;
  }

  public subscribe(func: SubscribeFunction): number {
    return this.listeners.push(func);
  }

  public flush(): void {
    this.revoker();
  }

  private async poll(): Promise<void> {
    const { Height } = await this.getChainHead();
    this.store.value = Height;
    logger.info("FilecoinTipSetIndexer:poll", "Height:", Height);
    this.poller = setTimeout(async () => {
      await this.poll();
    }, this.pollInterval);
  }

  public listenTipSet(): void {
    this.poll();
  }

  public stopListeningTipSet(): void {
    clearTimeout(this.poller as number);
    this.poller = null;
  }
}
