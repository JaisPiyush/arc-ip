import * as tester from "https://deno.land/std@0.179.0/testing/asserts.ts";
import { FilecoinTipSetIndexer } from "./main.ts";

const RPC_ENDPOINT = "https://api.hyperspace.node.glif.io/rpc/v0";
const PAST_HEIGHT = 165283;

Deno.test("Test FilecoinTipsetIndexer getChainHead", async () => {
  const indexer = new FilecoinTipSetIndexer({
    rpcEndpoint: RPC_ENDPOINT,
  });

  const { Height } = await indexer.getChainHead();
  // This height has passed before writing this test (on Hyperspace)
  const pastHeight = PAST_HEIGHT;
  tester.assert(Height > pastHeight);
});
