export interface Tipset {
  Cids: Array<{ "/": string }>;
  Height: number;
  Blocks: Record<string, unknown>[];
}

export interface SubscribeFunction {
  (height: number): void;
}

export interface FilecoinTipSetIndexer {
  readonly rpcEndpoint: string;

  makeRpcRequest<T>(method: string, ...params: unknown[]): Promise<T>;
  getLastPolledHeight(): number;
  getTipsSetByHeight(height: number): Promise<Tipset>;
  getChainHead(): Promise<Tipset>;
  subscribe(func: SubscribeFunction): number;
  flush(): void;
  listenTipSet(): void;
  stopListeningTipSet(): void;
}
