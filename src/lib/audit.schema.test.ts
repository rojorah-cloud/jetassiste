import { test } from "node:test";
import assert from "node:assert/strict";
import { auditSchema } from "./audit.schema";

const input = {
  fullName: "Test audit",
  email: "audit@example.com",
  company: "Test",
  profession: "Coach",
  clientsPerMonth: "10-30",
  timeConsumingTasks: ["Emails"],
  tools: ["Notion"],
  priority: "Gagner du temps",
  context: "Organisation du suivi client",
};

test("un audit complet est valide sans secteur", () => {
  assert.equal(auditSchema.safeParse(input).success, true);
  assert.equal("sector" in auditSchema.shape, false);
});

test("le métier reste obligatoire", () => {
  assert.equal(auditSchema.safeParse({ ...input, profession: " " }).success, false);
});

test("le nombre de clients reste obligatoire", () => {
  assert.equal(auditSchema.safeParse({ ...input, clientsPerMonth: "" }).success, false);
});