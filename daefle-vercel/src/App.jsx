import { useState, useRef, useEffect, useCallback } from "react";

// ─── PALETTE & FONTS ─────────────────────────────────────────────────────────
// Bright French elegance: cream, gold, rose, sage, deep navy text
const C = {
  cream: "#FDF8F2",
  parchment: "#F5EFE4",
  gold: "#C9A84C",
  goldLight: "#F0DFA0",
  rose: "#D4607A",
  roseLight: "#FAE8ED",
  sage: "#4A7C6F",
  sageLight: "#E4F0EC",
  navy: "#1C2B4A",
  navyLight: "#EEF1F7",
  blue: "#3A6BC8",
  blueLight: "#E8EEFA",
  lavender: "#7C5CBF",
  lavLight: "#F0ECFA",
  amber: "#C87A2A",
  amberLight: "#FDF0E0",
  text: "#1C2B4A",
  muted: "#7A8099",
  border: "#E8DDD0",
  white: "#FFFFFF",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const UNITS = [
  {
    id: "u1", code: "Unité 1", color: C.rose, light: C.roseLight,
    title: "Langue & Communication",
    icon: "💬",
    topics: [
      {
        id: "u1t1", title: "La compétence communicative",
        summary: "Hymes (1972) defined communicative competence as the ability to use language appropriately according to social context — not just grammatical correctness.",
        content: `La compétence communicative (Hymes, 1972) désigne la capacité à utiliser la langue de manière appropriée selon le contexte social. Elle comprend quatre composantes:

① Compétence grammaticale
Maîtrise du code linguistique: grammaire, vocabulaire, phonologie, orthographe.

② Compétence sociolinguistique
Utilisation appropriée selon le contexte culturel et social. Savoir quand tutoyer ou vouvoyer, adapter le registre (formel/informel).

③ Compétence discursive
Cohérence et cohésion dans la production de textes: connecteurs logiques, progression thématique, ponctuation.

④ Compétence stratégique
Capacité à compenser les lacunes communicatives: périphrases, demandes de clarification, reformulations.

🎓 POUR LE DAEFLE: L'objectif est de développer ces quatre dimensions simultanément plutôt que de se concentrer uniquement sur la grammaire.

Key theorists: Hymes (1972), Canale & Swain (1980), Bachman (1990).`,
        keyPoints: ["4 composantes: grammaticale, sociolinguistique, discursive, stratégique", "Hymes 1972 — against purely grammatical focus", "Canale & Swain refined the model in 1980", "Applied directly in CECRL descriptors"],
        vocab: [{ fr: "la compétence", en: "competence/skill" }, { fr: "le locuteur", en: "speaker" }, { fr: "le registre", en: "register (formal/informal)" }, { fr: "la reformulation", en: "rephrasing" }],
      },
      {
        id: "u1t2", title: "Le CECRL et les niveaux",
        summary: "The CEFR (2001) defines 6 proficiency levels from A1 to C2, used to design courses, assess learners, and align qualifications across Europe.",
        content: `Le Cadre Européen Commun de Référence pour les Langues (CECRL / CEFR) est publié par le Conseil de l'Europe en 2001. Il définit 6 niveaux de compétence langagière.

NIVEAUX UTILISATEUR ÉLÉMENTAIRE:
A1 — Découverte: expressions très familières, besoins concrets immédiats.
A2 — Survie: communication simple sur des sujets familiers et courants.

NIVEAUX UTILISATEUR INDÉPENDANT:
B1 — Seuil: peut se débrouiller dans la plupart des situations courantes.
B2 — Avancé: interaction aisée et spontanée avec des locuteurs natifs.

NIVEAUX UTILISATEUR EXPÉRIMENTÉ:
C1 — Autonome: expression fluide, spontanée et bien structurée.
C2 — Maîtrise: précision, nuance et aisance dans tous les contextes.

🎓 POUR LE DAEFLE: Savoir situer un apprenant dans ce cadre est fondamental pour la conception de cours et l'évaluation.`,
        keyPoints: ["Published by Council of Europe 2001", "6 levels: A1, A2, B1, B2, C1, C2", "DELF covers A1–B2; DALF covers C1–C2", "Descriptors use 'can do' statements"],
        vocab: [{ fr: "le cadre", en: "framework" }, { fr: "le niveau", en: "level" }, { fr: "la maîtrise", en: "mastery" }, { fr: "l'apprenant", en: "learner" }],
      },
      {
        id: "u1t3", title: "Phonétique et phonologie",
        summary: "French phonetics is central to FLE teaching. French has 16 oral and nasal vowels, distinctive liaison rules, and syllable-timed rhythm.",
        content: `La phonétique est centrale en FLE car le français possède des sons absents dans de nombreuses langues maternelles.

SYSTÈME VOCALIQUE (16 voyelles):
Orales: /a/ /e/ /ɛ/ /i/ /o/ /ɔ/ /u/ /y/ /ø/ /œ/ /ə/
Nasales: /ɑ̃/ /ɛ̃/ /ɔ̃/ /œ̃/

LA LIAISON ET L'ENCHAÎNEMENT:
• Liaison obligatoire: "vous_avez" — /vuzave/
• Liaison interdite: "et | il" — never link after 'et'
• Enchaînement: "une_amie" — the consonant carries over

L'INTONATION:
• Montante: questions totales "Tu viens?"
• Descendante: affirmations, questions avec mot interrogatif

APPROCHES PÉDAGOGIQUES:
• Méthode verbo-tonale (Guberina): uses rhythm and body movement
• Phonétique corrective ciblée selon la L1 de l'apprenant
• Travail sur la prosodie avant la segmentale`,
        keyPoints: ["16 French vowels (oral + nasal)", "Liaison: obligatory, optional, forbidden", "Verbo-tonal method (Guberina)", "Syllable-timed vs stress-timed rhythm"],
        vocab: [{ fr: "la liaison", en: "linking (phonetics)" }, { fr: "la voyelle nasale", en: "nasal vowel" }, { fr: "la prosodie", en: "prosody / rhythm" }, { fr: "la syllabe", en: "syllable" }],
      },
    ]
  },
  {
    id: "u2", code: "Unité 2", color: C.blue, light: C.blueLight,
    title: "Méthodologie & Didactique",
    icon: "🎓",
    topics: [
      {
        id: "u2t1", title: "Historique des méthodologies FLE",
        summary: "FLE teaching has evolved through several major methodological shifts, from grammar-translation to the actional approach of the CEFR.",
        content: `L'enseignement du FLE a connu plusieurs grandes évolutions méthodologiques:

1️⃣ Méthode traditionnelle / grammaire-traduction (19e s.)
Règles grammaticales explicites, textes littéraires, traduction. Peu d'oral.

2️⃣ Méthode directe (début 20e s.)
Immersion totale en français, refus de la traduction, vocabulaire concret.

3️⃣ Méthode audio-orale / SGAV (années 50–70)
Langue orale prioritaire, dialogues enregistrés, laboratoire de langues. Behaviourisme.

4️⃣ Approche communicative (années 80)
Actes de parole (speech acts), documents authentiques, interaction réelle.

5️⃣ Approche actionnelle (CECRL, 2001)
L'apprenant comme 'acteur social'. Tâches à finalité sociale concrète.

6️⃣ Approche éclectique (aujourd'hui)
Hybridation des méthodes selon le public, les objectifs, le contexte.`,
        keyPoints: ["Grammar-translation → Direct → Audio-oral → Communicative → Actional", "SGAV: Structuro-globale audio-visuelle", "Actional approach: learner as 'social actor'", "Today: eclectic, context-driven approach"],
        vocab: [{ fr: "la méthode", en: "method/approach" }, { fr: "l'acte de parole", en: "speech act" }, { fr: "l'acteur social", en: "social actor" }, { fr: "éclectique", en: "eclectic" }],
      },
      {
        id: "u2t2", title: "Conception d'une séquence pédagogique",
        summary: "A well-structured FLE lesson sequence moves from receptive to productive skills, from guided to autonomous use of language.",
        content: `UNE SÉQUENCE PÉDAGOGIQUE EN FLE suit cette structure progressive:

① Mise en route / sensibilisation
Activer les connaissances préalables. Créer l'intérêt et la motivation.
Ex: une image, une question, un brainstorming.

② Découverte du document
Exposer les apprenants au document déclencheur (authentique ou fabriqué).
Ex: une vidéo, un article, un dialogue.

③ Compréhension globale
Saisir le sens général sans s'arrêter sur les détails.
Questions simples: Qui? Quoi? Où? Quand?

④ Compréhension détaillée
Analyser le contenu plus finement.
Questions ciblées, vrai/faux, QCM.

⑤ Repérage / conceptualisation
Identifier les formes linguistiques en contexte.
Ex: "Trouvez tous les verbes au passé composé."

⑥ Systématisation
Exercices structuraux pour ancrer les formes.
Ex: exercices à trous, transformation de phrases.

⑦ Production (réemploi)
Réutilisation libre en contexte. Oral ou écrit.
Ex: jeu de rôle, rédaction, débat.`,
        keyPoints: ["7 steps: sensibilisation → production", "Réceptif avant productif", "Guidé → autonome", "Document authentique as trigger"],
        vocab: [{ fr: "la mise en route", en: "warm-up / lead-in" }, { fr: "le document déclencheur", en: "trigger document" }, { fr: "la systématisation", en: "drilling / practice" }, { fr: "le réemploi", en: "free production" }],
      },
      {
        id: "u2t3", title: "L'évaluation en FLE",
        summary: "Assessment in FLE must be valid, reliable, and transparent. Types include diagnostic, formative, and summative assessment.",
        content: `TYPES D'ÉVALUATION EN FLE:

📊 Évaluation diagnostique
En début de formation: connaître le niveau et les besoins.
Outil: test de placement, questionnaire, entretien.

📈 Évaluation formative
En cours d'apprentissage: guider la progression.
Feedback continu, auto-évaluation, portfolio.

📝 Évaluation sommative
Bilan à la fin d'une séquence ou d'un cours.
Test écrit, oral, dossier.

🏆 Évaluation certificative
DELF (A1–B2), DALF (C1–C2), TCF, TFI, DAEFLE.

CRITÈRES D'UNE BONNE ÉVALUATION:
• Validité: mesure ce qu'elle prétend mesurer
• Fiabilité: résultats reproductibles
• Faisabilité: réalisable dans le contexte
• Transparence: critères clairs pour l'apprenant

GRILLES CRITÉRIÉES:
Pour le DAEFLE et DELF, les productions sont évaluées selon des critères précis pondérés (ex: cohérence, lexique, grammaire, phonologie).`,
        keyPoints: ["4 types: diagnostic, formative, summative, certificative", "Validity + reliability = essential", "DELF A1–B2; DALF C1–C2", "Criteriée grilles: cohérence, lexique, grammaire"],
        vocab: [{ fr: "l'évaluation", en: "assessment" }, { fr: "la grille critériée", en: "assessment rubric" }, { fr: "la validité", en: "validity" }, { fr: "la fiabilité", en: "reliability" }],
      },
    ]
  },
  {
    id: "u3", code: "Unité 3", color: C.sage, light: C.sageLight,
    title: "Culture & Société",
    icon: "🗼",
    topics: [
      {
        id: "u3t1", title: "La francophonie dans le monde",
        summary: "French is spoken by ~320 million people across 88 countries. The OIF promotes the diversity of French-speaking cultures worldwide.",
        content: `LA FRANCOPHONIE MONDIALE:

Le français est la 5e langue la plus parlée au monde avec environ 320 millions de locuteurs natifs ou partiels.

L'Organisation Internationale de la Francophonie (OIF) regroupe 88 États et gouvernements.

GRANDS ESPACES FRANCOPHONES:
🇫🇷 Europe: France, Belgique, Suisse, Luxembourg, Monaco
🌍 Afrique subsaharienne: Sénégal, Côte d'Ivoire, RDC, Cameroun (26 pays)
🌍 Maghreb: Maroc, Algérie, Tunisie (statut variable, co-officiel ou lingua franca)
🌎 Amériques: Québec (Canada), Haïti, Louisiane, Martinique, Guadeloupe
🌊 Océan Indien: Madagascar, Réunion, Maurice, Mayotte

POUR L'ENSEIGNANT FLE:
Valoriser la diversité des 'francophonies' plutôt que présenter uniquement le français hexagonal. Les accents, variétés lexicales et références culturelles varient considérablement.`,
        keyPoints: ["320 million speakers globally", "88 OIF member states", "Africa: largest francophone continent by speakers", "Valorise diversity — not just hexagonal French"],
        vocab: [{ fr: "la francophonie", en: "French-speaking world" }, { fr: "l'OIF", en: "International Organisation of La Francophonie" }, { fr: "hexagonal", en: "relating to mainland France" }, { fr: "la variété", en: "linguistic variety/dialect" }],
      },
      {
        id: "u3t2", title: "L'approche interculturelle",
        summary: "Intercultural competence helps learners understand and interact with people from different cultures, moving beyond stereotypes.",
        content: `L'APPROCHE INTERCULTURELLE vise à développer chez l'apprenant la capacité à comprendre et interagir avec des personnes de cultures différentes.

ÉTAPES DE LA DÉMARCHE:
① Observation: analyser un fait culturel sans jugement préalable
② Décentration: questionner ses propres références culturelles
③ Relativisation: comprendre que les normes sont culturellement situées
④ Négociation: trouver des espaces de sens partagés

TRAITEMENT DES STÉRÉOTYPES:
Les stéréotypes sont des points de départ utiles s'ils sont déconstruits. Ils permettent d'ouvrir des discussions riches.
Ex: "les Français mangent du fromage" → discussion sur les pratiques alimentaires, l'identité culturelle, les clichés.

COMPÉTENCE INTERCULTURELLE (Byram, 1997):
• Savoirs (knowledge of cultures)
• Savoir-être (attitudes: curiosity, openness)
• Savoir-faire (skills of interpretation)
• Savoir-apprendre (discovery and interaction)
• Savoir-s'engager (critical cultural awareness)`,
        keyPoints: ["4 steps: observer, décenter, relativiser, négocier", "Byram's 5 savoirs (1997)", "Stereotypes as starting points, not endpoints", "Culture is always situated and variable"],
        vocab: [{ fr: "la décentration", en: "stepping outside one's own culture" }, { fr: "la relativisation", en: "cultural relativism" }, { fr: "le stéréotype", en: "stereotype" }, { fr: "le savoir-être", en: "intercultural attitudes" }],
      },
    ]
  },
  {
    id: "u4", code: "Unité 4", color: C.lavender, light: C.lavLight,
    title: "Grammaire & Linguistique",
    icon: "🔤",
    topics: [
      {
        id: "u4t1", title: "Le système verbal français",
        summary: "The French verb system is one of the most complex areas for FLE learners, particularly the distinction between past tenses.",
        content: `LE SYSTÈME VERBAL FRANÇAIS — points clés pour l'enseignant FLE:

TEMPS PRINCIPAUX:
Présent | Imparfait | Passé composé | Passé simple
Futur simple | Conditionnel présent | Subjonctif présent

DISTINCTION PASSÉ COMPOSÉ / IMPARFAIT:
📌 Passé composé: action délimitée, accomplie, au premier plan.
"Il a mangé la pomme." (specific completed action)

📌 Imparfait: arrière-plan, état, habitude, durée non bornée.
"Il mangeait toujours à midi." (ongoing habit/background)

Mnemonic: PC = film shot (action), IMP = painting (scene/state)

LE SUBJONCTIF:
Exprime le subjectif, le doute, la volonté, l'émotion.
"Je veux que tu viennes." / "Il faut que vous soyez là."
Irréguliers clés: être (soit), avoir (ait), aller (aille), faire (fasse), pouvoir (puisse), savoir (sache), vouloir (veuille)

APPROCHE PÉDAGOGIQUE:
Utiliser des lignes du temps visuelles. Partir de textes en contexte. Approche inductive avant déductive.`,
        keyPoints: ["PC = bounded/completed; IMP = background/habitual", "Subjonctif after: vouloir que, falloir que, bien que", "7 irregular subjonctif forms to memorise", "Visual timelines help learners grasp aspect"],
        vocab: [{ fr: "le temps", en: "tense" }, { fr: "l'aspect", en: "aspect (bounded/unbounded)" }, { fr: "le mode", en: "mood (indicative, subjunctive)" }, { fr: "l'accord", en: "agreement" }],
      },
      {
        id: "u4t2", title: "Syntaxe et formation des mots",
        summary: "Understanding French syntax and word formation enables FLE teachers to explain structure clearly and build learners' vocabulary systematically.",
        content: `SYNTAXE DE LA PHRASE FRANÇAISE:

Structure de base: Sujet + Verbe + Complément (SVC)
"Marie mange une pomme."

POINTS DE COMPLEXITÉ POUR LES APPRENANTS:
• Pronoms: "Je le lui donne" — ordre: OD avant OI (sauf lui/leur)
• Négation: ne...pas / ne...jamais / ne...rien / ne...personne / ne...plus
• Relatives: qui (sujet), que (objet), dont (de + nom), où (lieu/temps)
• Passive: "Le gâteau a été mangé par les enfants."

FORMATION DES MOTS — DÉRIVATION:
Préfixes: re- (refaire), dé- (défaire), in-/im- (impossible), sur- (surcharger)

Suffixes nominaux: -tion (réalisation), -eur (lecteur), -iste (pianiste), -ment (développement)
Suffixes adjectivaux: -able (faisable), -eux (heureux), -al (national)
Suffixes verbaux: -iser (moderniser), -ifier (simplifier)

COMPOSITION: chou-fleur, porte-monnaie, gratte-ciel

APPROCHE PÉDAGOGIQUE:
Enseigner les familles de mots et réseaux lexicaux. Le vocabulaire en contexte > listes isolées.`,
        keyPoints: ["SVC: basic French sentence order", "Pronoun order: me/te/le/la/nous/vous/lui/leur/y/en", "Word families more efficient than isolated lists", "Relatives: qui/que/dont/où"],
        vocab: [{ fr: "le syntagme", en: "phrase/constituent" }, { fr: "la dérivation", en: "word derivation" }, { fr: "le préfixe", en: "prefix" }, { fr: "le suffixe", en: "suffix" }],
      },
    ]
  },
];

const STUDY_WEEKS_TEMPLATE = [
  { week: 1, theme: "Introduction & CECRL", unit: "u1", tasks: ["Read DAEFLE programme overview", "Revise CECRL levels A1–C2 with can-do statements", "Fiche: compétence communicative (Hymes)", "Quiz: classify activities by CECRL level"] },
  { week: 2, theme: "Méthodologies FLE", unit: "u2", tasks: ["Timeline of FLE methods (SGAV → Actional)", "Compare communicative vs actional approach", "Analyse a recent FLE textbook (ex: Alter Ego)", "Quiz: identify method from example activities"] },
  { week: 3, theme: "Phonétique & Oral", unit: "u1", tasks: ["French vowel system: 16 vowels", "Revise liaisons and enchaînements", "Listen & transcribe using IPA", "Design a phonetics correction activity"] },
  { week: 4, theme: "Grammaire FLE", unit: "u4", tasks: ["Revise verbal system (tenses, moods)", "PC vs imparfait: annotated exercises", "Syntax: pronouns, negation, relatives", "Prepare 5 example sentences per key structure"] },
  { week: 5, theme: "Conception de cours", unit: "u2", tasks: ["Structure a complete lesson sequence (7 steps)", "Select and analyse an authentic document", "Write communicative & linguistic objectives", "Create a full lesson plan (fiche pédagogique)"] },
  { week: 6, theme: "Évaluation", unit: "u2", tasks: ["Assessment types: diagnostic, formative, summative", "Study DELF B1 and B2 marking grids", "Design a critériée assessment rubric", "Analyse a sample learner essay"] },
  { week: 7, theme: "Culture & Interculturel", unit: "u3", tasks: ["Map the francophone world", "Intercultural approach: steps and examples", "Prepare a classroom stereotypes activity", "French institutions summary sheet"] },
  { week: 8, theme: "Révision Finale", unit: "u1", tasks: ["Full revision of all 4 DAEFLE units", "Written exam practice (timed)", "Simulate oral pedagogical interview", "Review notes and correct errors"] },
];

const CHECKLIST_ALL = [
  { cat: "Linguistic", items: ["CECRL levels and can-do descriptors", "16 French vowels (oral + nasal)", "Passé composé vs imparfait distinction", "French negation forms", "Word formation (prefixes, suffixes)", "Complex sentence syntax analysis"] },
  { cat: "Didactic", items: ["Timeline of FLE methodologies", "7-step lesson sequence design", "Selecting & exploiting authentic documents", "Communicative vs actional approach", "Writing precise communicative objectives", "Differentiating for mixed-ability groups"] },
  { cat: "Assessment", items: ["Types of assessment (formative, summative, diagnostic)", "Reading and using DELF grids", "Creating a critériée assessment rubric", "Validity and reliability concepts"] },
  { cat: "Cultural", items: ["Francophone world geography (key countries)", "Intercultural competence (Byram's 5 savoirs)", "Using stereotypes constructively in class", "French institutions and daily life basics"] },
];

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────
const SYSTEM = `You are an expert, warm, and encouraging tutor for a busy mother studying for the DAEFLE (Diplôme d'Aptitude à l'Enseignement du Français Langue Étrangère). She is juggling baby care with study time, so your answers must be:
- Concise and clear — short paragraphs, not walls of text
- Structured with clear headers and bullet points
- Encouraging and supportive in tone
- Practical — give examples and memory tips
- In English unless explaining French linguistic concepts (then use French with translations)

You have deep expertise across: DAEFLE Unités 1–4, FLE pedagogy (communicative and actional approaches), CECRL/CEFR, French grammar and phonetics, French culture and civilisation, DELF/DALF assessment, and teacher training.

Reference key theorists where helpful: Hymes, Canale & Swain, Byram, Krashen, Vygotsky.

Current focus topic: {TOPIC}`;

// ─── NAV ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "home", label: "Tableau de bord", icon: "🏠" },
  { id: "notes", label: "Notes & Cours", icon: "📚" },
  { id: "tutor", label: "Tuteur IA", icon: "💬" },
  { id: "plan", label: "Mon Planning", icon: "🗓" },
  { id: "checklist", label: "Checklist", icon: "✅" },
  { id: "tools", label: "Outils d'étude", icon: "🛠" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const Card = ({ children, style = {} }) => (
  <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(28,43,74,0.06)", ...style }}>
    {children}
  </div>
);

const Tag = ({ children, color = C.gold, bg }) => (
  <span style={{ background: bg || color + "20", color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.04em" }}>
    {children}
  </span>
);

const Btn = ({ children, onClick, color = C.navy, outline, style = {}, disabled }) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: outline ? "transparent" : color,
    color: outline ? color : "#fff",
    border: `2px solid ${color}`,
    borderRadius: 10, padding: "9px 18px",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13,
    cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
    transition: "all 0.15s", ...style,
  }}>{children}</button>
);

// ─── HOME TAB ─────────────────────────────────────────────────────────────────
function HomeTab({ setTab, weeksDone, checkedItems, totalTasks, totalChecks }) {
  const progress = Math.round(((weeksDone + checkedItems) / (totalTasks + totalChecks)) * 100) || 0;
  const tips = [
    "🍼 Baby napping? Perfect time for a 15-min topic read!",
    "🎧 Put on Podcast Mode during feeding — listen while you nurse.",
    "⭐ Even 10 minutes of revision every day compounds fast.",
    "📌 Keep your checklist open — tick one item per study session.",
    "🧠 Read-Aloud Mode helps retain information hands-free.",
  ];
  const [tip] = useState(tips[Math.floor(Math.random() * tips.length)]);

  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", height: "100%" }}>
      {/* Welcome */}
      <div style={{ background: `linear-gradient(135deg, ${C.rose} 0%, ${C.gold} 100%)`, borderRadius: 20, padding: "32px 36px", color: "#fff", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 24, top: 16, fontSize: 72, opacity: 0.15 }}>🇫🇷</div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.12em", opacity: 0.9, marginBottom: 8 }}>BIENVENUE</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Mon Espace DAEFLE</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, opacity: 0.88, lineHeight: 1.6 }}>
          Your personal study companion for the Diplôme d'Aptitude à l'Enseignement du Français Langue Étrangère.
        </p>
      </div>

      {/* Tip */}
      <div style={{ background: C.amberLight, border: `1px solid ${C.amber}44`, borderRadius: 12, padding: "12px 18px", marginBottom: 24, display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: 20 }}>✨</span>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.amber, fontWeight: 500 }}>{tip}</p>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Study Units", value: "4", icon: "📖", color: C.rose },
          { label: "Topics", value: "11", icon: "📝", color: C.blue },
          { label: "Weeks Done", value: `${weeksDone}/8`, icon: "🗓", color: C.sage },
          { label: "Overall Progress", value: `${progress}%`, icon: "🎯", color: C.gold },
        ].map((s, i) => (
          <Card key={i} style={{ textAlign: "center", padding: 18 }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, marginTop: 2 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Progress bar */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: C.navy, fontSize: 14 }}>Global Progress</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: C.gold }}>{progress}%</span>
        </div>
        <div style={{ height: 10, background: C.parchment, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${C.rose}, ${C.gold})`, borderRadius: 10, transition: "width 0.5s ease" }} />
        </div>
      </Card>

      {/* Quick links */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { icon: "📚", label: "Start studying", desc: "Read DAEFLE notes", tab: "notes", color: C.rose },
          { icon: "💬", label: "Ask your tutor", desc: "AI-powered Q&A", tab: "tutor", color: C.blue },
          { icon: "🗓", label: "My timetable", desc: "Adjust study hours", tab: "plan", color: C.sage },
          { icon: "🛠", label: "Study tools", desc: "Podcast, flashcards & more", tab: "tools", color: C.lavender },
        ].map((q, i) => (
          <button key={i} onClick={() => setTab(q.tab)} style={{
            background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "18px 20px",
            cursor: "pointer", textAlign: "left", transition: "all 0.15s", display: "flex", gap: 14, alignItems: "center",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = q.color; e.currentTarget.style.boxShadow = `0 4px 16px ${q.color}22`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ fontSize: 28, flexShrink: 0 }}>{q.icon}</div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.navy, fontSize: 14 }}>{q.label}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", color: C.muted, fontSize: 12, marginTop: 2 }}>{q.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── NOTES TAB ───────────────────────────────────────────────────────────────
function NotesTab() {
  const [activeUnit, setActiveUnit] = useState(UNITS[0]);
  const [activeTopic, setActiveTopic] = useState(UNITS[0].topics[0]);
  const [readAloud, setReadAloud] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [view, setView] = useState("content"); // content | vocab | keypoints | visual
  const fileRef = useRef();
  const utterRef = useRef(null);

  const getFrenchFemaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    // Priority 1: French female voice explicitly named
    const frFemale = voices.find(v =>
      v.lang.startsWith("fr") && /female|femme|woman|féminin/i.test(v.name)
    );
    if (frFemale) return frFemale;
    // Priority 2: Common named French female voices (browser-specific)
    const namedFr = voices.find(v =>
      v.lang.startsWith("fr") && /amelie|audrey|thomas|alice|marie|julie|sophie|claire|léa|lea/i.test(v.name)
    );
    if (namedFr) return namedFr;
    // Priority 3: Any French voice
    const anyFr = voices.find(v => v.lang.startsWith("fr"));
    if (anyFr) return anyFr;
    // Fallback: default
    return null;
  };

  const startRead = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const text = activeTopic.content.replace(/[①②③④⑤⑥⑦⑧📌📊📈📝🏆🌍🌎🌊🇫🇷]/gu, "");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    u.rate = 0.88;
    u.pitch = 1.1;
    // Voices may not be loaded yet — wait if needed
    const trySetVoice = () => {
      const voice = getFrenchFemaleVoice();
      if (voice) u.voice = voice;
    };
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => { trySetVoice(); window.speechSynthesis.onvoiceschanged = null; };
    } else {
      trySetVoice();
    }
    u.onend = () => setSpeaking(false);
    utterRef.current = u;
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  const stopRead = () => { window.speechSynthesis.cancel(); setSpeaking(false); };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(f => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedFiles(prev => [...prev, { name: f.name, size: f.size, content: ev.target.result, type: f.type }]);
      };
      reader.readAsText(f);
    });
  };

  // CECRL chart data
  const cefrData = [
    { level: "A1", color: "#E8F5E9", border: "#4CAF50", label: "Breakthrough", width: 30 },
    { level: "A2", color: "#F1F8E9", border: "#8BC34A", label: "Waystage", width: 42 },
    { level: "B1", color: "#FFF8E1", border: "#FFC107", label: "Threshold", width: 56 },
    { level: "B2", color: "#FFF3E0", border: "#FF9800", label: "Vantage", width: 68 },
    { level: "C1", color: "#FCE4EC", border: "#E91E63", label: "Advanced", width: 82 },
    { level: "C2", color: "#F3E5F5", border: "#9C27B0", label: "Mastery", width: 100 },
  ];

  const methodTimeline = [
    { year: "19e s.", name: "Grammaire-Traduction", color: C.muted },
    { year: "1900s", name: "Méthode Directe", color: C.sage },
    { year: "1950s", name: "Audio-Orale / SGAV", color: C.blue },
    { year: "1980s", name: "Approche Communicative", color: C.rose },
    { year: "2001", name: "Approche Actionnelle", color: C.gold },
    { year: "Today", name: "Éclectique", color: C.lavender },
  ];

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      {/* Left sidebar: units + topics */}
      <div style={{ width: 220, borderRight: `1px solid ${C.border}`, overflowY: "auto", flexShrink: 0, background: C.parchment }}>
        {UNITS.map(unit => (
          <div key={unit.id}>
            <button onClick={() => { setActiveUnit(unit); setActiveTopic(unit.topics[0]); setActiveFile(null); }} style={{
              width: "100%", textAlign: "left", padding: "14px 16px", background: "none", border: "none",
              borderBottom: `1px solid ${C.border}`, cursor: "pointer",
              borderLeft: `4px solid ${activeUnit.id === unit.id ? unit.color : "transparent"}`,
              background: activeUnit.id === unit.id ? unit.light : "transparent",
            }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: unit.color, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 3 }}>{unit.code}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.navy, fontWeight: 600, lineHeight: 1.4 }}>{unit.icon} {unit.title}</p>
            </button>
            {activeUnit.id === unit.id && unit.topics.map(t => (
              <button key={t.id} onClick={() => { setActiveTopic(t); setActiveFile(null); }} style={{
                width: "100%", textAlign: "left", padding: "9px 16px 9px 24px",
                background: activeTopic.id === t.id && !activeFile ? "#fff" : "transparent",
                border: "none", borderBottom: `1px solid ${C.border}`, cursor: "pointer",
              }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: activeTopic.id === t.id && !activeFile ? unit.color : C.muted, fontWeight: activeTopic.id === t.id ? 600 : 400, lineHeight: 1.4 }}>{t.title}</p>
              </button>
            ))}
          </div>
        ))}

        {/* Uploaded files */}
        {uploadedFiles.length > 0 && (
          <div>
            <div style={{ padding: "10px 16px", background: C.gold + "22", borderBottom: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.gold, fontWeight: 700, letterSpacing: "0.1em" }}>MY UPLOADS</p>
            </div>
            {uploadedFiles.map((f, i) => (
              <button key={i} onClick={() => setActiveFile(f)} style={{
                width: "100%", textAlign: "left", padding: "9px 16px 9px 24px",
                background: activeFile === f ? C.goldLight : "transparent",
                border: "none", borderBottom: `1px solid ${C.border}`, cursor: "pointer",
              }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.amber, lineHeight: 1.4 }}>📄 {f.name.length > 20 ? f.name.slice(0, 20) + "…" : f.name}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
        {activeFile ? (
          <div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>📄</span>
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.navy }}>{activeFile.name}</h2>
                <Tag color={C.amber}>Your upload</Tag>
              </div>
            </div>
            <Card>
              <pre style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {activeFile.content || "Binary file — text extraction not available for this file type."}
              </pre>
            </Card>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <Tag color={activeUnit.color}>{activeUnit.code}</Tag>
                  <Tag color={C.muted}>DAEFLE</Tag>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: C.navy, marginBottom: 6 }}>{activeTopic.title}</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6, maxWidth: 500 }}>{activeTopic.summary}</p>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Btn onClick={speaking ? stopRead : startRead} color={C.rose} outline={!speaking} style={{ fontSize: 12 }}>
                  {speaking ? "⏹ Stop" : "🔊 Read Aloud"}
                </Btn>
                <label style={{
                  background: C.gold + "22", color: C.amber, border: `2px solid ${C.gold}44`,
                  borderRadius: 10, padding: "9px 14px", fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, fontSize: 12, cursor: "pointer",
                }}>
                  📎 Upload Notes
                  <input ref={fileRef} type="file" multiple accept=".txt,.pdf,.docx,.md" style={{ display: "none" }} onChange={handleUpload} />
                </label>
              </div>
            </div>

            {/* View toggle */}
            <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
              {[["content", "📖 Full Notes"], ["keypoints", "⭐ Key Points"], ["vocab", "🔤 Vocabulary"], ["visual", "📊 Visual Aid"]].map(([v, l]) => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding: "7px 14px", borderRadius: 20, border: `1.5px solid ${view === v ? activeUnit.color : C.border}`,
                  background: view === v ? activeUnit.light : C.white, color: view === v ? activeUnit.color : C.muted,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer",
                }}>{l}</button>
              ))}
            </div>

            {/* Content views */}
            {view === "content" && (
              <Card style={{ borderLeft: `4px solid ${activeUnit.color}` }}>
                <pre style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.text, lineHeight: 1.95, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {activeTopic.content}
                </pre>
              </Card>
            )}

            {view === "keypoints" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {activeTopic.keyPoints.map((kp, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: activeUnit.light, border: `1px solid ${activeUnit.color}33`, borderRadius: 12, padding: "14px 18px" }}>
                    <span style={{ background: activeUnit.color, color: "#fff", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.navy, lineHeight: 1.6 }}>{kp}</p>
                  </div>
                ))}
              </div>
            )}

            {view === "vocab" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {activeTopic.vocab.map((v, i) => (
                  <Card key={i} style={{ padding: "16px 20px" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: activeUnit.color, marginBottom: 4 }}>{v.fr}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>{v.en}</p>
                  </Card>
                ))}
              </div>
            )}

            {view === "visual" && (
              <div>
                {(activeTopic.id === "u1t2") && (
                  <Card>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: C.navy, marginBottom: 20 }}>CECRL Levels — Proficiency Staircase</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {cefrData.map((d, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: d.border, width: 28 }}>{d.level}</span>
                          <div style={{ flex: 1, height: 32, background: "#F5F5F5", borderRadius: 8, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${d.width}%`, background: d.border + "55", border: `2px solid ${d.border}`, borderRadius: 8, display: "flex", alignItems: "center", paddingLeft: 12, transition: "width 1s ease", animation: `growBar 1s ${i * 0.1}s ease both` }}>
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.navy, fontWeight: 500 }}>{d.label}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                {(activeTopic.id === "u2t1") && (
                  <Card>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: C.navy, marginBottom: 20 }}>FLE Methodologies — Timeline</h3>
                    <div style={{ position: "relative", paddingLeft: 20 }}>
                      <div style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 2, background: C.border }} />
                      {methodTimeline.map((m, i) => (
                        <div key={i} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start", animation: `fadeUp 0.4s ${i * 0.1}s ease both` }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: m.color, flexShrink: 0, border: `3px solid #fff`, boxShadow: `0 0 0 2px ${m.color}`, zIndex: 1 }} />
                          <div style={{ background: m.color + "15", border: `1px solid ${m.color}44`, borderRadius: 10, padding: "10px 14px" }}>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: m.color, fontWeight: 700 }}>{m.year}</span>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.navy, fontWeight: 600, marginTop: 2 }}>{m.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                {!["u1t2", "u2t1"].includes(activeTopic.id) && (
                  <Card style={{ textAlign: "center", padding: 40 }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: C.muted, fontSize: 14 }}>Interactive visual for this topic coming soon. Switch to Full Notes or Key Points for now.</p>
                  </Card>
                )}
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {(() => {
                const allTopics = UNITS.flatMap(u => u.topics.map(t => ({ ...t, unit: u })));
                const idx = allTopics.findIndex(t => t.id === activeTopic.id);
                return <>
                  {idx > 0 && <Btn outline color={activeUnit.color} onClick={() => { const prev = allTopics[idx - 1]; setActiveUnit(UNITS.find(u => u.id === prev.unit.id)); setActiveTopic(prev); }}>← Previous</Btn>}
                  {idx < allTopics.length - 1 && <Btn color={activeUnit.color} onClick={() => { const next = allTopics[idx + 1]; setActiveUnit(UNITS.find(u => u.id === next.unit.id)); setActiveTopic(next); }}>Next →</Btn>}
                </>;
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TUTOR TAB ────────────────────────────────────────────────────────────────
function TutorTab() {
  const topics = [
    { id: "daefle", label: "DAEFLE Overview", color: C.rose },
    { id: "pedagogy", label: "Pedagogy & Methods", color: C.blue },
    { id: "grammar", label: "Grammar & Linguistics", color: C.lavender },
    { id: "culture", label: "Culture & Interculturel", color: C.sage },
    { id: "exam", label: "Exams & Assessment", color: C.gold },
  ];
  const [topic, setTopic] = useState(topics[0]);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const endRef = useRef(); const inputRef = useRef();
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim(); setInput(""); setLoading(true);
    const um = { role: "user", content: text };
    const uh = [...history, um];
    setMsgs(p => [...p, { type: "user", text }]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM.replace("{TOPIC}", topic.label), messages: uh }),
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Sorry, no response.";
      setHistory([...uh, { role: "assistant", content: reply }]);
      setMsgs(p => [...p, { type: "assistant", text: reply }]);
    } catch { setMsgs(p => [...p, { type: "assistant", text: "Something went wrong. Please try again." }]); }
    finally { setLoading(false); inputRef.current?.focus(); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Topic row */}
      <div style={{ padding: "12px 24px", borderBottom: `1px solid ${C.border}`, background: C.parchment, overflowX: "auto", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8, minWidth: "max-content" }}>
          {topics.map(t => (
            <button key={t.id} onClick={() => { setTopic(t); setMsgs([]); setHistory([]); }} style={{
              padding: "7px 16px", borderRadius: 20, border: `1.5px solid ${topic.id === t.id ? t.color : C.border}`,
              background: topic.id === t.id ? t.color + "18" : C.white, color: topic.id === t.id ? t.color : C.muted,
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 18 }}>
        {msgs.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.navy, marginBottom: 8 }}>Bonjour! I'm your DAEFLE tutor.</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: C.muted, fontSize: 14, marginBottom: 20 }}>Ask me anything about {topic.label}. I know you're busy — I'll keep answers concise and clear.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 420, margin: "0 auto" }}>
              {["What are the 4 DAEFLE units?", "Explain the actional approach simply", "Give me a memory trick for past tenses", "What is Byram's intercultural model?"].map((q, i) => (
                <button key={i} onClick={() => { setInput(q); inputRef.current?.focus(); }} style={{
                  background: C.parchment, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.navy, cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = topic.color}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                >{q}</button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: m.type === "user" ? "flex-end" : "flex-start" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, fontWeight: 600 }}>{m.type === "user" ? "You" : "Tuteur IA"}</span>
            <div style={{
              maxWidth: "80%", padding: "14px 18px", borderRadius: m.type === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: m.type === "user" ? topic.color : C.white,
              color: m.type === "user" ? "#fff" : C.text,
              border: m.type === "user" ? "none" : `1px solid ${C.border}`,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.75,
              boxShadow: "0 2px 8px rgba(28,43,74,0.06)", whiteSpace: "pre-wrap",
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, fontWeight: 600 }}>Tuteur IA</span>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: "16px 16px 16px 4px", padding: "16px 20px", display: "flex", gap: 6 }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: topic.color, display: "inline-block", animation: `bounce 1s ${i * 0.15}s infinite ease-in-out` }} />)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "16px 24px", borderTop: `1px solid ${C.border}`, background: C.parchment }}>
        {msgs.length > 0 && <button onClick={() => { setMsgs([]); setHistory([]); }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, background: "none", border: "none", cursor: "pointer", marginBottom: 10, textDecoration: "underline" }}>Clear conversation</button>}
        <div style={{ display: "flex", gap: 10 }}>
          <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder={`Ask about ${topic.label}...`}
            style={{ flex: 1, border: `1.5px solid ${C.border}`, background: C.white, padding: "11px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.text, outline: "none", resize: "none", height: 48, borderRadius: 12, transition: "border-color 0.15s" }}
            onFocus={e => e.target.style.borderColor = topic.color}
            onBlur={e => e.target.style.borderColor = C.border}
          />
          <Btn onClick={send} disabled={loading || !input.trim()} color={topic.color} style={{ height: 48, borderRadius: 12 }}>Envoyer</Btn>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, marginTop: 6 }}>Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}

