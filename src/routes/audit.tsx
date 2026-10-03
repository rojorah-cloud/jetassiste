import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitAudit, type AuditInput } from "@/lib/audit.functions";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit gratuit — Jetassiste" },
      {
        name: "description",
        content:
          "Répondez à quelques questions et recevez une analyse personnalisée des tâches que vous pourriez simplifier ou automatiser dans votre activité.",
      },
      { property: "og:title", content: "Audit gratuit — Jetassiste" },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content: "Transformez votre activité en système. Audit personnalisé, sans engagement.",
      },
      { property: "og:url", content: "/audit" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Audit gratuit — Jetassiste" },
      {
        name: "twitter:description",
        content: "Transformez votre activité en système. Audit personnalisé, sans engagement.",
      },
    ],
    links: [{ rel: "canonical", href: "/audit" }],
  }),
  component: AuditPage,
});

// ⚠️ REMPLACER PAR VOTRE LIEN CALENDLY
const CALENDLY_URL = "https://calendly.com/jorah/audit-business";

const TASKS = [
  "Gestion administrative",
  "Suivi clients",
  "Relances de paiement",
  "Création de contenu",
  "Réseaux sociaux",
  "Emails",
  "Prospection",
  "Facturation",
  "Reporting",
  "Service client / SAV",
  "Suivi de dossiers et documents",
  "Autre",
];

const TOOLS = [
  "Google Sheets",
  "Notion",
  "ClickUp",
  "Stripe",
  "Calendly",
  "Go High Level",
  "Airtable",
  "Make",
  "Google Workspace",
  "Shopify",
  "Autre",
];

const SECTORS: { value: AuditInput["sector"]; label: string }[] = [
  { value: "coachs-consultants", label: "Coach ou consultant" },
  { value: "organismes-de-formation", label: "Organisme de formation" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "saas", label: "SaaS / logiciel" },
  { value: "conciergeries-immobilier", label: "Conciergerie ou immobilier" },
  { value: "cabinets-recrutement", label: "Cabinet de recrutement" },
  { value: "experts-comptables", label: "Cabinet d'expertise comptable" },
  { value: "autre", label: "Autre activité" },
];

const PRIORITIES: AuditInput["priority"][] = [
  "Gagner du temps",
  "Réduire les tâches répétitives",
  "Mieux suivre mes clients",
  "Produire plus de contenu",
  "Structurer mon activité",
  "Automatiser certains processus",
];

const CLIENTS: { value: AuditInput["clientsPerMonth"]; label: string }[] = [
  { value: "<10", label: "Moins de 10" },
  { value: "10-30", label: "Entre 10 et 30" },
  { value: "30-100", label: "Entre 30 et 100" },
  { value: ">100", label: "Plus de 100" },
];

type FormState = {
  fullName: string;
  email: string;
  company: string;
  website: string;
  sector: AuditInput["sector"] | "";
  profession: string;
  clientsPerMonth: AuditInput["clientsPerMonth"] | "";
  timeConsumingTasks: string[];
  tools: string[];
  priority: AuditInput["priority"] | "";
  context: string;
};

const initial: FormState = {
  fullName: "",
  email: "",
  company: "",
  website: "",
  sector: "",
  profession: "",
  clientsPerMonth: "",
  timeConsumingTasks: [],
  tools: [],
  priority: "",
  context: "",
};

const STEPS = 4;

