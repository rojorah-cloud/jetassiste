import { test } from "node:test";
import assert from "node:assert/strict";
import { isCoachsIdentityValid } from "./coachs-form";

test("le prénom est obligatoire pour réserver l’appel", () => {
  assert.equal(isCoachsIdentityValid(" ", "coach@example.com"), false);
  assert.equal(isCoachsIdentityValid("Camille", "coach@example.com"), true);
});

test("l’e-mail est obligatoire et doit être valide", () => {
  assert.equal(isCoachsIdentityValid("Camille", ""), false);
  assert.equal(isCoachsIdentityValid("Camille", "adresse-invalide"), false);
  assert.equal(isCoachsIdentityValid("Camille", "coach@example.com"), true);
});