// ─── PLAN TAB ─────────────────────────────────────────────────────────────────
function PlanTab({ onProgressChange }) {
  const [hoursPerDay, setHoursPerDay] = useState(1);
  const [weeksDone, setWeeksDone] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [generated, setGenerated] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [babyNapSlots, setBabyNapSlots] = useState(["Morning nap (9–10am)", "Afternoon nap (1–3pm)"]);
  const [customNap, setCustomNap] = useState("");

  useEffect(() => { onProgressChange(Object.values(weeksDone).filter(Boolean).length); }, [weeksDone]);

  const generateTimetable = () => {
    const sessionsPerDay = Math.max(1, Math.floor(hoursPerDay));
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const slots = babyNapSlots.slice(0, Math.min(babyNapSlots.length, sessionsPerDay));
    const sched = STUDY_WEEKS_TEMPLATE.map((w, wi) => ({
      ...w,
      dailyPlan: days.map(d => ({ day: d, slots: slots.map((s, si) => ({ slot: s, task: w.tasks[si % w.tasks.length] })) })),
    }));
    setSchedule(sched);
    setGenerated(true);
  };

  const doneCount = Object.values(weeksDone).filter(Boolean).length;

  return (
    <div style={{ overflowY: "auto", padding: "28px 32px", height: "100%" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: C.navy, marginBottom: 6 }}>Mon Planning d'Étude</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, marginBottom: 24 }}>Enter your available hours and baby nap slots — I'll build your personalised timetable.</p>

      {/* Setup card */}
      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.navy, fontSize: 15, marginBottom: 16 }}>⚙️ Adjust Your Schedule</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.navy, fontWeight: 600, display: "block", marginBottom: 8 }}>
              Study hours per day: <strong style={{ color: C.rose }}>{hoursPerDay}h</strong>
            </label>
            <input type="range" min={0.5} max={4} step={0.5} value={hoursPerDay} onChange={e => setHoursPerDay(Number(e.target.value))}
              style={{ width: "100%", accentColor: C.rose }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted }}>30 min</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted }}>4 hours</span>
            </div>
          </div>
          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.navy, fontWeight: 600, display: "block", marginBottom: 8 }}>Baby nap / study slots:</label>
            {babyNapSlots.map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: C.roseLight, borderRadius: 8, padding: "6px 10px", marginBottom: 5 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.rose }}>🍼 {s}</span>
                <button onClick={() => setBabyNapSlots(p => p.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 14 }}>✕</button>
              </div>
            ))}
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <input value={customNap} onChange={e => setCustomNap(e.target.value)} placeholder="Add slot (e.g. Evening 8pm)" style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: "none" }} />
              <button onClick={() => { if (customNap.trim()) { setBabyNapSlots(p => [...p, customNap.trim()]); setCustomNap(""); } }} style={{ background: C.rose, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>+</button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <Btn onClick={generateTimetable} color={C.rose} style={{ width: "100%" }}>✨ Generate My Timetable</Btn>
        </div>
      </Card>

      {/* Progress */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.navy, fontSize: 14 }}>8-Week Progress</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: C.gold, fontWeight: 700 }}>{doneCount}/8 weeks</span>
        </div>
        <div style={{ height: 10, background: C.parchment, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(doneCount / 8) * 100}%`, background: `linear-gradient(90deg, ${C.rose}, ${C.gold})`, borderRadius: 10, transition: "width 0.5s" }} />
        </div>
      </Card>

      {/* Weekly plan */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {STUDY_WEEKS_TEMPLATE.map((w, i) => {
          const unit = UNITS.find(u => u.id === w.unit);
          return (
            <div key={i} style={{ background: C.white, border: `1px solid ${weeksDone[i] ? unit.color + "66" : C.border}`, borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s" }}>
              <button onClick={() => setExpanded(expanded === i ? null : i)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "16px 20px",
                background: weeksDone[i] ? unit.light : C.white, border: "none", cursor: "pointer", textAlign: "left",
              }}>
                <Tag color={unit.color}>{w.unit.toUpperCase().replace("U", "Unit ")}</Tag>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>WEEK {w.week}</span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: weeksDone[i] ? C.muted : C.navy, textDecoration: weeksDone[i] ? "line-through" : "none" }}>{w.theme}</p>
                </div>
                <span style={{ color: C.muted, fontSize: 12 }}>{expanded === i ? "▲" : "▼"}</span>
                <input type="checkbox" checked={!!weeksDone[i]} onChange={e => { e.stopPropagation(); setWeeksDone(p => ({ ...p, [i]: e.target.checked })); }}
                  style={{ width: 16, height: 16, cursor: "pointer", accentColor: unit.color, flexShrink: 0 }} onClick={e => e.stopPropagation()} />
              </button>
              {expanded === i && (
                <div style={{ borderTop: `1px solid ${C.border}`, padding: "16px 20px" }}>
                  <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>TASKS THIS WEEK</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: generated ? 16 : 0 }}>
                    {w.tasks.map((task, j) => (
                      <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: unit.color, fontWeight: 700, flexShrink: 0 }}>→</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.text, lineHeight: 1.6 }}>{task}</span>
                      </div>
                    ))}
                  </div>
                  {generated && schedule[i] && (
                    <div>
                      <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>YOUR DAILY SLOTS ({hoursPerDay}h/day)</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
                        {schedule[i].dailyPlan.map((d, di) => (
                          <div key={di} style={{ background: unit.light, border: `1px solid ${unit.color}44`, borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, color: unit.color, marginBottom: 4 }}>{d.day}</p>
                            {d.slots.map((s, si) => (
                              <p key={si} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.navy, lineHeight: 1.4 }}>🍼 {s.slot.split(" ")[0]}</p>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── CHECKLIST TAB ────────────────────────────────────────────────────────────
function ChecklistTab({ onProgressChange }) {
  const total = CHECKLIST_ALL.reduce((a, s) => a + s.items.length, 0);
  const [checked, setChecked] = useState({});
  const done = Object.values(checked).filter(Boolean).length;
  useEffect(() => { onProgressChange(done); }, [done]);
  const toggle = k => setChecked(p => ({ ...p, [k]: !p[k] }));

  const unitColors = [C.rose, C.blue, C.sage, C.lavender];

  return (
    <div style={{ overflowY: "auto", padding: "28px 32px", height: "100%" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: C.navy, marginBottom: 6 }}>Checklist de Compétences</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, marginBottom: 20 }}>Tick each competency as you master it. Aim for 100% before your exam!</p>
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.navy }}>Overall Mastery</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: C.sage, fontWeight: 700 }}>{done}/{total}</span>
        </div>
        <div style={{ height: 10, background: C.parchment, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(done / total) * 100}%`, background: `linear-gradient(90deg, ${C.sage}, ${C.gold})`, borderRadius: 10, transition: "width 0.5s" }} />
        </div>
      </Card>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {CHECKLIST_ALL.map((section, si) => {
          const color = unitColors[si];
          const secDone = section.items.filter((_, ii) => checked[`${si}-${ii}`]).length;
          return (
            <Card key={si}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color, fontSize: 15 }}>{section.cat}</h3>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>{secDone}/{section.items.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {section.items.map((item, ii) => {
                  const key = `${si}-${ii}`;
                  return (
                    <label key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", padding: "8px 10px", borderRadius: 8, transition: "background 0.12s", background: checked[key] ? color + "10" : "transparent" }}
                      onMouseEnter={e => e.currentTarget.style.background = color + "0E"}
                      onMouseLeave={e => e.currentTarget.style.background = checked[key] ? color + "10" : "transparent"}
                    >
                      <input type="checkbox" checked={!!checked[key]} onChange={() => toggle(key)}
                        style={{ marginTop: 2, width: 15, height: 15, cursor: "pointer", accentColor: color, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: checked[key] ? C.muted : C.text, textDecoration: checked[key] ? "line-through" : "none", lineHeight: 1.6, transition: "all 0.15s" }}>{item}</span>
                    </label>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
      {done === total && (
        <Card style={{ marginTop: 24, textAlign: "center", background: `linear-gradient(135deg, ${C.sageLight}, ${C.goldLight})`, border: `2px solid ${C.gold}` }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: C.navy }}>Bravo! Vous êtes prête pour le DAEFLE!</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, marginTop: 6 }}>All competencies mastered. Bonne chance!</p>
        </Card>
      )}
    </div>
  );
}

// ─── TOOLS TAB ───────────────────────────────────────────────────────────────
function ToolsTab() {
  const [activeTool, setActiveTool] = useState("podcast");
  const [podcastTopic, setPodcastTopic] = useState("");
  const [podcastScript, setPodcastScript] = useState("");
  const [podcastLoading, setPodcastLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [quizQ, setQuizQ] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");
  const [quizLoading, setQuizLoading] = useState(false);
  const [glossarySearch, setGlossarySearch] = useState("");
  const [pomodoro, setPomodoro] = useState({ running: false, seconds: 25 * 60, mode: "work" });
  const pomRef = useRef(null);

  // Pomodoro
  useEffect(() => {
    if (pomodoro.running) {
      pomRef.current = setInterval(() => {
        setPomodoro(p => {
          if (p.seconds <= 1) {
            clearInterval(pomRef.current);
            const next = p.mode === "work" ? "break" : "work";
            return { running: false, seconds: next === "work" ? 25 * 60 : 5 * 60, mode: next };
          }
          return { ...p, seconds: p.seconds - 1 };
        });
      }, 1000);
    } else clearInterval(pomRef.current);
    return () => clearInterval(pomRef.current);
  }, [pomodoro.running]);

  const pomMins = String(Math.floor(pomodoro.seconds / 60)).padStart(2, "0");
  const pomSecs = String(pomodoro.seconds % 60).padStart(2, "0");

  // Flashcards
  const flashcards = UNITS.flatMap(u => u.topics.flatMap(t => t.vocab.map(v => ({ ...v, unit: u.title, color: u.color }))));

  // Glossary
  const allVocab = UNITS.flatMap(u => u.topics.flatMap(t => t.vocab.map(v => ({ ...v, topic: t.title, unit: u.title, color: u.color }))));
  const filtered = glossarySearch ? allVocab.filter(v => v.fr.toLowerCase().includes(glossarySearch.toLowerCase()) || v.en.toLowerCase().includes(glossarySearch.toLowerCase())) : allVocab;

  // Podcast
  const generatePodcast = async () => {
    if (!podcastTopic.trim()) return;
    setPodcastLoading(true); setPodcastScript("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          messages: [{ role: "user", content: `Write a warm, conversational podcast-style script (3–4 minutes when read aloud) about this DAEFLE topic: "${podcastTopic}". Use a friendly host voice. No music cues needed. Include: a hook, 3 key points with examples, and a summary. Keep it engaging for a busy mum studying in short bursts. English mainly, French terms with translations.` }],
        }),
      });
      const data = await res.json();
      setPodcastScript(data.content?.map(b => b.text || "").join("") || "Error generating script.");
    } catch { setPodcastScript("Error generating podcast. Please try again."); }
    setPodcastLoading(false);
  };

  const getFrenchFemaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const frFemale = voices.find(v =>
      v.lang.startsWith("fr") && /female|femme|woman|féminin/i.test(v.name)
    );
    if (frFemale) return frFemale;
    const namedFr = voices.find(v =>
      v.lang.startsWith("fr") && /amelie|audrey|alice|marie|julie|sophie|claire|léa|lea/i.test(v.name)
    );
    if (namedFr) return namedFr;
    return voices.find(v => v.lang.startsWith("fr")) || null;
  };

  const speakScript = () => {
    if (!podcastScript) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(podcastScript);
    u.lang = "fr-FR";
    u.rate = 0.88;
    u.pitch = 1.1;
    const trySetVoice = () => {
      const voice = getFrenchFemaleVoice();
      if (voice) u.voice = voice;
    };
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => { trySetVoice(); window.speechSynthesis.onvoiceschanged = null; };
    } else {
      trySetVoice();
    }
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  // Quiz
  const generateQuiz = async () => {
    setQuizLoading(true); setQuizAnswer(""); setQuizFeedback("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 400,
          messages: [{ role: "user", content: `Generate one DAEFLE exam-style short-answer question on a random topic from: Unité 1 (compétence communicative, CECRL, phonétique), Unité 2 (méthodologies, séquence pédagogique, évaluation), Unité 3 (francophonie, interculturel), Unité 4 (grammaire, syntaxe). Format as JSON: {"question": "...", "hint": "...", "model_answer": "..."}. JSON only, no preamble.` }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "{}";
      const clean = text.replace(/```json|```/g, "").trim();
      setQuizQ(JSON.parse(clean));
    } catch { setQuizQ({ question: "What are the four components of communicative competence according to Canale & Swain?", hint: "Think: grammatical, sociolinguistic...", model_answer: "Grammatical, sociolinguistic, discourse, and strategic competence." }); }
    setQuizLoading(false);
  };

  const checkAnswer = async () => {
    if (!quizAnswer.trim() || !quizQ) return;
    setQuizLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 300,
          messages: [{ role: "user", content: `DAEFLE question: "${quizQ.question}"\nModel answer: "${quizQ.model_answer}"\nStudent answer: "${quizAnswer}"\n\nGive brief, warm feedback (2–3 sentences). Say what was correct, what was missing, and give a mark out of 5. Be encouraging.` }],
        }),
      });
      const data = await res.json();
      setQuizFeedback(data.content?.map(b => b.text || "").join("") || "");
    } catch { setQuizFeedback("Could not generate feedback. Please try again."); }
    setQuizLoading(false);
  };

  const tools = [
    { id: "podcast", icon: "🎙", label: "Podcast Mode" },
    { id: "flashcards", icon: "🃏", label: "Flashcards" },
    { id: "quiz", icon: "❓", label: "Practice Quiz" },
    { id: "glossary", icon: "📖", label: "Glossary" },
    { id: "pomodoro", icon: "🍅", label: "Pomodoro Timer" },
    { id: "tips", icon: "💡", label: "Study Tips" },
  ];

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: 180, borderRight: `1px solid ${C.border}`, background: C.parchment, overflowY: "auto", flexShrink: 0, padding: "16px 12px" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>STUDY TOOLS</p>
        {tools.map(t => (
          <button key={t.id} onClick={() => setActiveTool(t.id)} style={{
            width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 10, border: "none",
            background: activeTool === t.id ? C.rose + "18" : "transparent", cursor: "pointer",
            display: "flex", gap: 10, alignItems: "center", marginBottom: 4, transition: "background 0.15s",
          }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: activeTool === t.id ? 700 : 400, color: activeTool === t.id ? C.rose : C.navy }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tool panel */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>

        {/* PODCAST */}
        {activeTool === "podcast" && (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: C.navy, marginBottom: 6 }}>🎙 Podcast Study Mode</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, marginBottom: 20 }}>
              Generate a spoken podcast script on any DAEFLE topic. Perfect for feeding time, walks with the pram, or hands-free revision.
            </p>
            <Card style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: C.navy, display: "block", marginBottom: 8 }}>Topic or question:</label>
              <input value={podcastTopic} onChange={e => setPodcastTopic(e.target.value)}
                placeholder="e.g. The actional approach in FLE teaching"
                style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none", marginBottom: 12 }} />
              <Btn onClick={generatePodcast} disabled={podcastLoading || !podcastTopic.trim()} color={C.rose} style={{ width: "100%" }}>
                {podcastLoading ? "Generating..." : "🎙 Generate Podcast Script"}
              </Btn>
            </Card>
            {podcastScript && (
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.navy }}>Your Podcast Script</h3>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Btn onClick={speaking ? () => { window.speechSynthesis.cancel(); setSpeaking(false); } : speakScript} color={C.rose} outline={!speaking} style={{ fontSize: 12 }}>
                      {speaking ? "⏹ Stop" : "▶ Play Aloud"}
                    </Btn>
                  </div>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.text, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{podcastScript}</p>
              </Card>
            )}
          </div>
        )}

        {/* FLASHCARDS */}
        {activeTool === "flashcards" && (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: C.navy, marginBottom: 6 }}>🃏 Flashcards</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, marginBottom: 24 }}>
              Click the card to reveal the answer. Use the arrows to navigate. {fcIndex + 1} of {flashcards.length}
            </p>
            <div style={{ perspective: 1000, maxWidth: 480, margin: "0 auto 24px" }}>
              <div onClick={() => setFcFlipped(p => !p)} style={{
                width: "100%", height: 200, position: "relative", cursor: "pointer",
                transformStyle: "preserve-3d", transition: "transform 0.5s",
                transform: fcFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}>
                {/* Front */}
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${flashcards[fcIndex].color}22, ${flashcards[fcIndex].color}44)`, border: `2px solid ${flashcards[fcIndex].color}`, borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backfaceVisibility: "hidden", padding: 24 }}>
                  <Tag color={flashcards[fcIndex].color}>{flashcards[fcIndex].unit}</Tag>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: C.navy, marginTop: 16, textAlign: "center" }}>{flashcards[fcIndex].fr}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, marginTop: 12 }}>Click to reveal</p>
                </div>
                {/* Back */}
                <div style={{ position: "absolute", inset: 0, background: C.white, border: `2px solid ${flashcards[fcIndex].color}`, borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backfaceVisibility: "hidden", transform: "rotateY(180deg)", padding: 24 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: flashcards[fcIndex].color, textAlign: "center" }}>{flashcards[fcIndex].en}</p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Btn outline color={C.navy} onClick={() => { setFcIndex(p => Math.max(0, p - 1)); setFcFlipped(false); }}>← Previous</Btn>
              <Btn color={C.navy} onClick={() => { setFcIndex(p => Math.min(flashcards.length - 1, p + 1)); setFcFlipped(false); }}>Next →</Btn>
            </div>
            <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
              {flashcards.map((_, i) => (
                <button key={i} onClick={() => { setFcIndex(i); setFcFlipped(false); }} style={{
                  width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer",
                  background: i === fcIndex ? C.rose : C.border, padding: 0,
                }} />
              ))}
            </div>
          </div>
        )}

        {/* QUIZ */}
        {activeTool === "quiz" && (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: C.navy, marginBottom: 6 }}>❓ Practice Quiz</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, marginBottom: 20 }}>AI-generated DAEFLE-style questions with instant feedback.</p>
            {!quizQ ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>❓</div>
                <Btn onClick={generateQuiz} disabled={quizLoading} color={C.blue} style={{ fontSize: 15, padding: "12px 32px" }}>
                  {quizLoading ? "Generating..." : "Generate a Question"}
                </Btn>
              </div>
            ) : (
              <div>
                <Card style={{ marginBottom: 16, borderLeft: `4px solid ${C.blue}` }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.blue, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 8 }}>QUESTION</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.navy, lineHeight: 1.7, marginBottom: 10 }}>{quizQ.question}</p>
                  {quizQ.hint && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, fontStyle: "italic" }}>💡 Hint: {quizQ.hint}</p>}
                </Card>
                <textarea value={quizAnswer} onChange={e => setQuizAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, resize: "vertical", minHeight: 100, outline: "none", marginBottom: 12 }} />
                <div style={{ display: "flex", gap: 10 }}>
                  <Btn onClick={checkAnswer} disabled={quizLoading || !quizAnswer.trim()} color={C.blue} style={{ flex: 1 }}>
                    {quizLoading ? "Checking..." : "Submit Answer"}
                  </Btn>
                  <Btn outline color={C.muted} onClick={() => { setQuizQ(null); setQuizAnswer(""); setQuizFeedback(""); }}>New Question</Btn>
                </div>
                {quizFeedback && (
                  <Card style={{ marginTop: 16, background: C.sageLight, border: `1px solid ${C.sage}44` }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.sage, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 8 }}>FEEDBACK</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.text, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{quizFeedback}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, marginTop: 10, fontStyle: "italic" }}>Model answer: {quizQ.model_answer}</p>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}

        {/* GLOSSARY */}
        {activeTool === "glossary" && (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: C.navy, marginBottom: 6 }}>📖 FLE Glossary</h2>
            <input value={glossarySearch} onChange={e => setGlossarySearch(e.target.value)}
              placeholder="Search French or English term..."
              style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "11px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none", marginBottom: 20 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {filtered.map((v, i) => (
                <Card key={i} style={{ padding: "14px 18px", borderLeft: `3px solid ${v.color}` }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: v.color, marginBottom: 3 }}>{v.fr}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.text, marginBottom: 4 }}>{v.en}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted }}>{v.topic}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* POMODORO */}
        {activeTool === "pomodoro" && (
          <div style={{ textAlign: "center", paddingTop: 20 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: C.navy, marginBottom: 6 }}>🍅 Pomodoro Timer</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, marginBottom: 32 }}>25 minutes focus, 5 minutes break. Perfect for busy mums — one nap = one Pomodoro!</p>
            <div style={{ width: 200, height: 200, borderRadius: "50%", background: pomodoro.mode === "work" ? `linear-gradient(135deg, ${C.rose}, ${C.gold})` : `linear-gradient(135deg, ${C.sage}, ${C.blue})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", boxShadow: "0 8px 32px rgba(212,96,122,0.25)" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{pomMins}:{pomSecs}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", opacity: 0.85, marginTop: 4 }}>{pomodoro.mode === "work" ? "🧠 Focus" : "☕ Break"}</p>
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Btn onClick={() => setPomodoro(p => ({ ...p, running: !p.running }))} color={C.rose} style={{ padding: "12px 28px", fontSize: 15 }}>
                {pomodoro.running ? "⏸ Pause" : "▶ Start"}
              </Btn>
              <Btn outline color={C.muted} onClick={() => { setPomodoro({ running: false, seconds: 25 * 60, mode: "work" }); }}>↺ Reset</Btn>
            </div>
            <Card style={{ marginTop: 32, maxWidth: 360, margin: "32px auto 0" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.navy, marginBottom: 8 }}>Baby-friendly study rhythm</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>Morning nap (45–60 min) = 1–2 Pomodoros on Notes or AI Tutor. Afternoon nap = Podcast Mode or Flashcards. Evening = Checklist review, 10 min max.</p>
            </Card>
          </div>
        )}

        {/* TIPS */}
        {activeTool === "tips" && (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: C.navy, marginBottom: 6 }}>💡 Study Tips for Busy Mums</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, marginBottom: 24 }}>Practical strategies for studying around a baby's schedule.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "🍼", title: "Nap-time sprints", tip: "Even 20 minutes of focused study during nap time is enough for one topic. Use the Pomodoro timer to stay disciplined.", color: C.rose },
                { icon: "🎧", title: "Hands-free learning", tip: "Use Podcast Mode and Read Aloud during feeding, nappy changes, or walks with the pram. Your ears are always free.", color: C.blue },
                { icon: "🃏", title: "One flashcard at a time", tip: "Keep the Flashcards tab open. One card per feed is 6–8 vocab items a day — 50+ per week!", color: C.sage },
                { icon: "📌", title: "Micro-revision", tip: "Tick one checklist item per session. Visual progress is motivating and keeps you focused on what matters.", color: C.lavender },
                { icon: "📅", title: "Plan for flexibility", tip: "Set your hours-per-day to match your lightest day, not your best. This way you always feel ahead, not behind.", color: C.gold },
                { icon: "🧠", title: "Spaced repetition", tip: "Revisit topics after 1 day, then 3 days, then 1 week. The AI Tutor quiz function helps with this naturally.", color: C.amber },
                { icon: "😴", title: "Protect your sleep", tip: "A rested brain retains 30% more. Don't study when you're exhausted — rest is part of your revision strategy.", color: C.muted },
                { icon: "🤝", title: "Ask for help", tip: "The AI Tutor is available any time. Use it for quick explanations, not just full study sessions.", color: C.rose },
              ].map((t, i) => (
                <Card key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", borderLeft: `4px solid ${t.color}` }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{t.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.navy, fontSize: 14, marginBottom: 4 }}>{t.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{t.tip}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("home");
  const [weeksDone, setWeeksDone] = useState(0);
  const [checkedDone, setCheckedDone] = useState(0);
  const totalTasks = 8;
  const totalChecks = CHECKLIST_ALL.reduce((a, s) => a + s.items.length, 0);

  return (
    <div style={{ height: "100vh", background: C.cream, display: "flex", flexDirection: "column", fontFamily: "Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
        @keyframes growBar { from { width: 0%; } }
      `}</style>

      {/* Header */}
      <header style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "12px 28px", display: "flex", alignItems: "center", gap: 16, flexShrink: 0, boxShadow: "0 2px 12px rgba(28,43,74,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🇫🇷</div>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: C.navy }}>Mon Espace DAEFLE</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted }}>Diplôme d'Aptitude à l'Enseignement du FLE</p>
          </div>
        </div>
        <nav style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "8px 14px", borderRadius: 10, border: "none", cursor: "pointer",
              background: tab === t.id ? `linear-gradient(135deg, ${C.rose}22, ${C.gold}22)` : "transparent",
              color: tab === t.id ? C.rose : C.muted, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: tab === t.id ? 700 : 400,
              borderBottom: tab === t.id ? `2px solid ${C.rose}` : "2px solid transparent",
              transition: "all 0.15s",
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {tab === "home" && <HomeTab setTab={setTab} weeksDone={weeksDone} checkedItems={checkedDone} totalTasks={totalTasks} totalChecks={totalChecks} />}
        {tab === "notes" && <NotesTab />}
        {tab === "tutor" && <TutorTab />}
        {tab === "plan" && <PlanTab onProgressChange={setWeeksDone} />}
        {tab === "checklist" && <ChecklistTab onProgressChange={setCheckedDone} />}
        {tab === "tools" && <ToolsTab />}
      </div>
    </div>
  );
}
