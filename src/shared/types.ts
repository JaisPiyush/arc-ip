export interface FilFoxOverviewData {
  estimatedInitialPledgeCollateral: number;
  averageTipsetInterval: number;
}

export interface FilScoutOverviewData {
  currentPledgeCollateral: number;
  avgBlockTime: number;
}

export type FilFoxOverviewReturnData = Record<string, unknown> &
  FilFoxOverviewData;

export interface FilFoxMinerBalance {
  height: number;
  timestamp: number;
  balance: string;
  availableBalance: string;
  sectorPledgeBalance: string;
  vestingFunds: string;
}

export interface FilFoxMinerPower {
  height: number;
  timestamp: number;
  rawBytePower: string;
  qualityAdjPower: string;
  rawBytePowerDelta: string;
  qualityAdjPowerDelta: string;
}

export enum FilecoinNets {
  Mainnet = "mainnet",
  Hyperspace = "hyperspace",
}

export interface FilecoinSentinelData {
  height: number;
  initialPledgeRateFor32GiB: bigint;
  rawBytePowerOfProtocol: bigint;
  availableBalanceOfProtocol: bigint;
  pledgeCollateralOfProtocol: bigint;
}
