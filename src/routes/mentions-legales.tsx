import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/coachs-form";
import coachsCss from "@/styles/coachs.css?url";
import legalCss from "@/styles/mentions-legales.css?url";

const title = "Mentions légales — Jetassiste";
const description = "Éditrice, hébergement, propriété intellectuelle et protection des données du site Jetassiste.";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
    links: [
      { rel: "stylesheet", href: coachsCss },
      { rel: "stylesheet", href: legalCss },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500..700;1,9..144,500..700&family=Nunito:wght@400;600;700;800&family=Dancing+Script:wght@500;600&display=swap" },
    ],
  }),
  component: MentionsLegalesPage,
});

function MentionsLegalesPage() {
  return <div className="coachs-page legal-page">
    <header><div className="wrap"><Link className="logo" to="/">Jetassiste</Link></div></header>
    <main><section><div className="narrow stack">
      <div className="head"><h1>Mentions légales</h1></div>
      <h2>Éditrice du site</h2>
      <p>Aina Razafinimanana, entrepreneure individuelle exerçant sous le nom commercial Jetassiste.</p>
      <p>Adresse : 102 Andoharanofotsy, Madagascar.</p>
      <p>Contact : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, WhatsApp <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">+261 34 90 121 59</a>.</p>
      <h2>Directrice de la publication</h2>
      <p>Aina Razafinimanana.</p>
      <h2>Hébergement</h2>
      <p>Site créé et hébergé avec Lovable. LWS, société par actions simplifiée au capital de 500 000 €, immatriculée sous le numéro 851 993 683 RCS Épinal, siège social : 2 rue Jules Ferry, 88190 Golbey, France. Site : lws.fr</p>
      <h2>Propriété intellectuelle</h2>
      <p>Les textes, visuels et éléments du site appartiennent à Jetassiste, toute reproduction sans autorisation est interdite.</p>
      <h2>Données personnelles</h2>
      <p>Le formulaire de la page d'accueil n'enregistre aucune donnée sur le site ; les réponses ne sont transmises que si la personne choisit de les envoyer elle-même par WhatsApp.</p>
      <p>Les données reçues (par WhatsApp, e-mail ou Calendly) servent uniquement à préparer l'appel et à répondre à la demande, ne sont ni vendues ni cédées, et sont conservées 12 mois.</p>
      <p>Droits d'accès, de rectification, d'effacement et d'opposition : écrire à <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Possibilité de réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL (cnil.fr)</a>.</p>
      <p>La prise de rendez-vous utilise Calendly, qui reçoit les informations renseignées lors de la réservation et applique sa propre <a href="https://calendly.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">politique de confidentialité</a>. Si tu envoies tes réponses par WhatsApp, elles sont traitées par WhatsApp selon sa propre politique. Les messages envoyés par e-mail sont traités par les services de messagerie utilisés.</p>
      <p>Le formulaire de la page Audit transmet les réponses à Jetassiste par e-mail via Resend pour traiter la demande d'audit. Il ne s'agit pas du formulaire de la page d'accueil.</p>
      <h2>Cookies et mesure d'audience</h2>
      <p>Le site n'utilise pas de cookies publicitaires. La mesure d'audience Lovable est activée : elle n'utilise aucun cookie, ne stocke rien sur l'appareil du visiteur, ne conserve pas les adresses IP et n'identifie pas les visiteurs.</p>
      <p>Elle enregistre les pages visitées, la provenance des visites, le pays, le navigateur, le système d'exploitation, le type d'appareil, la durée des visites, la vitesse de chargement des pages, les erreurs et les clics sur les boutons et les liens. Sans bannière de consentement sur ce site, ces informations sont enregistrées pour chaque visiteur.</p>
      <p>Les données détaillées sont conservées pendant 90 jours et les résumés quotidiens pendant un an. Lovable collecte ces données pour nous. La <a href="https://lovable.dev/privacy" target="_blank" rel="noopener noreferrer">politique de confidentialité de Lovable</a> explique comment elles sont traitées.</p>
      <p>Les polices sont chargées via Google Fonts : le navigateur transmet à Google les informations techniques nécessaires à leur téléchargement, dont l'adresse IP. L'ancien accueil charge les articles et leurs images depuis blog.jetassiste.com, dont le serveur reçoit les informations techniques de ces requêtes.</p>

      <h2>Mise à jour</h2><p>17 novembre 2026.</p>
    </div></section></main>
    <footer><div className="wrap"><span className="footer-logo">Jetassiste</span><span><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> · <Link to="/mentions-legales">Mentions légales</Link></span></div></footer>
  </div>;
}