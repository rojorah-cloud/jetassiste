import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Jetassiste" },
      {
        name: "description",
        content:
          "Contactez Jetassiste pour discuter de vos besoins en opérations, automatisation et IA. Réponse sous 48h ouvrées.",
      },
      { property: "og:title", content: "Contact — Jetassiste" },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content:
          "Une question, un projet ? Écrivez-moi et je vous réponds sous 48h ouvrées.",
      },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Contact — Jetassiste" },
      {
        name: "twitter:description",
        content: "Une question, un projet ? Écrivez-moi et je vous réponds sous 48h ouvrées.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const EMAIL = "contact@coulisses2tonsucces.com";

const infos = [
  {
    tag: "Email",
    title: "Écrivez-moi directement",
    text: EMAIL,
    href: `mailto:${EMAIL}`,
    action: "Envoyer un message",
  },
  {
    tag: "Audit",
    title: "Recevoir un audit personnalisé",
    text: "Répondez à quelques questions pour recevoir une analyse adaptée à votre activité.",
    href: "/audit",
    action: "Démarrer l'audit",
    internal: true,
  },
  {
    tag: "Blog",
    title: "Explorer les ressources",
    text: "Articles, méthodes et retours d'expérience sur l'automatisation des activités de services.",
    href: "https://blog.jetassiste.com",
    action: "Lire le blog",
    external: true,
  },
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="font-display italic text-xl font-semibold tracking-tight"
          >
            Jetassiste.
          </Link>
          <div className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-widest text-muted">
            <Link to="/" className="hover:text-foreground transition-colors">
              Accueil
            </Link>
            <a
              href="https://blog.jetassiste.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Blog
            </a>
            <Link to="/contact" className="text-foreground transition-colors">
              Contact
            </Link>
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
      <section className="px-6 pt-20 pb-16 max-w-2xl mx-auto text-center">
        <div className="inline-block px-3 py-1 mb-8 rounded-full ring-1 ring-accent/20 bg-accent-soft/40">
          <span className="text-[10px] font-mono uppercase tracking-tight text-accent">
            Contact
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl leading-[1.08] text-balance mb-6">
          Discutons de vos besoins.
        </h1>
        <p className="text-muted text-lg leading-relaxed text-pretty">
          Une question, un projet, une envie de simplifier votre quotidien ?
          Écrivez-moi directement et je vous réponds sous 48h ouvrées.
        </p>
      </section>

      {/* Cards */}
      <section className="px-6 pb-16 flex-1">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {infos.map((info) => (
            <article
              key={info.title}
              className="p-8 ring-1 ring-border bg-card rounded-2xl flex flex-col hover:ring-accent/30 transition-all"
            >
              <span className="font-mono text-[10px] text-muted block mb-4 uppercase tracking-widest">
                {info.tag}
              </span>
              <h2 className="font-display text-2xl mb-4 leading-snug">
                {info.title}
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-8 break-words">
                {info.text}
              </p>
              {info.internal ? (
                <Link
                  to={info.href}
                  className="mt-auto inline-block px-6 py-3 bg-foreground text-background text-xs font-semibold uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity text-center"
                >
                  {info.action}
                </Link>
              ) : (
                <a
                  href={info.href}
                  target={info.external ? "_blank" : undefined}
                  rel={info.external ? "noopener noreferrer" : undefined}
                  className="mt-auto inline-block px-6 py-3 bg-foreground text-background text-xs font-semibold uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity text-center"
                >
                  {info.action}
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Bottom reassurance */}
      <section className="bg-sand border-y border-border py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display italic text-xl md:text-2xl leading-snug text-foreground">
            « Chaque conversation commence par une écoute. Décrivez-moi votre
            fonctionnement actuel, je vous réponds avec des pistes concrètes. »
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted">
            Réponse sous 48h ouvrées · 100% confidentiel
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background/60 px-6 py-16 text-xs">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-background/10">
            <div className="md:col-span-2">
              <p className="text-background mb-3 font-display italic text-2xl tracking-normal">
                Jetassiste.
              </p>
              <p className="leading-relaxed max-w-sm">
                Consultante en opérations IA et automatisation pour
                entrepreneurs, coachs et consultants.
              </p>
            </div>
            <div>
              <p className="text-background mb-4 uppercase tracking-widest text-[10px] font-semibold">
                Liens utiles
              </p>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="hover:text-background transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-background transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    href="https://blog.jetassiste.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-background transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <Link to="/audit" className="hover:text-background transition-colors">
                    Audit gratuit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-[10px] uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} Jetassiste
          </p>
        </div>
      </footer>
    </div>
  );
}
