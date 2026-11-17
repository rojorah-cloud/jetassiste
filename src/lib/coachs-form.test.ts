import { test } from "node:test";
import assert from "node:assert/strict";
import { CONTACT_EMAIL, WHATSAPP_GREETING, WHATSAPP_NUMBER, isCoachsIdentityValid } from "./coachs-form";

test("le prénom est obligatoire pour réserver l’appel", () => {
  assert.equal(isCoachsIdentityValid(" ", "coach@example.com"), false);
  assert.equal(isCoachsIdentityValid("Camille", "coach@example.com"), true);
});

test("l’e-mail est obligatoire et doit être valide", () => {
  assert.equal(isCoachsIdentityValid("Camille", ""), false);
  assert.equal(isCoachsIdentityValid("Camille", "adresse-invalide"), false);
  assert.equal(isCoachsIdentityValid("Camille", "coach@example.com"), true);
});

test("le numéro WhatsApp est au format wa.me, sans + ni espaces", () => {
  assert.equal(WHATSAPP_NUMBER, "261349012159");
  assert.match(WHATSAPP_NUMBER, /^\d+$/);
});

test("le message pré-rempli salue Aina", () => {
  assert.equal(WHATSAPP_GREETING, "Bonjour Aina");
});

test("l'e-mail de contact affiché en pied de page", () => {
  assert.equal(CONTACT_EMAIL, "contact@jetassiste.com");
});