import * as f4 from "https://esm.sh/@glif/filecoin-address";

console.log(f4.newIDAddress("1245980", f4.CoinType.MAIN).toString());
console.log(f4.ethAddressFromID("f01245980"));
