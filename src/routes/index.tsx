import { createFileRoute, Link } from "@tanstack/react-router";
import { LatestPosts } from "@/components/LatestPosts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coulisses 2 Ton Succès — Libérez des heures chaque semaine grâce à l'automatisation" },
      {
        name: "description",
        content:
          "Consultante en opérations IA et automatisation. Audit gratuit pour coachs, consultants, formateurs et entrepreneurs de services qui veulent simplifier leur gestion.",
      },
      { property: "og:title", content: "Coulisses 2 Ton Succès — Opérations & automatisation" },
      { property: "og:url", content: "/" },
      {
        property: "og:description",
        content:
          "Transformez votre activité en système. Audit personnalisé, sans engagement.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

const reassurances = [
  "Sans engagement",
  "Audit personnalisé",
  "Recommandations concrètes",
  "Adapté à votre activité",
];

const problems = [
  "Vous passez du temps sur des tâches administratives répétitives.",
  "Vous gérez manuellement les suivis clients.",
  "Votre contenu demande énormément de temps.",
  "Vos outils ne communiquent pas entre eux.",
  "Vous avez l'impression de courir après votre activité.",
];

const solutions = [
  "Suivi client automatisé",
  "Relances de paiement",
  "Facturation",
  "Onboarding client",
  "Création de contenu SEO",
  "Publications réseaux sociaux",
  "Gestion documentaire",
  "Rapports automatiques",
  "Notifications & alertes",
  "Synchronisation de vos outils",
];

const steps = [
  { title: "Audit de vos processus actuels", text: "Analyse en profondeur de votre flux de travail et de vos points de friction." },
  { title: "Identification des tâches automatisables", text: "Sélection des tâches à fort impact dont l'automatisation libérera le plus de temps." },
  { title: "Création & déploiement des systèmes", text: "Mise en place et intégration des automatisations à vos outils existants." },
  { title: "Suivi, optimisation & maintenance", text: "Ajustements continus pour garantir des résultats durables au fil de votre croissance." },
];

const useCases = [
  {
    tag: "Production",
    title: "Production de contenu",
    text: "Transformez une simple vidéo en articles de blog, publications réseaux sociaux, newsletter et contenus réutilisables.",
  },
  {
    tag: "Administration",
    title: "Gestion administrative",
    text: "Automatisez factures, paiements, relances et suivi client.",
  },
  {
    tag: "Relation client",
    title: "Expérience client",
    text: "Fluidifiez l'accueil, le suivi et la fidélisation de vos clients.",
  },
  {
    tag: "Pilotage",
    title: "Pilotage d'activité",
    text: "Recevez automatiquement les informations importantes au bon moment.",
  },
];

const faqs = [
  {
    q: "Quelles tâches peut-on automatiser ?",
    a: "Presque toutes les tâches répétitives : facturation, relances, onboarding client, publication de contenu, reporting, synchronisation d'outils, suivi des prospects… Nous identifions ensemble celles à plus fort impact pour votre activité.",
  },
  {
    q: "Faut-il déjà utiliser des outils spécifiques ?",
    a: "Non. Nous partons de votre environnement actuel. Si vous avez déjà des outils, je les exploite. Sinon, je vous recommande la combinaison la plus simple et adaptée à votre réalité.",
  },
  {
    q: "Combien de temps faut-il pour mettre en place une automatisation ?",
    a: "Cela dépend de l'ampleur. Une première automatisation peut être déployée en une à deux semaines. Un système complet se construit généralement sur quelques semaines, par étapes.",
  },
  {
    q: "Que se passe-t-il si mes besoins évoluent ?",
    a: "Les systèmes sont conçus pour évoluer avec vous. Nous pouvons ajuster, étendre ou simplifier à tout moment, sans tout reconstruire.",
  },
  {
    q: "Proposez-vous un accompagnement après la mise en place ?",
    a: "Oui. Je propose un suivi, de l'optimisation et de la maintenance pour garantir que vos automatisations restent fiables et continuent de vous faire gagner du temps.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-display italic text-xl font-semibold tracking-tight">
            Coulisses 2 Ton Succès.
          </span>
          <div className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-widest text-muted">
            <a href="#solution" className="hover:text-foreground transition-colors">Services</a>
            <a href="#process" className="hover:text-foreground transition-colors">Processus</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </div>
          <Link
            to="/audit"
            className="text-[11px] font-semibold uppercase tracking-widest px-4 py-2 ring-1 ring-foreground/10 rounded-full hover:bg-foreground hover:text-background transition-all"
          >
            Audit gratuit
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-16 pb-24 max-w-2xl mx-auto text-center">
        <div className="inline-block px-3 py-1 mb-8 rounded-full ring-1 ring-accent/20 bg-accent-soft/40 animate-reveal">
          <span className="text-[10px] font-mono uppercase tracking-tight text-accent">
            Opérations & Automatisation
          </span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl leading-[1.08] text-balance mb-6 animate-reveal">
          Libérez jusqu'à plusieurs heures par semaine en automatisant les tâches répétitives de votre activité.
        </h1>

        <p className="text-muted text-lg leading-relaxed mb-10 text-pretty animate-reveal [animation-delay:150ms]">
          J'aide les coachs, consultants et entrepreneurs à simplifier leur gestion, automatiser leurs processus et transformer leur contenu en véritables systèmes qui travaillent pour eux.
        </p>

        <div className="flex flex-col items-center gap-8 animate-reveal [animation-delay:300ms]">
          <Link
            to="/audit"
            className="w-full sm:w-auto px-8 py-4 bg-foreground text-background font-medium rounded-full hover:opacity-90 transition-opacity active:scale-[0.98] text-center"
          >
            Obtenir mon audit gratuit
          </Link>

          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-left">
            {reassurances.map((r) => (
              <li key={r} className="flex items-center gap-2 text-[11px] font-medium text-muted">
                <span className="text-accent">✓</span> {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-foreground text-background py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-12 text-balance italic leading-tight">
            Votre entreprise grandit, mais votre charge mentale aussi.
          </h2>

          <ul className="space-y-6">
            {problems.map((p, i) => (
              <li key={p} className="flex gap-4 items-start border-b border-background/10 pb-6">
                <span className="font-mono text-[10px] pt-1 opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-snug">{p}</p>
              </li>
            ))}
          </ul>

          <p className="mt-12 font-display text-xl opacity-80 italic leading-snug">
            Votre temps devrait être consacré à vos clients et à votre expertise, pas à des tâches qui peuvent être automatisées.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section id="solution" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-6 leading-tight">
            Transformez votre activité en système.
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-12 text-pretty">
            J'analyse votre fonctionnement actuel puis je mets en place des systèmes intelligents capables d'automatiser une grande partie des tâches répétitives de votre entreprise.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {solutions.map((s) => (
              <li
                key={s}
                className="flex items-center gap-3 py-4 border-b border-border text-sm"
              >
                <span className="size-1.5 rounded-full bg-accent shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-sand py-24 px-6 border-y border-border">
        <div className="max-w-2xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent mb-4 block">
            Comment ça fonctionne
          </span>
          <h2 className="font-display text-3xl md:text-4xl mb-16 leading-tight">
            Une méthode claire, en quatre étapes.
          </h2>
          <div className="space-y-10">
            {steps.map((s, i) => (
              <div key={s.title} className="flex gap-6 items-start">
                <span className="size-10 rounded-full ring-1 ring-foreground/20 bg-background grid place-items-center text-xs font-mono shrink-0">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="font-semibold mb-2 text-base">{s.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent mb-4 block">
            Cas d'usage
          </span>
          <h2 className="font-display text-3xl md:text-4xl mb-12 leading-tight">
            Ce que vos systèmes peuvent prendre en charge.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((c) => (
              <article
                key={c.title}
                className="p-8 ring-1 ring-border bg-card rounded-2xl hover:ring-accent/30 transition-all"
              >
                <span className="font-mono text-[10px] text-muted block mb-4 uppercase tracking-widest">
                  {c.tag}
                </span>
                <h3 className="font-display text-2xl mb-4">{c.title}</h3>
                <p className="text-muted leading-relaxed text-sm">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="bg-sand py-24 px-6 border-y border-border">
        <div className="max-w-2xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent mb-4 block">
            Pourquoi travailler avec moi
          </span>
          <h2 className="font-display text-3xl md:text-4xl mb-10 leading-tight text-balance">
            Une approche à la croisée de l'opérationnel et de l'automatisation.
          </h2>
          <div className="space-y-6 text-muted text-base leading-relaxed">
            <p>
              Contrairement à de nombreux spécialistes techniques, je connais le fonctionnement réel des entreprises de services.
            </p>
            <p>
              Mon expérience d'assistante virtuelle me permet de comprendre les processus internes, les points de friction et les besoins quotidiens des entrepreneurs.
            </p>
            <p className="font-display italic text-xl text-foreground">
              Je ne me contente pas de créer des automatisations. Je construis des systèmes utiles, adaptés à votre réalité et capables d'évoluer avec votre activité.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <LatestPosts />

      {/* Final CTA */}
      <section id="audit" className="py-28 px-6 text-center bg-background">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl mb-6 leading-[1.1] text-balance">
            Découvrez ce qui peut être automatisé dans votre activité.
          </h2>
          <p className="text-muted text-lg mb-10 text-pretty">
            Recevez une analyse personnalisée et identifiez les tâches qui vous font perdre du temps chaque semaine.
          </p>
          <Link
            to="/audit"
            className="inline-block px-8 py-4 bg-accent text-accent-foreground font-medium rounded-full shadow-xl shadow-accent/10 hover:opacity-95 transition-opacity"
          >
            Recevoir mon analyse personnalisée
          </Link>
          <p className="mt-6 text-xs text-muted">Réponse sous 48h ouvrées · 100% confidentiel</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="pb-24 px-6">
        <div className="max-w-2xl mx-auto border-t border-border pt-16">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent mb-4 block">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl mb-10 leading-tight">
            Questions fréquentes
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-border bg-card">
                <summary className="list-none flex justify-between items-center p-5 cursor-pointer gap-4">
                  <span className="text-sm font-medium">{f.q}</span>
                  <span className="text-xl text-muted group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 -mt-1 text-sm text-muted leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background/60 px-6 py-12 text-xs">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row justify-between gap-8 md:items-end">
          <div>
            <p className="text-background mb-3 font-display italic text-2xl tracking-normal">
              Coulisses 2 Ton Succès.
            </p>
            <p className="leading-relaxed max-w-sm">
              Consultante en opérations IA et automatisation pour entrepreneurs, coachs et consultants.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex gap-6 uppercase tracking-widest text-[10px]">
              <Link to="/audit" className="hover:text-background transition-colors">
                Audit
              </Link>
              <a
                href="mailto:contact@coulisses2tonsucces.com"
                className="hover:text-background transition-colors"
              >
                Contact
              </a>
            </div>
            <p className="text-[10px] uppercase tracking-widest">
              © {new Date().getFullYear()} Coulisses 2 Ton Succès
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