function AuditPage() {
  const submit = useServerFn(submitAudit);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const requestedSector = new URLSearchParams(window.location.search).get("secteur");
    const matchedSector = SECTORS.find((sector) => sector.value === requestedSector);
    if (matchedSector) {
      setData((current) => ({ ...current, sector: matchedSector.value }));
    }
  }, []);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const toggle = (key: "timeConsumingTasks" | "tools", value: string) => {
    setData((d) => {
      const arr = d[key];
      return {
        ...d,
        [key]: arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value],
      };
    });
  };

  const canNext = (() => {
    if (step === 1)
      return (
        data.fullName.trim().length >= 2 &&
        /.+@.+\..+/.test(data.email) &&
        data.company.trim().length > 0
      );
    if (step === 2)
      return data.sector !== "" && data.profession.trim().length > 0 && data.clientsPerMonth !== "";
    if (step === 3) return data.timeConsumingTasks.length > 0;
    if (step === 4) return data.priority !== "" && data.context.trim().length > 0;
    return false;
  })();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canNext) return;
    setSubmitting(true);
    setError(null);
    try {
      await submit({
        data: {
          fullName: data.fullName.trim(),
          email: data.email.trim(),
          company: data.company.trim(),
          website: data.website.trim(),
          sector: data.sector as AuditInput["sector"],
          profession: data.profession.trim(),
          clientsPerMonth: data.clientsPerMonth as AuditInput["clientsPerMonth"],
          timeConsumingTasks: data.timeConsumingTasks,
          tools: data.tools,
          priority: data.priority as AuditInput["priority"],
          context: data.context.trim(),
        },
      });
      setDone(true);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de l'envoi. Merci de réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans px-6 py-20">
        <div className="max-w-xl mx-auto text-center animate-reveal">
          <span className="inline-block px-3 py-1 mb-8 rounded-full ring-1 ring-accent/20 bg-accent-soft/40 font-mono text-[10px] uppercase tracking-tight text-accent">
            Demande reçue
          </span>
          <h1 className="font-display text-4xl md:text-5xl leading-[1.1] mb-6 text-balance">
            Merci pour votre demande.
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-4">
            Votre activité semble présenter plusieurs opportunités d'optimisation et
            d'automatisation.
          </p>
          <p className="text-muted text-lg leading-relaxed mb-10">
            Afin que nous puissions échanger sur votre situation et identifier les actions
            prioritaires, je vous invite à réserver un rendez-vous.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-accent text-accent-foreground font-medium rounded-full shadow-xl shadow-accent/10 hover:opacity-95 transition-opacity"
          >
            Réserver mon rendez-vous
          </a>
          <div className="mt-12 text-xs text-muted">
            <Link to="/" className="underline underline-offset-4 hover:text-foreground">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="font-display italic text-xl font-semibold tracking-tight">
            Jetassiste.
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            Étape {step} / {STEPS}
          </span>
        </div>
        <div className="h-1 bg-border">
          <div
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${(step / STEPS) * 100}%` }}
          />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-24">
        <div className="mb-12 text-center">
          <h1 className="font-display text-3xl md:text-4xl leading-tight mb-4 text-balance">
            Découvrez ce que vous pourriez automatiser dans votre activité
          </h1>
          <p className="text-muted leading-relaxed text-pretty">
            Répondez à quelques questions rapides (3 minutes) et recevez une analyse
            personnalisée des tâches qui pourraient être simplifiées ou automatisées dans votre
            entreprise.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-8" noValidate>
          {step === 1 && (
            <section className="space-y-6 animate-reveal">
              <Field label="Nom complet" required>
                <input
                  type="text"
                  required
                  value={data.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  required
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Entreprise" required>
                <input
                  type="text"
                  required
                  value={data.company}
                  onChange={(e) => update("company", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Site internet (facultatif)">
                <input
                  type="url"
                  placeholder="https://"
                  value={data.website}
                  onChange={(e) => update("website", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-8 animate-reveal">
              <Field label="Votre secteur d'activité" required>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SECTORS.map((sector) => (
                    <RadioCard
                      key={sector.value}
                      name="sector"
                      value={sector.value}
                      label={sector.label}
                      checked={data.sector === sector.value}
                      onChange={() => update("sector", sector.value)}
                    />
                  ))}
                </div>
              </Field>
              <Field label="Précisez votre activité" required>
                <input
                  type="text"
                  required
                  placeholder="Ex. : coach business, boutique de cosmétiques, formation en management…"
                  value={data.profession}
                  onChange={(e) => update("profession", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Combien de clients (ou de commandes) gérez-vous chaque mois ?" required>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CLIENTS.map((c) => (
                    <RadioCard
                      key={c.value}
                      name="clients"
                      value={c.value}
                      label={c.label}
                      checked={data.clientsPerMonth === c.value}
                      onChange={() => update("clientsPerMonth", c.value)}
                    />
                  ))}
                </div>
              </Field>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-8 animate-reveal">
              <Field
                label="Quelles tâches vous prennent le plus de temps ?"
                hint="Plusieurs choix possibles"
                required
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TASKS.map((t) => (
                    <CheckboxCard
                      key={t}
                      label={t}
                      checked={data.timeConsumingTasks.includes(t)}
                      onChange={() => toggle("timeConsumingTasks", t)}
                    />
                  ))}
                </div>
              </Field>
              <Field
                label="Quels outils utilisez-vous actuellement ?"
                hint="Plusieurs choix possibles"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TOOLS.map((t) => (
                    <CheckboxCard
                      key={t}
                      label={t}
                      checked={data.tools.includes(t)}
                      onChange={() => toggle("tools", t)}
                    />
                  ))}
                </div>
              </Field>
            </section>
          )}

          {step === 4 && (
            <section className="space-y-8 animate-reveal">
              <Field label="Quelle est votre priorité aujourd'hui ?" required>
                <div className="grid grid-cols-1 gap-3">
                  {PRIORITIES.map((p) => (
                    <RadioCard
                      key={p}
                      name="priority"
                      value={p}
                      label={p}
                      checked={data.priority === p}
                      onChange={() => update("priority", p)}
                    />
                  ))}
                </div>
              </Field>
              <Field
                label="Décrivez brièvement votre fonctionnement actuel et les difficultés que vous rencontrez."
                required
              >
                <textarea
                  required
                  rows={6}
                  value={data.context}
                  onChange={(e) => update("context", e.target.value)}
                  className={`${inputCls} resize-y min-h-[140px]`}
                />
              </Field>
            </section>
          )}

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between pt-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="px-6 py-3 rounded-full ring-1 ring-foreground/15 text-sm font-medium hover:bg-foreground/5 transition-colors"
              >
                ← Précédent
              </button>
            ) : (
              <Link
                to="/"
                className="px-6 py-3 rounded-full ring-1 ring-foreground/15 text-sm font-medium hover:bg-foreground/5 transition-colors text-center"
              >
                ← Retour
              </Link>
            )}

            {step < STEPS ? (
              <button
                type="button"
                disabled={!canNext}
                onClick={() => setStep((s) => s + 1)}
                className="px-8 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 active:scale-[0.98] transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continuer →
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canNext || submitting}
                className="px-8 py-3 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:opacity-95 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/10"
              >
                {submitting ? "Envoi en cours…" : "Recevoir mon analyse personnalisée"}
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl bg-background ring-1 ring-border focus:ring-2 focus:ring-accent focus:outline-none text-sm transition-all";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      {hint && <span className="block text-xs text-muted mb-3">{hint}</span>}
      {children}
    </label>
  );
}

function RadioCard({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex items-center gap-3 px-4 py-3 rounded-xl ring-1 cursor-pointer transition-all ${
        checked
          ? "ring-accent bg-accent-soft/40"
          : "ring-border hover:ring-foreground/30 bg-background"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`size-4 rounded-full ring-1 grid place-items-center shrink-0 ${
          checked ? "ring-accent" : "ring-foreground/30"
        }`}
      >
        {checked && <span className="size-2 rounded-full bg-accent" />}
      </span>
      <span className="text-sm">{label}</span>
    </label>
  );
}

function CheckboxCard({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex items-center gap-3 px-4 py-3 rounded-xl ring-1 cursor-pointer transition-all ${
        checked
          ? "ring-accent bg-accent-soft/40"
          : "ring-border hover:ring-foreground/30 bg-background"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`size-4 rounded-md ring-1 grid place-items-center shrink-0 ${
          checked ? "ring-accent bg-accent text-accent-foreground" : "ring-foreground/30"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2.5 6.5L5 9l4.5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-sm">{label}</span>
    </label>
  );
}
