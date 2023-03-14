import * as tester from "https://deno.land/std@0.179.0/testing/asserts.ts";
import { formatToHeight, formatFromHeight } from "./utils.ts";

Deno.test("Test formatToHeight", () => {
  tester.assertEquals(formatToHeight(), "latest");
  tester.assertEquals(formatToHeight("162358"), 162358);
  tester.assertEquals(formatToHeight(16258), 16258);
  tester.assertThrows(
    () => {
      formatToHeight("latest");
    },
    Error,
    "unhandled formatToHeight case"
  );
});

Deno.test("Test formatFromHeight", () => {
  tester.assertEquals(formatFromHeight(), 0);
  tester.assertEquals(formatFromHeight("162358"), 162358);
  tester.assertEquals(formatFromHeight(16258), 16258);
  tester.assertThrows(
    () => {
      formatFromHeight("latest");
    },
    Error,
    "unhandled formatFromHeight case"
  );
});
