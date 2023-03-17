/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common.ts";

export interface OracleInterface extends utils.Interface {
  functions: {
    "currentSentinelDataFeedBlock()": FunctionFragment;
    "sentinelData()": FunctionFragment;
    "submit_SentinelData(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "currentSentinelDataFeedBlock"
      | "sentinelData"
      | "submit_SentinelData"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "currentSentinelDataFeedBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sentinelData",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "submit_SentinelData",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "currentSentinelDataFeedBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sentinelData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submit_SentinelData",
    data: BytesLike
  ): Result;

  events: {
    "SentinelDataFeeded(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SentinelDataFeeded"): EventFragment;
}

export interface SentinelDataFeededEventObject {
  oracle: string;
  height: BigNumber;
  currentHeight: BigNumber;
}
export type SentinelDataFeededEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  SentinelDataFeededEventObject
>;

export type SentinelDataFeededEventFilter =
  TypedEventFilter<SentinelDataFeededEvent>;

export interface Oracle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: OracleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    currentSentinelDataFeedBlock(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    sentinelData(overrides?: CallOverrides): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        height: BigNumber;
        initialPledgeRateFor32GiB: BigNumber;
        rawBytesPowerOfProtocol: BigNumber;
        availableBalanceOfProtocol: BigNumber;
        pledgedCollateralOfProtocol: BigNumber;
      }
    >;

    submit_SentinelData(
      height: PromiseOrValue<BigNumberish>,
      initialPledgeRateFor32GiB: PromiseOrValue<BigNumberish>,
      rawBytesPowerOfProtocol: PromiseOrValue<BigNumberish>,
      availableBalanceOfProtocol: PromiseOrValue<BigNumberish>,
      pledgedCollateralOfProtocol: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  currentSentinelDataFeedBlock(overrides?: CallOverrides): Promise<BigNumber>;

  sentinelData(overrides?: CallOverrides): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      height: BigNumber;
      initialPledgeRateFor32GiB: BigNumber;
      rawBytesPowerOfProtocol: BigNumber;
      availableBalanceOfProtocol: BigNumber;
      pledgedCollateralOfProtocol: BigNumber;
    }
  >;

  submit_SentinelData(
    height: PromiseOrValue<BigNumberish>,
    initialPledgeRateFor32GiB: PromiseOrValue<BigNumberish>,
    rawBytesPowerOfProtocol: PromiseOrValue<BigNumberish>,
    availableBalanceOfProtocol: PromiseOrValue<BigNumberish>,
    pledgedCollateralOfProtocol: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    currentSentinelDataFeedBlock(overrides?: CallOverrides): Promise<BigNumber>;

    sentinelData(overrides?: CallOverrides): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        height: BigNumber;
        initialPledgeRateFor32GiB: BigNumber;
        rawBytesPowerOfProtocol: BigNumber;
        availableBalanceOfProtocol: BigNumber;
        pledgedCollateralOfProtocol: BigNumber;
      }
    >;

    submit_SentinelData(
      height: PromiseOrValue<BigNumberish>,
      initialPledgeRateFor32GiB: PromiseOrValue<BigNumberish>,
      rawBytesPowerOfProtocol: PromiseOrValue<BigNumberish>,
      availableBalanceOfProtocol: PromiseOrValue<BigNumberish>,
      pledgedCollateralOfProtocol: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "SentinelDataFeeded(address,uint256,uint256)"(
      oracle?: PromiseOrValue<string> | null,
      height?: PromiseOrValue<BigNumberish> | null,
      currentHeight?: PromiseOrValue<BigNumberish> | null
    ): SentinelDataFeededEventFilter;
    SentinelDataFeeded(
      oracle?: PromiseOrValue<string> | null,
      height?: PromiseOrValue<BigNumberish> | null,
      currentHeight?: PromiseOrValue<BigNumberish> | null
    ): SentinelDataFeededEventFilter;
  };

  estimateGas: {
    currentSentinelDataFeedBlock(overrides?: CallOverrides): Promise<BigNumber>;

    sentinelData(overrides?: CallOverrides): Promise<BigNumber>;

    submit_SentinelData(
      height: PromiseOrValue<BigNumberish>,
      initialPledgeRateFor32GiB: PromiseOrValue<BigNumberish>,
      rawBytesPowerOfProtocol: PromiseOrValue<BigNumberish>,
      availableBalanceOfProtocol: PromiseOrValue<BigNumberish>,
      pledgedCollateralOfProtocol: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    currentSentinelDataFeedBlock(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sentinelData(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    submit_SentinelData(
      height: PromiseOrValue<BigNumberish>,
      initialPledgeRateFor32GiB: PromiseOrValue<BigNumberish>,
      rawBytesPowerOfProtocol: PromiseOrValue<BigNumberish>,
      availableBalanceOfProtocol: PromiseOrValue<BigNumberish>,
      pledgedCollateralOfProtocol: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
