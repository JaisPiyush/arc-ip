import axiod from "https://deno.land/x/axiod/mod.ts";
import { logger } from "../logger.ts";
import {
  FilecoinNets,
  FilecoinSentinelData,
  FilFoxMinerBalance,
  FilFoxMinerPower,
  FilFoxOverviewData,
  FilFoxOverviewReturnData,
  FilScoutOverviewData,
} from "./types.ts";

export class FilecoinDataAggregator {
  private readonly mainnet = "https://filfox.info/api/v1";
  private readonly hyperspace = "https://hyperspace.filfox.info/api/v1";

  private getNetworkEndpoint(net: FilecoinNets): string {
    switch (net) {
      case FilecoinNets.Hyperspace:
        return this.hyperspace;
      default:
        return this.mainnet;
    }
  }

  public async getOverview(
    net = FilecoinNets.Mainnet
  ): Promise<FilFoxOverviewReturnData> {
    const { data } = await axiod.get<FilFoxOverviewReturnData>(
      this.getNetworkEndpoint(net) + "/overview"
    );
    return data;
  }

  private async getMinerBalanceStats(
    miner: string,
    duration = "24h",
    net = FilecoinNets.Mainnet
  ): Promise<FilFoxMinerBalance[]> {
    const { data } = await axiod.get<FilFoxMinerBalance[]>(
      this.getNetworkEndpoint(net) +
        `/address/${miner}/balance-stats?duration=${duration}`
    );
    return data;
  }

  private async getMinerPowerStats(
    miner: string,
    duration = "24h",
    net = FilecoinNets.Mainnet
  ): Promise<FilFoxMinerPower[]> {
    const { data } = await axiod.get<FilFoxMinerPower[]>(
      this.getNetworkEndpoint(net) +
        `/address/${miner}/power-stats?duration=${duration}`
    );
    return data;
  }

  public async getLatestMinerBalanceStats(
    miner: string,
    net = FilecoinNets.Mainnet
  ): Promise<FilFoxMinerBalance> {
    const stats = await this.getMinerBalanceStats(miner, "24h", net);
    if (stats.length == 0) {
      return {
        height: 0,
        timestamp: 0,
        balance: "0",
        availableBalance: "0",
        sectorPledgeBalance: "0",
        vestingFunds: "0",
      };
    }
    return stats[stats.length - 1];
  }

  public async getLatestMinerPowerStats(
    miner: string,
    net = FilecoinNets.Mainnet
  ): Promise<FilFoxMinerPower> {
    const stats = await this.getMinerPowerStats(miner, "24h", net);
    if (stats.length == 0) {
      return {
        height: 0,
        timestamp: 0,
        rawBytePower: "0",
        qualityAdjPower: "0",
        rawBytePowerDelta: "0",
        qualityAdjPowerDelta: "0",
      };
    }
    return stats[stats.length - 1];
  }

  public async getInitialPledgeCollateralRateFor32GiB(
    net = FilecoinNets.Mainnet
  ): Promise<bigint> {
    //TODO: FilFox based initial pledge collateral rate calculation required to be added
    if (net === FilecoinNets.Mainnet) {
      return await this._getInitialPledgeCollateralRateFor32GiBFromFilScout();
    }
    return BigInt(10 ** 18);
  }

  private async getOverviewDataFromFilScout(): Promise<FilFoxOverviewData> {
    const { data } = await axiod.get<{
      data: Record<string, unknown> & FilScoutOverviewData;
    }>("https://api2.filscout.com/api/v2/network/overview");

    return {
      estimatedInitialPledgeCollateral: data.data.currentPledgeCollateral,
      averageTipsetInterval: data.data.avgBlockTime,
    };
  }

  private async _getInitialPledgeCollateralRateFor32GiBFromFilScout(): Promise<bigint> {
    const data = await this.getOverviewDataFromFilScout();
    return BigInt(data.estimatedInitialPledgeCollateral * 10 ** 18);
  }

  /**
   *
   * @param height
   * @param {string[]} miners All the miners address must be in f0 format
   * @param net
   * @returns
   */
  public async getSentinelData(
    height: number,
    miners: string[],
    net = FilecoinNets.Mainnet
  ): Promise<FilecoinSentinelData> {
    const sentinelData: FilecoinSentinelData = {
      height,
      initialPledgeRateFor32GiB:
        await this.getInitialPledgeCollateralRateFor32GiB(net),
      rawBytePowerOfProtocol: BigInt("0"),
      availableBalanceOfProtocol: BigInt("0"),
      pledgeCollateralOfProtocol: BigInt("0"),
    };

    for (const miner of miners) {
      const latestBalance = await this.getLatestMinerBalanceStats(miner, net);
      const latestPower = await this.getLatestMinerPowerStats(miner, net);
      sentinelData.rawBytePowerOfProtocol += BigInt(latestPower.rawBytePower);
      sentinelData.availableBalanceOfProtocol += BigInt(
        latestBalance.availableBalance
      );
      sentinelData.pledgeCollateralOfProtocol += BigInt(
        latestBalance.sectorPledgeBalance
      );
    }

    return sentinelData;
  }
}
