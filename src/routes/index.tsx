import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, WHATSAPP_GREETING, WHATSAPP_NUMBER, isCoachsIdentityValid } from "@/lib/coachs-form";
import coachsCss from "@/styles/coachs.css?url";

const WHATSAPP = WHATSAPP_NUMBER;
const CALENDLY = "https://calendly.com/jorah/cafe-virtuel?back=1";
const title = "Jetassiste – Récupère 10 à 20 heures par semaine";
const description = "Coach, je prends en charge ton admin, tes paiements, ton contenu et tes ateliers, et on automatise ce qui peut l'être. Appel offert de 30 min, 3 places par mois.";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }],
    links: [
      { rel: "stylesheet", href: coachsCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500..700;1,9..144,500..700&family=Nunito:wght@400;600;700;800&family=Dancing+Script:wght@500;600&display=swap" },
    ],
  }),
  component: CoachsPage,
});

const groups = [
  { title: "Tes clientes", category: "Suivi des clientes", tasks: ["L'onboarding : contrat, questionnaire, facture", "Les mails administratifs", "Le suivi et les relances entre les séances", "La fin d'accompagnement et la coupure des accès", "Les cas particuliers et les dossiers en attente"] },
  { title: "Tes paiements", category: "Paiements et factures", tasks: ["La facturation", "Le suivi et la relance des impayés", "Le regroupement des factures pour ta compta"] },
  { title: "Ton contenu", category: "Contenu", tasks: ["La programmation de tes reels et leurs légendes", "La publication de ton podcast", "Tes posts et ta newsletter"] },
  { title: "Tes ateliers et programmes", category: "Ateliers et programmes", tasks: ["L'agenda et les rappels de tes ateliers", "Les replays : récupération, mise en ligne, transcription", "Ta bibliothèque de vidéos offertes"] },
  { title: "Ton organisation", category: "Mails et organisation", tasks: ["Le tri de ta boîte de contact", "Les prises de rendez-vous, les rappels et les reports", "Tes procédures, toujours à jour"] },
];
const navigation = [["taches", "CE QUE JE FAIS"], ["exemple", "CONCRÈTEMENT"], ["mois", "LE MOIS"], ["offre", "OFFRE"], ["faq", "FAQ"]];
function Check() {
  return <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6" /></svg>;
}
function CoachsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const thanksRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ firstName: string; text: string } | null>(null);
  const [copied, setCopied] = useState("");
  const [bump, setBump] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOff, setMobileOff] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const html = document.documentElement;
    const oldPadding = html.style.scrollPaddingTop;
    const oldBehavior = html.style.scrollBehavior;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousActive = "";
    const onScroll = () => {
      const y = window.scrollY || html.scrollTop;
      const height = html.scrollHeight - window.innerHeight;
      setScrolled(y > 8);
      if (progressRef.current) progressRef.current.style.width = `${height > 0 ? (y / height) * 100 : 0}%`;
      html.style.scrollPaddingTop = window.innerWidth <= 760 ? "120px" : "96px";
      html.style.scrollBehavior = reduced.matches ? "auto" : "smooth";
      let current = "";
      navigation.forEach(([id]) => {
        const section = root.querySelector(`#${id}`);
        if (section && section.getBoundingClientRect().top < 160) current = id;
      });
      setActive(current);
      if (current !== previousActive) {
        const link = root.querySelector<HTMLAnchorElement>(`nav a[href="#${current}"]`);
        const nav = link?.parentElement;
        if (link && nav && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: link.offsetLeft - 16, behavior: reduced.matches ? "auto" : "smooth" });
        previousActive = current;
      }
      const diagnostic = root.querySelector("#diagnostic");
      if (diagnostic) {
        const rect = diagnostic.getBoundingClientRect();
        setMobileOff(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => { onScroll(); frame = 0; });
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onScroll);
    reduced.addEventListener("change", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", onScroll);
      window.cancelAnimationFrame(frame);
      html.style.scrollPaddingTop = oldPadding;
      html.style.scrollBehavior = oldBehavior;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const selectors = [".head", ".hero .stack", ".hero .card", ".grid > *", ".tl > div", ".chips", ".ctaline", ".card.flat", ".tbox", "#faq details", ".gain > div", ".final .narrow > *", ".notfor > div"];
    const elements = Array.from(new Set(selectors.flatMap(selector => Array.from(root.querySelectorAll<HTMLElement>(selector)))));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("in"); observer.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    elements.forEach(element => {
      const parent = element.parentElement;
      if (parent?.matches(".grid, .tl, .gain, .stack, .final .narrow, .notfor")) {
        const sibling = Array.from(parent.children).indexOf(element);
        element.style.setProperty("--d", `${Math.min(sibling, 5) * 0.08}s`);
      }
      element.classList.add("rv");
      observer.observe(element);
    });
    root.classList.add("anim");
    root.querySelectorAll(".hl").forEach(highlight => { if (!highlight.closest(".rv")) highlight.classList.add("in"); });
    const timer = window.setTimeout(() => elements.forEach(element => { if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add("in"); }), 1500);
    const motionChange = () => { if (reduced.matches) root.classList.remove("anim"); };
    reduced.addEventListener("change", motionChange);
    return () => { observer.disconnect(); window.clearTimeout(timer); reduced.removeEventListener("change", motionChange); root.classList.remove("anim"); };
  }, []);

  useEffect(() => {
    if (!result) return;
    thanksRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }, [result]);

  function toggleTask(task: string, category: string, isChecked: boolean) {
    setChecked(previous => isChecked ? [...previous, task] : previous.filter(value => value !== task));
    // As in the supplied page, selecting tasks checks their categories without clearing previous choices.
    if (isChecked) setCategories(previous => previous.includes(category) ? previous : [...previous, category]);
    setBump(previous => previous + 1);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = String(data.get("prenom") || "").trim();
    const email = String(data.get("email") || "").trim();
    if (!firstName || !email) { setError("Il me manque ton prénom et ton e-mail."); return; }
    const emailInput = event.currentTarget.elements.namedItem("email");
    if (!isCoachsIdentityValid(firstName, email) || (emailInput instanceof HTMLInputElement && !emailInput.validity.valid)) {
      setError("Il me manque ton prénom et ton e-mail.");
      if (emailInput instanceof HTMLInputElement) emailInput.focus();
      return;
    }
    setError("");
    const text = WHATSAPP_GREETING + ", voici mes réponses pour l'appel :\n\n" +
      "Prénom : " + firstName + "\n" + "E-mail : " + email + "\n" +
      "Coaching : " + (data.get("coaching") || "-") + "\n" +
      "Ce qui me prend du temps : " + (data.getAll("taches").join(", ") || "-") + "\n" +
      "Mes outils : " + (data.get("outils") || "-") + "\n" +
      "Avec 10 h de plus : " + (data.get("objectif") || "-");
    setResult({ firstName, text });
  }
  async function copy() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result.text); setCopied("Copié !"); }
    catch { setCopied("Sélectionne le texte au-dessus pour le copier."); }
  }

  return <div className="coachs-page" ref={rootRef}>
    <div className="progress" aria-hidden="true" ref={progressRef} />
    <header className={scrolled ? "scrolled" : ""}><div className="wrap">
      <a className="logo" href="#top">Jetassiste</a>
      <nav aria-label="Navigation principale">
        {navigation.map(([id, label]) => <a key={id} className={`lk${active === id ? " on" : ""}`} href={`#${id}`} aria-current={active === id ? "true" : undefined}>{label}</a>)}
        <a className="btn" href="#diagnostic">RÉSERVER MON APPEL</a>
      </nav>
    </div></header>
    <main id="top">
      <section className="hero"><div className="wrap">
        <div className="stack gap22">
          <span className="pill mono yellow">Pour les coachs dont l'activité grandit</span>
          <h1>Récupère <span className="hl">10 à 20 heures</span> par semaine. Je m'occupe du reste.</h1>
          <p className="lead">Ton admin, tes paiements, ton contenu, tes ateliers : je prends tout en charge. Et en un mois, on met en place ce qui peut tourner sans toi. Le temps gagné dépend de ton activité : on l'estime ensemble pendant l'appel.</p>
          <div className="ctas"><a className="btn main" href="#diagnostic">Réserver mon appel offert</a><a href="#offre" className="fw600">Voir l'offre</a></div>
          <div className="reassure"><span>30 min offertes</span><span>Tu repars avec tes 3 priorités</span><span>Objectif atteint ou je continue</span><span>3 places par mois</span></div>
        </div>
        <div className="card lg">
          <p className="sur">Tu me confies</p>
          <ul className="clean">
            <li><Check /><span>Tes clientes, de l'arrivée au départ</span></li>
            <li><Check /><span>Tes paiements et tes factures</span></li>
            <li><Check /><span>Ton contenu et sa diffusion</span></li>
            <li><Check /><span>Tes ateliers et tes programmes</span></li>
            <li><Check /><span>Ta boîte mail et ton organisation</span></li>
          </ul>
          <a href="#taches" className="fw600">Voir le détail</a>
          <p className="sur douce fs22">Et toi, tu gardes les séances.</p>
        </div>
      </div></section>
      <section id="pour-toi" className="alt"><div className="wrap">
        <div className="head"><p className="sur">C'est pour toi si...</p><h2>Ton activité grandit, et c'est une <span className="hl l">belle nouvelle</span>.</h2><p className="lead">Tu as des clientes, une offre qui marche, des projets plein la tête. Seulement, chaque nouvelle cliente apporte aussi des mails, des documents et des relances.</p></div>
        <div className="grid">
          <div className="card"><h3>L'admin grignote tes soirées</h3><p className="douce">Tu coaches la journée. Le soir, il reste les mails, les factures et les comptes-rendus.</p></div>
          <div className="card"><h3>L'IA t'attire, sans savoir par où commencer</h3><p className="douce">Entre les outils, les tutos et les nouveautés, il est difficile de trouver le temps de s'y mettre.</p></div>
          <div className="card"><h3>Une assistante, c'est un grand pas</h3><p className="douce">Recruter, former, payer chaque mois. Ce n'est pas toujours le bon moment.</p></div>
        </div>
        <div className="notfor grid w gap32">
          <div className="stack gap10"><h3>On est faites pour travailler ensemble si...</h3><ul className="dots"><li>Tu as déjà des clientes régulières et une offre qui se vend</li><li>Tu sens que l'organisation te freine plus que le manque de clientes</li><li>Tu es prête à déléguer, et à me faire confiance sur l'exécution</li></ul></div>
          <div className="stack gap10"><h3>Ce n'est sans doute pas le bon moment si...</h3><ul className="dots"><li>Tu cherches encore tes premières clientes</li><li>Tu préfères apprendre à tout faire toi-même</li></ul></div>
        </div>
      </div></section>
      <section id="taches"><div className="wrap">
        <div className="head"><p className="sur">Ce que je prends en charge</p><h2>Tout ce qui t'éloigne de tes <span className="hl">clientes</span>.</h2><p className="lead">Pas seulement l'admin. Tout ce dont tu as besoin de te défaire pour te sentir plus légère : je m'en occupe.</p><p><strong>Coche ce que tu fais encore toi-même.</strong> On partira de là pendant l'appel.</p></div>
        <div className="grid">
          {groups.map(group => <div className="card" key={group.category}><h3>{group.title}</h3><div className="tick">{group.tasks.map(task => <label key={task}><input type="checkbox" data-cat={group.category} checked={checked.includes(task)} onChange={event => toggleTask(task, group.category, event.target.checked)} /><span>{task}</span></label>)}</div></div>)}
          <div className="card flat green"><h3>Et le reste ?</h3><p className="douce">Chaque activité est différente. Ce qui te pèse et qui n'est pas dans cette liste, on en parle pendant l'appel.</p></div>
        </div>
        <div className="ctaline" id="bilan"><a className="btn" href="#diagnostic" id="bilanBtn">Je veux m'en libérer</a><p id="bilanTxt" key={bump} className={bump ? "bump" : ""} aria-live="polite">{checked.length === 0 ? "On choisit ensemble par quoi commencer." : <><strong>{checked.length}{checked.length > 1 ? " tâches" : " tâche"} encore entre tes mains.</strong> On regarde ensemble lesquelles te libérer en premier.</>}</p></div>
      </div></section>
      <section className="alt"><div className="wrap">
        <div className="head"><p className="sur">Comment je t'aide</p><h2>Pour chaque tâche, la <span className="hl">bonne façon</span> de faire.</h2><p className="lead">Pendant l'appel, on regarde ensemble chaque tâche et on choisit : je m'en occupe, on l'automatise, ou on l'agentise. Tu n'as rien à apprendre ni à configurer.</p></div>
        <div className="grid">
          <div className="card lg"><span className="pill mono">Je m'en occupe</span><h3 className="fs24">Ce qui demande une personne</h3><p className="douce">Le relationnel, les cas particuliers, ce qui demande du jugement. Je le fais, avec soin.</p></div>
          <div className="card lg"><span className="pill mono yellow">On l'automatise</span><h3 className="fs24">Ce qui se fait toujours pareil</h3><p className="douce">Une règle fixe : quand ceci arrive, cela se fait. Pas d'IA, pas de réflexion, juste zéro oubli.</p><ul className="dots"><li>Une cliente réserve : confirmation, questionnaire et lien visio partent seuls</li><li>Un paiement arrive : la facture part</li><li>La veille d'une séance : rappel envoyé</li></ul></div>
          <div className="card lg"><span className="pill mono mint">On l'agentise</span><h3 className="fs24">Ce qui demande de lire ou d'écrire</h3><p className="douce">Un assistant IA réglé sur ta méthode et ton ton. Il prépare, tu relis.</p><ul className="dots"><li>Le compte-rendu et le plan d'action d'une séance</li><li>Les réponses à tes messages les plus fréquents</li><li>Une séance ou un live transformés en posts</li></ul></div>
        </div>
        <div className="card lg flat mt32 green"><h3 className="fs24">Souvent, une automatisation suffit.</h3><p>Une tâche qui se répète à l'identique n'a pas besoin d'IA. L'automatisation est plus simple, plus fiable et moins chère à faire tourner. L'agentisation devient utile seulement quand il faut lire, réfléchir ou écrire. On choisit ensemble ce qui convient à ton activité.</p></div>
        <div className="stack mt40"><p className="sur">Avec tes outils</p><p>Je pars de ce que tu utilises déjà, et j'ajoute seulement ce qui manque. En 10 ans d'assistanat, j'en ai croisé beaucoup :</p><div className="chips"><span className="y">Make</span><span className="y">Claude</span><span>GoHighLevel</span><span>Systeme.io</span><span>Stripe</span><span>ClickUp</span><span>Notion</span><span>Google Workspace</span><span>Calendly</span><span>... et les tiens</span></div></div>
      </div></section>
      <section id="exemple"><div className="wrap">
        <div className="head"><p className="sur">Concrètement</p><h2>Une nouvelle cliente dit oui. <span className="hl">Et après ?</span></h2><p className="lead">Un exemple de ce qu'on peut mettre en place ensemble. Le tien sera construit selon ton activité.</p></div>
        <div className="grid w stretch">
          <div className="card lg"><span className="pill mono">Aujourd'hui</span><h3 className="fs24">Tu fais tout à la main</h3><ul className="dots"><li>Tu envoies le contrat, puis la facture</li><li>Tu envoies le questionnaire et le lien de la visio</li><li>Tu l'ajoutes dans ton suivi</li><li>Tu penses à lui rappeler sa séance</li><li>Après la séance, tu rédiges le compte-rendu le soir</li></ul></div>
          <div className="card lg green"><span className="pill mono mint">Avec ton système</span><h3 className="fs24">Tu accueilles ta cliente. C'est tout.</h3><ul className="dots"><li>Elle paie : contrat, facture, questionnaire et lien partent seuls</li><li>Elle entre dans ton suivi, sans que tu y penses</li><li>La veille, elle reçoit son rappel</li><li>Après la séance, le compte-rendu est prêt. Tu le relis, tu l'envoies</li><li>Et je garde un œil sur le tout</li></ul></div>
        </div>
        <div className="card lg flat mt32"><h3 className="fs24">Tu gardes la main.</h3><p>Avant d'activer quoi que ce soit, tu relis et tu valides chaque message qui partira chez tes clientes. Rien ne se fait dans ton dos, et c'est toujours ta voix qu'elles entendent.</p></div>
      </div></section>
      <section id="mois" className="alt"><div className="wrap">
        <div className="head"><p className="sur">Comment ça marche</p><h2>Un objectif. <span className="hl">Un mois</span> pour l'atteindre.</h2><p className="lead">Pas de compteur d'heures. On choisit ensemble un objectif pendant l'appel. Ensuite, je fais le nécessaire pour l'atteindre en un mois.</p></div>
        <div className="tl">
          <div><span className="num">0</span><h3>L'appel</h3><p className="douce">Un court questionnaire, puis 30 min en visio. On fixe ton objectif ensemble.</p></div>
          <div><span className="num">1</span><h3>Semaine 1</h3><p className="douce">Je prends le temps de bien comprendre ton activité. Les premières automatisations simples tournent déjà.</p></div>
          <div><span className="num">2</span><h3>Semaines 2 à 4</h3><p className="douce">Je construis le reste, et ton assistant IA si on en a prévu un. Je teste tout.</p></div>
          <div><span className="num">3</span><h3>Fin du mois</h3><p className="douce">Une visio pour te montrer comment tout fonctionne. Tu repars avec tes tutos et ton manuel.</p></div>
          <div><span className="num">4</span><h3>Et après ?</h3><p className="douce">Tu pilotes toi-même. Ou tu me laisses piloter. C'est toi qui choisis.</p></div>
        </div>
        <div className="ctaline"><a className="btn" href="#diagnostic">Réserver mon appel</a><p>Ce qu'il te demande, à toi : l'appel, quelques validations pendant le mois, et la visio finale.</p></div>
      </div></section>
      <section><div className="wrap"><div className="grid w center gap48">
        <div className="mono douce photo">[Ta photo]</div>
        <div className="stack"><p className="sur">Qui je suis</p><h2>Moi, c'est <span className="hl">Aina Razafinimanana</span>.</h2><p className="lead">Ça fait 10 ans que je suis assistante virtuelle. 10 ans à gérer des agendas, des mails, des factures et des outils pour d'autres entrepreneurs.</p><p className="lead">Quand l'IA est arrivée, ça a été une vraie passion.</p><p className="lead">Aujourd'hui, je mets ces 10 ans au service des coachs. Je connais bien leurs semaines, et tout ce qui se passe en coulisses.</p></div>
      </div></div></section>
      <section id="offre" className="alt"><div className="wrap">
        <div className="head"><p className="sur">L'offre</p><h2>Un mois pour tout mettre en place. <span className="hl">Zéro engagement</span> ensuite.</h2></div>
        <div className="grid w stretch">
          <div className="card lg">
            <div className="card-top"><span className="mono douce">Le mois de mise en place</span><span className="pill mono yellow">Prix de lancement</span></div>
            <h3 className="fs28">Ton système sur mesure</h3>
            <p><span className="price">380 €</span> <span className="douce">TTC</span> &nbsp;<span className="strike">590 € TTC</span></p>
            <p className="douce small">En 1 fois, ou en 2 fois (2 × 190 €), au choix.</p>
            <p className="medium"><strong>3 coachs par mois seulement</strong>, pour que chacune ait toute mon attention.</p>
            <ul className="dots"><li>L'appel et un objectif fixé ensemble</li><li><strong>Jusqu'à 3 automatisations</strong>, choisies selon ton objectif</li><li><strong>Un assistant IA</strong> réglé sur ta méthode et ton style, si ton activité en a besoin</li><li>Les premières automatisations en place dès la semaine 1</li><li>La visio de prise en main en fin de mois</li><li>Les tutos vidéo et ton manuel, à vie</li></ul>
            <div className="stack price-note"><p><strong>Pourquoi ce prix ?</strong></p><p className="douce medium24">Je lance cette offre pour les coachs, et je veux construire mes premiers résultats avec toi. Pas de piège : en échange, je te demanderai seulement ton avis honnête à la fin du mois.</p></div>
            <p className="douce small">Tu as déjà des automatisations ? Je les reprends, je les répare et je les connecte. Tu pars de zéro ? On commence par celles qui te font gagner le plus de temps.</p>
            <a className="btn j push self-start" href="#diagnostic">Je commence par l'appel</a>
          </div>
          <div className="card lg">
            <div className="card-top"><span className="mono douce">Ensuite, si tu veux</span><span className="pill mono mint">Sans engagement</span></div>
            <h3 className="fs28">Je pilote pour toi</h3>
            <p><span className="price">500 €</span> <span className="douce">/ mois</span></p>
            <ul className="dots"><li><strong>Jusqu'à 5 h par semaine de mon temps, réservées pour toi</strong></li><li><strong>Pilotage</strong> : je fais tourner, je surveille et j'ajuste ton système</li><li><strong>Disponibilité</strong> : tu m'écris, je te réponds sous 24 h ouvrées</li><li>Je repère et je mets en place les prochaines automatisations</li><li>Je tiens tes procédures à jour</li><li>Un point ensemble chaque mois</li><li>Les heures non utilisées ne sont pas reportées</li><li>Tu arrêtes quand tu veux : tout reste chez toi</li></ul>
            <div className="stack extra"><p><strong>Besoin de moi sur d'autres tâches ?</strong></p><p className="douce">On en parle, et je te fais un devis selon tes besoins.</p></div>
          </div>
        </div>
        <div className="grid w center gap32 mt48">
          <div className="stack"><p className="sur">Ma promesse</p><h2>Ton objectif atteint, <span className="hl l">ou je continue</span>.</h2><p className="lead">Si on n'atteint pas l'objectif fixé ensemble au bout du mois, je continue sans frais jusqu'à ce qu'il le soit.</p><p className="lead">Et ton système t'appartient, pour de bon. Je ne suis pas indispensable, et je le veux ainsi. Si tu me gardes comme pilote, c'est parce que tu en as envie, pas parce que tu y es obligée.</p></div>
          <div className="card lg"><p className="sur">Tu gardes, quoi qu'il arrive</p><ul className="clean"><li><Check /><span>Tous tes outils et tes comptes, à ton nom</span></li><li><Check /><span>Ton assistant IA, si on en a créé un</span></li><li><Check /><span>Des tutos vidéo pour chaque automatisation, à vie</span></li><li><Check /><span>Ton manuel de fonctionnement, écrit simplement</span></li></ul></div>
        </div>
      </div></section>
      <section><div className="wrap">
        <div className="head"><p className="sur">Pour comparer</p><h2>Plus souple qu'une embauche. <span className="hl l">Plus concret</span> qu'une formation.</h2></div>
        <div className="tbox"><table><thead><tr><th className="mono"></th><th className="mono">Formation IA</th><th className="mono">Assistante</th><th className="mono me">Jetassiste</th></tr></thead><tbody>
          <tr><th scope="row">Qui fait le travail ?</th><td>Toi</td><td>Elle, à la main</td><td className="me">Moi, et les outils que je construis</td></tr>
          <tr><th scope="row">Le soir et le week-end</th><td>Non</td><td>Rarement</td><td className="me">Tes automatisations tournent sans pause. Moi, je suis disponible aux horaires qu'on définit ensemble.</td></tr>
          <tr><th scope="row">Engagement</th><td>Ton temps d'apprentissage</td><td>Contrat, recrutement, formation</td><td className="me">Aucun</td></tr>
          <tr><th scope="row">Si tu arrêtes</th><td>Tu gardes la théorie</td><td>Tout repart avec elle</td><td className="me">Tout reste chez toi</td></tr>
        </tbody></table></div>
      </div></section>
      <section id="faq" className="alt"><div className="narrow">
        <div className="head"><p className="sur">Tes questions</p><h2>Ce qu'on me demande <span className="hl">souvent</span>.</h2></div>
        <div className="stack">
          <details><summary>L'appel, c'est un appel de vente ?</summary><p>C'est d'abord un appel pour toi. On regarde ta semaine, et tu repars avec tes priorités et un objectif clair. Si mon offre peut t'aider, je te la présente. Sinon, je te le dis franchement.</p></details>
          <details><summary>Je n'ai jamais délégué. J'ai peur de perdre le contrôle.</summary><p>C'est normal, et c'est pour ça qu'on avance pas à pas. Tu valides chaque message avant qu'il parte. Tu vois tout ce qui est en place dans ton manuel. Et tu peux arrêter à tout moment.</p></details>
          <details><summary>On travaille sur quels horaires ?</summary><p>[TES HORAIRES : par exemple, du lundi au vendredi de 9 h à 17 h, heure de Paris.] Tes automatisations, elles, tournent en continu.</p></details>
          <details><summary>Je ne suis pas à l'aise avec la technique. C'est un problème ?</summary><p>Non, c'est même le principe. Je m'occupe de tout, tu utilises le résultat. Et en fin de mois, je te montre juste le nécessaire.</p></details>
          <details><summary>Combien de temps ça va me demander, à moi ?</summary><p>Très peu. L'appel, quelques validations pendant le mois quand j'ai besoin de ton avis, et la visio de prise en main à la fin.</p></details>
          <details><summary>Les abonnements aux outils sont-ils inclus ?</summary><p>Pendant la mise en place, je travaille avec mes propres outils. Une fois que tout fonctionne, on migre tout vers tes comptes, pour que ton système t'appartienne vraiment. Donc oui, à la fin, tu prends toi-même les abonnements aux outils nécessaires, comme Make ou l'IA de ton choix (Claude, ChatGPT...). Ils sont à ton nom et à ta charge. Pour te repérer : compte environ 30 € par mois pour démarrer, soit Make à partir d'environ 10 € et une IA comme Claude à environ 20 €. Le montant exact dépend de ce qu'on met en place. Les outils que tu utilises déjà ne changent pas. On choisit ensemble des formules adaptées à ton budget.</p></details>
          <details><summary>Comment je paie ?</summary><p>En 1 fois ou en 2 fois, comme tu préfères. Le paiement se fait par transfert d'argent via <a href="https://www.riamoneytransfer.com/fr-fr/send-money-to-madagascar/" target="_blank" rel="noopener">Ria</a>. Je t'envoie toutes les infos après l'appel.</p></details>
          <details><summary>Et si l'objectif n'est pas atteint au bout du mois ?</summary><p>Je continue sans frais jusqu'à ce qu'il le soit. C'est pour ça qu'on le fixe ensemble dès l'appel : un objectif clair et réaliste pour ton activité.</p></details>
          <details><summary>Pourquoi seulement 3 coachs par mois ?</summary><p>Parce que chaque mise en place demande du temps pour bien comprendre ton activité. Je préfère en accompagner peu, mais bien.</p></details>
          <details><summary>Pourquoi pas un forfait en heures ?</summary><p>Parce que ce qui compte, c'est le résultat. On fixe un objectif ensemble, et je fais en sorte de l'atteindre en un mois. Le temps que ça me demande, c'est à moi de le gérer.</p></details>
          <details><summary>Et la confidentialité de mes clientes ?</summary><ul className="dots"><li>On signe un accord de confidentialité et un contrat de sous-traitance RGPD avant de commencer.</li><li>Tu me partages tes accès via Dashlane, un gestionnaire de mots de passe sécurisé. Aucun mot de passe ne passe par mail ou par message, et tu peux retirer le partage quand tu veux.</li><li>Les outils IA sont réglés pour ne pas apprendre à partir de tes données.</li><li>Je privilégie l'hébergement en Europe quand l'outil le permet.</li><li>Je n'utilise que les données nécessaires. À la fin, je supprime mes accès.</li></ul></details>
          <details><summary>Que se passe-t-il après le mois ?</summary><p>Tu as une visio de prise en main, tes tutos et ton manuel. Tu peux tout piloter seule. Ou tu me laisses le faire, sans engagement.</p></details>
          <details><summary>Et si mon outil est un peu particulier ?</summary><p>10 ans d'assistanat, c'est beaucoup d'outils croisés. Si je ne le connais pas déjà, je m'y mets. Ton outil ne sera pas un frein.</p></details>
        </div>
      </div></section>
      <section id="diagnostic"><div className="narrow">
        <div className="head"><p className="sur">On commence ici</p><h2>Réserve ton <span className="hl">appel offert</span>.</h2><p className="lead">30 minutes pour toi, même si on ne travaille pas ensemble ensuite. Tu repars avec :</p>
          <div className="gain"><div><span className="num">1</span><strong>Tes 3 tâches à confier en priorité</strong><span className="douce">Celles qui te libèrent le plus de temps, le plus vite.</span></div><div><span className="num">2</span><strong>La bonne façon pour chacune</strong><span className="douce">Je m'en occupe, on l'automatise ou on l'agentise.</span></div><div><span className="num">3</span><strong>Un objectif clair pour le mois</strong><span className="douce">Ce qu'on peut viser ensemble, concrètement.</span></div></div>
          <p className="douce">Pas de vente forcée. Si ce n'est pas pour toi, je te le dis.</p>
          <div className="steps3"><div><b>1</b><span>Tu réponds à 5 questions, en 2 minutes</span></div><div><b>2</b><span>Tu choisis ton créneau de 30 min</span></div><div><b>3</b><span>On fixe ton objectif ensemble</span></div></div>
        </div>
        {!result && <form id="form" className="card lg" noValidate onSubmit={submit}>
          <div className="two"><label>Ton prénom<input type="text" name="prenom" autoComplete="given-name" required /></label><label>Ton e-mail<input type="email" name="email" autoComplete="email" required /></label></div>
          <label>Ton type de coaching<span className="hint">Business, vie, sport, nutrition, carrière...</span><input type="text" name="coaching" /></label>
          <fieldset><legend>Qu'est-ce qui te prend le plus de temps ?</legend><div className="checks">{[...groups.map(group => group.category), "Autre"].map(category => <label key={category}><input type="checkbox" name="taches" value={category} checked={categories.includes(category)} onChange={event => setCategories(previous => event.target.checked ? [...previous, category] : previous.filter(value => value !== category))} />{category}</label>)}</div></fieldset>
          <label>Tes outils actuels<span className="hint">Systeme.io, GHL, Stripe, Notion, Calendly...</span><input type="text" name="outils" /></label>
          <label>Si tu récupérais 10 heures par semaine, tu en ferais quoi ?<textarea name="objectif" /></label>
          <p id="err" role="alert">{error}</p>
          <Button variant="ghost" className="btn j self-start" type="submit">Choisir mon créneau</Button>
          <p className="douce small">Tes réponses restent entre nous et servent seulement à préparer l'appel.</p>
          <p className="small">Tu préfères réserver directement ? <a href={CALENDLY} target="_blank" rel="noopener" className="fw700">Choisir mon créneau</a></p>
        </form>}
        {result && <div id="merci" className="card lg on" ref={thanksRef}>
          <h3 className="fs26">Merci <span id="mprenom">{result.firstName}</span> !</h3>
          <p>Dernière étape : choisis ton créneau.</p>
          <a className="btn j self-start" href={CALENDLY} target="_blank" rel="noopener">Choisir mon créneau</a>
          <p className="douce">Pour que j'arrive préparée, envoie-moi aussi tes réponses :</p>
          <div id="resume">{result.text}</div>
          <div className="ctas"><a id="wa" className="btn" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(result.text)}`} target="_blank" rel="noopener">Envoyer sur WhatsApp</a><Button id="copy" variant="ghost" className="btn" type="button" onClick={copy}>Copier mes réponses</Button></div>
          <p id="copied" className="douce" aria-live="polite">{copied}</p>
        </div>}
      </div></section>
      <section className="final"><div className="narrow">
        <h2>Dans un mois, ta semaine pourrait être plus légère.</h2><p className="lead">Un objectif. Un mois. Un système qui reste à toi.</p><a className="btn j" href="#diagnostic">Réserver mon appel offert</a><p className="fs14">30 min offertes · 3 places par mois · prix de lancement</p><p className="fs14">Une question avant de réserver ? <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener">Écris-moi sur WhatsApp</a></p>
      </div></section>
    </main>
    <footer><div className="wrap"><span className="footer-logo">Jetassiste</span><span><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> · <a href="[LIEN MENTIONS LÉGALES]">Mentions légales</a></span></div></footer>
    <div className={`mbar${mobileOff ? " off" : ""}`} aria-label="Réserver un appel"><p><strong>Appel offert</strong><br />3 places par mois</p><a className="btn main" href="#diagnostic">Réserver</a></div>
  </div>;
}
