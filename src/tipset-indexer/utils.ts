/**
 * Using web3.js standards undefined height will be treated as 'latest'
 * To height is the destination height for tipset traversal. It's also the
 * top height of the chain if  "latest"
 *
 * @param {number | string | undefined} height
 * @returns {number | string} Formatted height.
 * @throws Error if provided height is neither string number, undefined or number
 */
export function formatToHeight(height?: string | number): string | number {
  if (!height) return "latest";
  if (typeof height === "string" && !isNaN(Number(height))) {
    return Number(height);
  }
  if (typeof height === "number") return height;
  throw new Error("unhandled formatToHeight case");
}

/**
 *
 * @param {number | string | undefined} height
 * @returns {number} Formatted from height.
 *  @throws Error if provided height is neither string number, undefined or number
 */
export function formatFromHeight(height?: string | number): number {
  if (!height) return 0;
  if (typeof height === "string" && !isNaN(Number(height))) {
    return Number(height);
  }
  if (typeof height === "number") return height;
  throw new Error("unhandled formatFromHeight case");
}
