export interface FilScoutOverviewData {
  totalPower: number;
  avgBlockReword: number;
  avgBlockTime: number;
  currentPledgeCollateralTB: number;
  currentPledgeCollateral: number;
  currentBaseFee: number;
}

export type FilScoutOverviewReturnData = Record<string, unknown> &
  FilScoutOverviewData;
