import axios from "axios";
import "./types.ts";
import { FilScoutOverviewReturnData } from "./types.ts";
import { logger } from "../logger.ts";

export class FilScoutAPIExecutor {
  private readonly endpoint = "https://api2.filscout.com/api/v2";

  public async getInfo(): Promise<FilScoutOverviewReturnData | undefined> {
    try {
      const { data } = await axios.get<{ data: FilScoutOverviewReturnData }>(
        this.endpoint + "/network/overview"
      );
      logger.info(
        "FilScoutAPIExecutor:getInfo",
        "fetched overview data Height:"
      );
      return data.data;
    } catch (e) {
      logger.error("FilScoutAPIExecutor:getInfo", e);
    }
  }
}
