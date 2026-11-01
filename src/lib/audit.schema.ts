import { z } from "zod";

export const auditSchema = z.object({
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

