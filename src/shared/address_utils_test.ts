import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.179.0/testing/asserts.ts";

import {
  filecoinAddressToEthAddress,
  ethAddressToFilecoinAddress,
  CoinType,
} from "./address_utils.ts";

const delegateEthAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
const delegateAddress = "f410flm4nu2tqdrlikro47syd7s4hl5ll5xoezvndvkq";
const minerAddress = "f01245980";
const minerEthAddress = "0xff0000000000000000000000000000000013031c";
const coinType = CoinType.MAIN;

Deno.test("Testing f address to eth address", () => {
  assertEquals(
    filecoinAddressToEthAddress(delegateAddress),
    delegateEthAddress
  );
  assertEquals(filecoinAddressToEthAddress(minerAddress), minerEthAddress);
});

Deno.test("Testing eth address to f address", () => {
  assertEquals(
    ethAddressToFilecoinAddress(delegateEthAddress, coinType),
    delegateAddress
  );
  assertEquals(
    ethAddressToFilecoinAddress(minerEthAddress, coinType),
    minerAddress
  );
});
