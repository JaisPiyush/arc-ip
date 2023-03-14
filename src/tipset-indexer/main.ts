import axios from "axios";
import { signal, effect, Signal } from "@preact/signals-core";

import {} from "./utils.ts";
import "./types.ts";
import { SubscribeFunction, Tipset } from "./types.ts";

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
    this.pollInterval = opts.pollInterval || 3000;
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
