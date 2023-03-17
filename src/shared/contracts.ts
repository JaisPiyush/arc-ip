import { ethers } from "https://esm.sh/ethers@6.1.0";
import { FilecoinSentinelData } from "./types.ts";

export const oracleAbi = [
  // Fetching data
  "function currentSentinelDataFeedBlock() external returns(uint256)",
  // Submitting data
  "function submit_SentinelData(uint256,uint256,uint256,uint256,uint256)",
  "function submit_PledgingStatus(uint256,address,uint256)",
];

export class OracleSmartContract {
  readonly contract: ethers.Contract;

  constructor(address: string, provider: ethers.Provider) {
    this.contract = new ethers.Contract(address, oracleAbi, provider);
  }
}
