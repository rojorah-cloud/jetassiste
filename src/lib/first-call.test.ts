import { test } from "node:test";
import assert from "node:assert/strict";
import { FIRST_CALL_DURATION } from "./first-call";

test("le premier appel dure de 30 à 45 minutes", () => {
  assert.equal(FIRST_CALL_DURATION.min, 30);
  assert.equal(FIRST_CALL_DURATION.max, 45);
});