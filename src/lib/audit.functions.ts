import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const auditSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  company: z.string().trim().min(1).max(200),
  website: z.string().trim().max(255).optional().or(z.literal("")),
  profession: z.string().trim().min(1).max(300),
  clientsPerMonth: z.enum(["<10", "10-30", "30-100", ">100"]),
  timeConsumingTasks: z.array(z.string().max(80)).min(1).max(20),
  tools: z.array(z.string().max(80)).max(20),
  priority: z.enum([
    "Gagner du temps",
    "Réduire les tâches répétitives",
    "Mieux suivre mes clients",
    "Produire plus de contenu",
    "Structurer mon activité",
    "Automatiser certains processus",
  ]),
  context: z.string().trim().min(1).max(3000),
});

export type AuditInput = z.infer<typeof auditSchema>;

const RECIPIENT = "contact@coulisses2tonsucces.com";
const FROM = "Jetassiste <contact@coulisses2tonsucces.com>";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#444;vertical-align:top;width:200px">${esc(
    label,
  )}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;white-space:pre-wrap">${esc(
    value,
  )}</td></tr>`;
}

const clientsLabel: Record<AuditInput["clientsPerMonth"], string> = {
  "<10": "Moins de 10",
  "10-30": "Entre 10 et 30",
  "30-100": "Entre 30 et 100",
  ">100": "Plus de 100",
};

export const submitAudit = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => auditSchema.parse(data))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      throw new Error("Email service is not configured");
    }

    const html = `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;background:#f7f6f3;padding:24px;color:#111">
<div style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eee">
  <div style="padding:24px 28px;border-bottom:1px solid #eee">
    <h1 style="margin:0;font-size:20px">Nouvelle demande d'audit</h1>
    <p style="margin:6px 0 0;color:#666;font-size:13px">Jetassiste</p>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    ${row("Nom complet", data.fullName)}
    ${row("Email", data.email)}
    ${row("Entreprise", data.company)}
    ${row("Site internet", data.website || "—")}
    ${row("Métier", data.profession)}
    ${row("Clients / mois", clientsLabel[data.clientsPerMonth])}
    ${row("Tâches chronophages", data.timeConsumingTasks.join(", "))}
    ${row("Outils utilisés", data.tools.length ? data.tools.join(", ") : "—")}
    ${row("Priorité", data.priority)}
    ${row("Contexte & difficultés", data.context)}
  </table>
</div>
</body></html>`;

    const response = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: FROM,
        to: [RECIPIENT],
        reply_to: data.email,
        subject: `[Nouvelle demande d'audit] ${data.fullName}`,
        html,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Resend error", response.status, text);
      throw new Error("L'envoi de l'email a échoué");
    }

    return { ok: true as const };
  });
