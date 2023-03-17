import { assertEquals } from "https://deno.land/std@0.179.0/testing/asserts.ts";
import { ethers } from "ethers";
import { OracleExecutor } from "./main.ts";
import { FilecoinNets } from "../shared/types.ts";
import "https://deno.land/x/dotenv/load.ts";

const oracleContractAddr = "0x31F9410534edEae17b6A95384dC5a1851413237A";
const privateKey = Deno.env.get("PRIVATE_KEY");
console.log(privateKey);
const rpc = "https://api.hyperspace.node.glif.io/rpc/v0";
const provider = new ethers.providers.JsonRpcProvider(rpc);
const wallet = new ethers.Wallet(privateKey as string, provider);

class TestOracleExecutor extends OracleExecutor {
  public async submit_SentinelData(height: number, miners: string[]) {
    return await this._submitSentinelDataFeed(height, miners);
  }
}

const oracleExecutor = new TestOracleExecutor(
  oracleContractAddr,
  wallet,
  FilecoinNets.Hyperspace
);

const miners = ["t01130", "t01000", "t01001"];

Deno.test("Testing submit_SentinelData", async () => {
  const block = await provider.getBlockNumber();
  await oracleExecutor.submit_SentinelData(block, miners);
  const sentinelData = await oracleExecutor.sentinelData();
  assertEquals(sentinelData.height, block);
});
