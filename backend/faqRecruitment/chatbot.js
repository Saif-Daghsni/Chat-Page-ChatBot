import axios from "axios";
import Fuse from "fuse.js";
import faqRecruitment from "./faqAchat.js";

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .trim();
}

const normalizedFaq = faqRecruitment.map((item) => ({
  ...item,
  question: normalize(item.question),
  keywords: item.keywords.map((k) => normalize(k)),
}));

const fuse = new Fuse(normalizedFaq, {
  keys: ["question", "keywords"],
  threshold: 0.4,
  includeScore: true,
});

function findAnswer(question) {
  const results = fuse.search(question);
  const goodResults = results.filter((r) => r.score <= 0.4);
  if (goodResults.length === 0) return null;

  let bestAnswer = goodResults[0].item.answer;
  let maxLength = bestAnswer.length;

  for (const r of goodResults) {
    if (r.item.answer.length > maxLength) {
      bestAnswer = r.item.answer;
      maxLength = r.item.answer.length;
    }
  }

  return bestAnswer;
}

const askChatbot = async (req, res) => {
  const userMessageRaw = req.body.message || "";
  const userMessage = normalize(userMessageRaw);

  const faqAnswer = findAnswer(userMessage);

  if (faqAnswer) {
    return res.json({ reply: faqAnswer });
  }

  // Sinon appel au chatbot AI
  const messages = [
    {
      role: "system",
      content: `
      Tu es un assistant expert de l'interface "Direction d'Achat" d'une application de business game.
      
      L'interface est composée de trois sections principales. Tu dois répondre aux questions des utilisateurs uniquement si elles concernent l’une de ces trois sections :
      
      ---
      
      1. **Besoin en Recrutement** :
         - Cette section permet de gérer les recrutements par atelier.
         - Un **besoin en recrutement** correspond à une demande de recrutement d'un certain **effectif** (nombre de personnes) avec une **qualification** spécifique.
         - Les types de qualification sont : **base**, **intermédiaire** et **avancée**.
         - Si une qualification est choisie, alors une **formation associée** peut être sélectionnée.
         - Si **aucune qualification** n’est choisie, **la formation ne peut pas être sélectionnée**.
         - Le **coût** est calculé en fonction de la qualification et de la formation.
         - Les boutons **+** et **-** permettent d’ajuster dynamiquement l’effectif.
      
      ---
      
      2. **Choix des Fournisseurs** :
         - Les utilisateurs peuvent choisir des fournisseurs pour les matières premières.
         - Les fournisseurs sont répartis en trois types : **internationaux**, **nationaux** et **concurrents**.
         - Chaque fournisseur a des caractéristiques : **nom**, **type**, **qualité**, **coût**, **délai**, etc.
         - Un bouton **Sélectionner** permet de valider un fournisseur.
      
      ---
      
      3. **Assurances & Logiciels** :
         - Cette section permet d’ajouter des **assurances** ou des **logiciels** pour les ateliers.
         - Chaque choix a un **coût** et apporte des **bénéfices** (réduction de risques, amélioration de la production).
         - Ces choix sont valides pour un **round** donné.
      
      ---
      
      4. **Calendrier** :
         - Le calendrier affiche les **dates clés** et les **rounds** du business game.
         - Il permet aux utilisateurs de **suivre l’évolution** du jeu, de savoir quand **soumettre** leurs décisions, et de se **préparer aux étapes suivantes**.
         - Il sert également à **organiser les actions** à réaliser dans chaque round.
      
      ---
      
      5. **Sidebar** :
         - La sidebar est le **menu de navigation principal** de la plateforme.
         - Elle regroupe toutes les **directions** du jeu classées en trois grandes catégories :
           - **Activités de soutien** :ce sont les fonctions **transversales** qui soutiennent l'activité principale de l'entreprise. Exemples : Ressources Humaines, RSE, R&D, etc.
           - **Activités principales** :     - **Activités Principales** : ce sont les **fonctions cœur de métier** qui génèrent directement de la valeur pour l’entreprise. Exemples : Production, Logistique, Qualité, etc.
            - **Finances**, **Banques**, **Bourse**, **Chat**, etc. complètent la navigation.
         - On y trouve aussi des raccourcis vers :
           - Le **dashboard global**
           - Les **banques**
           - La **bourse**
           - La **calculatrice**:- **Calendrier** : il permet de suivre l’évolution du jeu **par round** (ou période de décision). Les décisions prises dans chaque round influencent les résultats financiers et opérationnels des suivants.
            , le **chat**, et les **jeux**
         - L’utilisateur peut cliquer sur chaque direction pour accéder aux interfaces correspondantes et y **prendre ses décisions**.
      
      ---
      
      Ta mission :
      - Répondre clairement et précisément aux questions liées aux trois sections suivantes : **Besoin en Recrutement**, **Choix des Fournisseurs**, **Assurances & Logiciels**.
      - Si la question ne concerne **aucune** de ces trois sections, y compris le calendrier ou la sidebar, réponds poliment que tu ne peux pas répondre à ce sujet.
      
      Sois concis, informatif, et garde un ton professionnel et amical.
          `,
    },
    {
      role: "user",
      content: userMessage,
    },
  ];

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct-v0.3",
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const botReply =
      response.data.choices?.[0]?.message?.content ||
      "Désolé, je n'ai pas de réponse.";
    res.json({ reply: botReply });
  } catch (error) {
    console.error(
      "Erreur API OpenRouter:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Erreur lors de l'appel au chatbot." });
  }
};

export default askChatbot;
