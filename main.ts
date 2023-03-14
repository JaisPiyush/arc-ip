import { StandardMerkleTree } from "https://esm.sh/@openzeppelin/merkle-tree";
import { ethers } from "https://esm.sh/obs-store";

// (1)
const values = [
  ["0x1111111111111111111111111111111111111111", "5000000000000000000"],
  ["0x2222222222222222222222222222222222222222", "2500000000000000000"],
];

// (2)
const tree = StandardMerkleTree.of(values, ["address", "uint256"]);

// (3)
console.log("Merkle Root:", tree.root);

for (const [i, v] of tree.entries()) {
  if (v[0] === "0x1111111111111111111111111111111111111111") {
    // (3)
    const proof = tree.getProof(i);
    console.log("Value:", v);
    console.log("Proof:", proof);
  }
}
