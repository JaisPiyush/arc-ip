import { ethers } from "ethers";
import { Oracle, Oracle__factory } from "../../abi/gen/index.ts";
import { FilecoinDataAggregator } from "../shared/filecoin_data_aggregator.ts";
import { FilecoinNets, FilecoinSentinelData } from "../shared/types.ts";

export class OracleExecutor {
  readonly oracleContract: Oracle;
  readonly filecoinDataAggregator: FilecoinDataAggregator;
  net: FilecoinNets = FilecoinNets.Hyperspace;

  private _nextSentinelDataFeedHeight = 0;
  public sentinelDataFeedHeightDelta = 10;

  constructor(
    address: string,
    signer: ethers.Signer,
    net = FilecoinNets.Hyperspace
  ) {
    this.oracleContract = Oracle__factory.connect(address, signer);
    this.filecoinDataAggregator = new FilecoinDataAggregator();
    this.net = net;
  }

  public get nextSentinelDataFeedHeight(): number {
    return this._nextSentinelDataFeedHeight;
  }

  public async sentinelData(): Promise<FilecoinSentinelData> {
    const data = await this.oracleContract.sentinelData();
    return {
      height: data.height.toNumber(),
      initialPledgeRateFor32GiB: data.initialPledgeRateFor32GiB.toBigInt(),
      rawBytePowerOfProtocol: data.rawBytesPowerOfProtocol.toBigInt(),
      pledgeCollateralOfProtocol: data.pledgedCollateralOfProtocol.toBigInt(),
      availableBalanceOfProtocol: data.availableBalanceOfProtocol.toBigInt(),
    };
  }

  protected async _submitSentinelDataFeed(
    height: number,
    miners: string[]
  ): Promise<void> {
    if (height < this.nextSentinelDataFeedHeight) {
      //TODO: Add meaningfull log
      return;
    }
    const sentinelData = await this.filecoinDataAggregator.getSentinelData(
      height,
      miners,
      this.net
    );
    const tx = await this.oracleContract.submit_SentinelData(
      sentinelData.height,
      sentinelData.initialPledgeRateFor32GiB,
      sentinelData.rawBytePowerOfProtocol,
      sentinelData.availableBalanceOfProtocol,
      sentinelData.pledgeCollateralOfProtocol
    );
    await tx.wait();
  }
}
