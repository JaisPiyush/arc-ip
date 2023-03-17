import * as glifAddress from "https://esm.sh/@glif/filecoin-address@2.0.43";

export const CoinType = glifAddress.CoinType;

export function filecoinAddressToEthAddress(fAddr: string): string {
  if (fAddr[1] === "0") {
    return glifAddress.ethAddressFromID(fAddr);
  }
  return glifAddress.ethAddressFromDelegated(fAddr);
}

export function ethAddressToFilecoinAddress(
  addr: string,
  coinType: glifAddress.CoinType
): string {
  if (addr.indexOf("0xff") === 0) {
    return idFromEthAddress(addr, coinType);
  }
  return glifAddress.delegatedFromEthAddress(addr, coinType);
}

export function idFromEthAddress(
  ethAddr: string,
  coin: glifAddress.CoinType
): string {
  const prefix = "0xff0000000000000000000000";
  const payload = ethAddr.slice(prefix.length);
  const protocolPrefix = coin === glifAddress.CoinType.MAIN ? "f0" : "t0";
  return `${protocolPrefix}${parseInt(payload, 16)}`;
}
