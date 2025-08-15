const faqRecruitment = [
  {
    question: "Comment puis-je définir l'effectif à recruter ?",
    answer:
      "Utilisez les boutons + et - à côté du champ Effectif, ou saisissez directement un nombre.",
    keywords: ["effectif", "recruter", "nombre", "+", "-", "quantité"],
  },
  {
    question: "C'est quoi le role de la partie de Recruitment?",
    answer:
      "La section Recrutement vous permet de gérer les besoins en personnel de vos ateliers.Vous pouvez y recruter des employés avec différents niveaux de qualification(ouvriers, chefs d’atelier, etc.), en choisissant leur nombre, leur formation éventuelle, et en visualisant le coût associé.C’est une étape essentielle pour assurer le bon fonctionnement de vos ateliers dans le prochain round.",
    keywords: [
      "recrutement",
      "effectif",
      "qualification",
      "atelier",
      "coût",
      "formation",
    ],
  },
  {
    question: "Qu’est-ce que le champ « Qualification » ?",
    answer:
      "La qualification correspond au niveau de compétence requis pour le poste à pourvoir.",
    keywords: ["qualification", "niveau", "compétence", "poste", "champ"],
  },
  {
    question: "Comment choisir une formation pour le recrutement ?",
    answer:
      "Sélectionnez une qualification, puis choisissez une formation disponible dans la liste.",
    keywords: ["formation", "choisir", "sélectionner", "liste"],
  },
  {
    question: "Comment le coût total est-il calculé ?",
    answer:
      "Le coût total = effectif × coût unitaire de la formation sélectionnée.",
    keywords: ["coût total", "calcul", "prix", "formation", "effectif"],
  },
  {
    question: "Que signifie le champ « Coût unitaire » ?",
    answer: "C’est le coût par personne pour la formation choisie.",
    keywords: ["coût unitaire", "prix", "formation", "personne"],
  },
  {
    question: "Comment annuler une saisie dans le formulaire ?",
    answer:
      "Cliquez sur le bouton « Annuler » pour réinitialiser tous les champs du formulaire.",
    keywords: ["annuler", "réinitialiser", "formulaire", "effacer"],
  },
  {
    question: "Comment valider ma demande de recrutement ?",
    answer:
      "Cliquez sur « Confirmer » pour enregistrer le recrutement et la décision dans la base.",
    keywords: ["valider", "confirmer", "enregistrer", "demande"],
  },
  {
    question: "Que se passe-t-il après confirmation ?",
    answer:
      "La demande est envoyée au backend et sauvegardée pour le round courant et l’utilisateur.",
    keywords: ["confirmation", "après", "envoi", "sauvegarder", "backend"],
  },
  {
    question:
      "Pourquoi ne puis-je pas confirmer sans sélectionner une formation ?",
    answer:
      "La sélection d’une formation est obligatoire pour valider la demande.",
    keywords: ["confirmer", "formation", "obligatoire", "valider"],
  },
  {
    question: "Comment savoir si je suis connecté ?",
    answer:
      "Vous devez être connecté (avec un token valide) pour confirmer un recrutement.",
    keywords: ["connecté", "connexion", "token", "authentification"],
  },
  {
    question: "Qu’est-ce que le « round courant » ?",
    answer:
      "C’est la période actuelle du jeu/du système pendant laquelle vous effectuez vos décisions.",
    keywords: ["round", "courant", "période", "jeu", "système"],
  },
  {
    question: "Pourquoi certaines formations ne sont pas affichées ?",
    answer:
      "Seules les formations correspondant à la qualification sélectionnée sont affichées.",
    keywords: ["formation", "affichées", "qualification", "filtrer"],
  },
  {
    question: "Puis-je recruter un effectif nul ou négatif ?",
    answer: "Non, l’effectif doit être un nombre positif supérieur à zéro.",
    keywords: ["effectif", "nul", "négatif", "positif", "nombre"],
  },
  {
    question: "Comment modifier une formation sélectionnée ?",
    answer:
      "Changez la qualification pour rafraîchir les formations disponibles, puis sélectionnez-en une autre.",
    keywords: [
      "modifier",
      "changer",
      "formation",
      "qualification",
      "sélectionner",
    ],
  },
  {
    question: "Que signifie l’icône d’exclamation à côté des labels ?",
    answer:
      "C’est une info-bulle ou un rappel d’aide lié au champ correspondant.",
    keywords: ["icône", "exclamation", "label", "info-bulle", "aide"],
  },
  {
    question: "Puis-je voir le détail des coûts avant de confirmer ?",
    answer:
      "Oui, le coût unitaire et le coût total s’affichent sous les sélections dès qu’elles sont faites.",
    keywords: ["détail", "coût", "confirmer", "afficher"],
  },
  {
    question: "Puis-je modifier ma demande après confirmation ?",
    answer:
      "Non, une fois confirmée, la demande est enregistrée. Vous pouvez faire une nouvelle demande.",
    keywords: ["modifier", "demande", "confirmation", "nouvelle"],
  },
  {
    question: "Que faire si je ne trouve pas la formation souhaitée ?",
    answer:
      "Vérifiez d’abord la qualification sélectionnée. Si elle est correcte, contactez l’administrateur.",
    keywords: [
      "formation",
      "souhaitée",
      "trouver",
      "administrateur",
      "qualification",
    ],
  },
  {
    question:
      "Comment puis-je connaître les compétences associées à une qualification ?",
    answer:
      "Les qualifications correspondent à des niveaux de compétence standard (Base, Intermédiaire, Avancée).",
    keywords: ["compétences", "qualification", "niveaux", "standard"],
  },
  {
    question: "Comment le coût de formation est-il fixé ?",
    answer:
      "Le coût est défini par la formation sélectionnée et peut varier selon le fournisseur.",
    keywords: ["coût", "formation", "fournisseur", "fixé", "varier"],
  },
  {
    question: "Que se passe-t-il si je ne suis pas connecté ?",
    answer:
      "Vous ne pourrez pas confirmer votre demande tant que vous n’êtes pas authentifié.",
    keywords: ["connecté", "non", "authentifié", "confirmer"],
  },
  {
    question: "Puis-je recruter plusieurs qualifications en même temps ?",
    answer: "Vous devez soumettre une demande par qualification.",
    keywords: ["plusieurs", "qualifications", "même temps", "demande"],
  },
  {
    question: "Le formulaire est-il accessible sur mobile ?",
    answer:
      "Oui, le formulaire est responsive et s’adapte aux mobiles et tablettes.",
    keywords: ["formulaire", "mobile", "responsive", "tablette"],
  },
  {
    question: "Comment suivre l’état de ma demande ?",
    answer:
      "L’état de vos demandes est consultable dans la section dédiée aux recrutements.",
    keywords: ["suivre", "état", "demande", "consultable", "recrutement"],
  },
  {
    question: "Puis-je annuler une demande déjà envoyée ?",
    answer:
      "Cela dépend des règles du système ; généralement, contactez un responsable pour annuler.",
    keywords: ["annuler", "demande", "envoyée", "responsable"],
  },
  {
    question: "Le coût total inclut-il les salaires des recrues ?",
    answer: "Non, le coût total ici concerne uniquement la formation.",
    keywords: ["coût total", "salaires", "recrues", "formation"],
  },
  {
    question: "Pourquoi le champ « effectif » accepte-t-il zéro ?",
    answer:
      "Pour permettre d’effacer ou réinitialiser la saisie avant confirmation.",
    keywords: ["effectif", "zéro", "réinitialiser", "effacer"],
  },
  {
    question: "Puis-je saisir un effectif très élevé ?",
    answer:
      "La limite dépend des règles internes ; il peut y avoir un contrôle côté serveur.",
    keywords: ["effectif", "limite", "serveur", "contrôle", "élevé"],
  },
  {
    question: "Que faire en cas d’erreur lors de l’enregistrement ?",
    answer:
      "Un message d’erreur s’affichera, essayez de recharger la page ou contactez le support.",
    keywords: ["erreur", "enregistrement", "message", "support"],
  },
  {
    question:
      "Puis-je sélectionner une formation sans choisir la qualification ?",
    answer:
      "Non, la sélection de la qualification filtre les formations disponibles.",
    keywords: ["formation", "qualification", "sélection", "filtrer"],
  },
  {
    question: "Puis-je envoyer plusieurs besoins de recrutement à la fois ?",
    answer:
      "Non, chaque demande doit être envoyée individuellement par qualification.",
    keywords: [
      "plusieurs",
      "besoins",
      "recrutement",
      "envoyer",
      "qualification",
    ],
  },
  {
    question:
      "Pourquoi dois-je d’abord choisir une qualification avant une formation ?",
    answer:
      "Les formations disponibles dépendent de la qualification sélectionnée.",
    keywords: [
      "qualification",
      "formation",
      "ordre",
      "sélection",
      "dépendance",
    ],
  },
  {
    question: "Les coûts sont-ils les mêmes pour toutes les qualifications ?",
    answer:
      "Non, chaque qualification propose des formations avec des coûts différents.",
    keywords: ["coût", "qualification", "différence", "formation"],
  },
  {
    question: "Que signifie le niveau Base, Intermédiaire ou Avancée ?",
    answer:
      "Ce sont des niveaux de compétence croissants : Base est débutant, Avancée est expert.",
    keywords: ["niveau", "base", "intermédiaire", "avancée", "compétence"],
  },
  {
    question: "Le bouton Confirmer envoie-t-il directement ma demande ?",
    answer: "Oui, il enregistre et transmet votre besoin à la direction RH.",
    keywords: ["confirmer", "envoyer", "demande", "direction", "RH"],
  },
  {
    question: "Puis-je modifier le coût unitaire d’une formation ?",
    answer: "Non, le coût unitaire est défini et fixe pour chaque formation.",
    keywords: ["coût unitaire", "modifier", "formation", "fixe"],
  },
  {
    question: "Pourquoi ma demande de recrutement est-elle refusée ?",
    answer:
      "Il peut s’agir d’un problème de validation ou de données manquantes (formation, effectif...).",
    keywords: ["refusée", "recrutement", "validation", "erreur", "manquant"],
  },
  {
    question: "Quelle est la différence entre Annuler et Réinitialiser ?",
    answer:
      "Le bouton Annuler réinitialise tous les champs du formulaire. Il n'annule pas une demande déjà envoyée.",
    keywords: ["annuler", "réinitialiser", "formulaire", "différence"],
  },
  {
    question: "Puis-je sauvegarder une demande sans la confirmer ?",
    answer: "Non, seules les demandes confirmées sont enregistrées.",
    keywords: ["sauvegarder", "demande", "non confirmée", "enregistrer"],
  },
  {
    question: "Puis-je voir un résumé du coût total avant confirmation ?",
    answer:
      "Oui, un calcul automatique du coût total s'affiche avant de valider la demande.",
    keywords: ["coût total", "avant confirmation", "résumé", "validation"],
  },
  {
    question:
      "Les formations sont-elles obligatoires pour chaque recrutement ?",
    answer: "Oui, chaque qualification implique une formation correspondante.",
    keywords: ["formation", "obligatoire", "qualification", "recrutement"],
  },
  {
    question:
      "Qu'arrive-t-il si je choisis une qualification sans sélectionner de formation ?",
    answer:
      "Le formulaire vous demande de choisir une formation avant de pouvoir confirmer.",
    keywords: [
      "formation manquante",
      "erreur",
      "confirmation",
      "qualification seule",
    ],
  },
  {
    question: "Puis-je changer de qualification après l’avoir sélectionnée ?",
    answer:
      "Oui, tant que vous n’avez pas cliqué sur 'Confirmer', vous pouvez modifier la qualification.",
    keywords: [
      "modifier qualification",
      "avant confirmation",
      "changer",
      "sélection",
    ],
  },
  {
    question: "Puis-je supprimer un besoin de recrutement après confirmation ?",
    answer:
      "Non depuis l’interface, mais vous pouvez contacter la direction RH pour toute correction.",
    keywords: ["supprimer", "besoin", "confirmé", "après", "correction"],
  },
  {
    question: "Comment sont calculés les effectifs nécessaires ?",
    answer:
      "Les effectifs sont définis par l'utilisateur selon ses besoins spécifiques pour l’atelier.",
    keywords: ["calcul", "effectif", "besoin", "définir", "atelier"],
  },
  {
    question: "Y a-t-il une limite d'effectif par qualification ?",
    answer:
      "Non, mais il est conseillé de rester cohérent avec les capacités de votre atelier.",
    keywords: ["limite", "effectif", "qualification", "atelier"],
  },
  {
    question: "Comment sélectionner un fournisseur ?",
    answer:
      "Ouvrez la section désirée (International, National, Concurrent), puis cliquez sur les fournisseurs que vous souhaitez sélectionner.",
    keywords: ["sélection", "fournisseur", "choisir", "cliquer", "achat"],
  },
  {
    question: "Puis-je sélectionner plusieurs fournisseurs ?",
    answer:
      "Oui, vous pouvez sélectionner plusieurs fournisseurs pour le même composant et atelier.",
    keywords: [
      "plusieurs",
      "fournisseurs",
      "composant",
      "sélection",
      "atelier",
    ],
  },
  {
    question: "Quels sont les types de fournisseurs disponibles ?",
    answer:
      "Il existe trois types de fournisseurs : Internationaux (moins chers mais livraison plus longue), Nationaux (rapides et fiables), et Concurrents (rapides mais risqués). Choisissez en fonction de vos priorités : coût, délai ou fiabilité.",
    keywords: [
      "fournisseur",
      "types",
      "internationaux",
      "nationaux",
      "concurrents",
      "différences",
      "avantages",
      "inconvénients",
    ],
  },
  {
    question: "Que signifie le type de gamme ?",
    answer:
      "Le type de gamme (bas, moyen, haut) influence la qualité et le coût des composants que vous sélectionnez.",
    keywords: ["type", "gamme", "qualité", "coût", "bas", "haut"],
  },
  {
    question: "Comment filtrer les fournisseurs ?",
    answer:
      "Utilisez les filtres par qualification, âge ou genre pour afficher les fournisseurs correspondant à vos critères.",
    keywords: ["filtrer", "fournisseur", "qualification", "âge", "genre"],
  },
  {
    question: "Comment sauvegarder ma sélection de fournisseurs ?",
    answer:
      "Cliquez sur le bouton 'Confirmer' après avoir sélectionné les fournisseurs pour enregistrer vos choix.",
    keywords: [
      "sauvegarder",
      "confirmer",
      "fournisseur",
      "sélection",
      "valider",
    ],
  },
  {
    question: "Puis-je annuler ma sélection ?",
    answer:
      "Oui, utilisez le bouton 'Annuler' pour supprimer les fournisseurs sélectionnés avant confirmation.",
    keywords: ["annuler", "supprimer", "sélection", "fournisseur", "choix"],
  },
  {
    question:
      "Est-ce que mon choix de fournisseur affecte les performances de l’atelier ?",
    answer:
      "Oui, les fournisseurs de meilleure qualité peuvent améliorer les performances mais augmentent aussi les coûts.",
    keywords: ["choix", "fournisseur", "performance", "atelier", "coût"],
  },
  {
    question:
      "Le fournisseur sélectionné est-il attribué à tous les composants ?",
    answer:
      "Non, vous devez sélectionner un fournisseur pour chaque composant séparément.",
    keywords: ["fournisseur", "composant", "sélection", "attribuer"],
  },
  {
    question: "Est-ce que je peux modifier ma sélection après confirmation ?",
    answer:
      "Non, une fois les fournisseurs confirmés, la sélection est définitive pour ce round.",
    keywords: ["modifier", "sélection", "confirmation", "fournisseur", "round"],
  },
  {
    question: "Que se passe-t-il si je ne sélectionne aucun fournisseur ?",
    answer:
      "Si aucun fournisseur n’est sélectionné, aucun approvisionnement ne sera fait pour ce composant.",
    keywords: [
      "aucun",
      "sélection",
      "fournisseur",
      "approvisionnement",
      "composant",
    ],
  },
  {
    question: "Est-ce que les fournisseurs changent à chaque round ?",
    answer:
      "Non, la liste des fournisseurs reste généralement la même d’un round à l’autre, sauf décision contraire du jeu.",
    keywords: ["fournisseurs", "changer", "round", "liste", "dynamique"],
  },
  {
    question: "Quel impact a le fournisseur sur le taux de livraison ?",
    answer:
      "Certains fournisseurs ont un meilleur taux de livraison, ce qui garantit une meilleure disponibilité des composants dans l’atelier.",
    keywords: ["fournisseur", "taux", "livraison", "disponibilité", "atelier"],
  },
  {
    question: "Le coût total dépend-il uniquement du fournisseur ?",
    answer:
      "Non, il dépend aussi de la quantité commandée, du type de composant et du niveau de qualité choisi.",
    keywords: ["coût", "fournisseur", "quantité", "composant", "qualité"],
  },

  {
    question: "Comment sont calculés les KPIs liés aux fournisseurs ?",
    answer:
      "Ils sont calculés à partir de vos décisions d’achat, en prenant en compte les coûts, la qualité, et le taux de livraison.",
    keywords: ["KPI", "fournisseur", "coût", "qualité", "livraison"],
  },
  {
    question: "Puis-je revenir à une sélection précédente ?",
    answer:
      "Non, seule la dernière sélection confirmée est prise en compte dans la simulation.",
    keywords: [
      "revenir",
      "sélection",
      "précédente",
      "fournisseur",
      "confirmation",
    ],
  },
  {
    question: "C’est quoi le rôle de la section de fournisseur ?",
    answer:
      "La section de fournisseur vous permet de choisir les entreprises qui vous fourniront les composants nécessaires à la production. Ces choix influencent directement vos coûts, la qualité des produits et les performances globales de vos ateliers.",
    keywords: [
      "rôle",
      "section",
      "fournisseur",
      "production",
      "coût",
      "qualité",
    ],
  },
  {
    question: "Quel est le rôle de la section Assurance et Logiciel ?",
    answer:
      "Cette section vous permet de choisir les assurances et logiciels que vous souhaitez souscrire pour votre entreprise. Chaque sélection a un coût fixe de 1000 BA.",
    keywords: ["rôle", "section", "assurance", "logiciel", "utilité"],
  },
  {
    question: "Combien coûte chaque assurance ou logiciel ?",
    answer:
      "Chaque assurance ou logiciel coûte 1000 BA. Le coût total dépend du nombre d'options sélectionnées.",
    keywords: ["coût", "prix", "assurance", "logiciel", "total"],
  },
  {
    question: "Puis-je choisir plusieurs assurances ?",
    answer:
      "Oui, vous pouvez sélectionner plusieurs contrats d’assurance selon vos besoins.",
    keywords: ["plusieurs", "assurances", "sélection", "choisir"],
  },
  {
    question: "Puis-je choisir plusieurs logiciels ?",
    answer:
      "Oui, vous pouvez sélectionner plusieurs logiciels en fonction de vos besoins métiers.",
    keywords: ["plusieurs", "logiciels", "sélection", "choisir"],
  },
  {
    question: "Comment sélectionner une assurance ou un logiciel ?",
    answer:
      "Cliquez sur la carte de l’assurance ou du logiciel. Une coche apparaît pour indiquer que la sélection est active.",
    keywords: ["comment", "sélectionner", "choisir", "clic", "cocher"],
  },
  {
    question: "Comment connaître le coût total ?",
    answer:
      "Le coût total est affiché en bas de page, sous le titre 'Coût total'. Il est mis à jour automatiquement selon vos sélections.",
    keywords: ["coût", "total", "prix", "affichage", "montant"],
  },
  {
    question: "Comment confirmer mes choix ?",
    answer:
      "Cliquez sur le bouton 'Confirmer'. Une boîte de confirmation apparaîtra pour valider l'action.",
    keywords: ["confirmer", "valider", "enregistrer", "choix"],
  },
  {
    question: "Puis-je annuler mes sélections ?",
    answer:
      "Oui, cliquez sur le bouton 'Annuler'. Cela réinitialisera toutes vos sélections dans l'onglet actif.",
    keywords: ["annuler", "réinitialiser", "choix", "sélection"],
  },
  {
    question: "Comment passer de l’onglet assurance à logiciel ?",
    answer:
      "Utilisez les onglets en haut de la page pour passer de l’un à l’autre.",
    keywords: ["changer", "onglet", "logiciel", "assurance", "navigation"],
  },
  {
    question: "Mes sélections sont-elles sauvegardées automatiquement ?",
    answer:
      "Non, vous devez cliquer sur 'Confirmer' pour enregistrer vos sélections.",
    keywords: ["sauvegarde", "automatique", "confirmer", "sélections"],
  },
  {
    question: "Peut-on revenir en arrière après avoir confirmé ?",
    answer:
      "Non, une fois confirmé, les choix sont enregistrés. Utilisez le bouton 'Annuler' avant de confirmer si nécessaire.",
    keywords: ["retour", "modifier", "confirmer", "annuler"],
  },
  {
    question: "À quoi sert l’onglet logiciel ?",
    answer:
      "Il permet de choisir les logiciels métiers (RH, production, CRM...) nécessaires à votre entreprise.",
    keywords: ["onglet", "logiciel", "fonction", "usage"],
  },
  {
    question: "À quoi sert l’onglet assurance ?",
    answer:
      "Il permet de souscrire à des assurances pour vos locaux, vos employés ou vos responsabilités légales.",
    keywords: ["onglet", "assurance", "utilité", "protection", "local"],
  },
  {
    question: "Pourquoi le bouton 'Confirmer' est désactivé ?",
    answer:
      "Le bouton 'Confirmer' est désactivé tant que vous n’avez sélectionné aucune assurance ou logiciel.",
    keywords: ["bouton", "désactivé", "confirmer", "sélection", "bloqué"],
  },
  {
    question: "Comment savoir si un élément est sélectionné ?",
    answer:
      "Un cadre coloré et une coche apparaissent sur la carte de l’élément sélectionné.",
    keywords: ["élément", "sélectionné", "choisi", "carte", "visuel"],
  },
  {
    question: "Que se passe-t-il si je ne choisis rien ?",
    answer:
      "Aucune dépense ne sera enregistrée, et aucune assurance ou logiciel ne sera appliqué à votre entreprise.",
    keywords: ["rien", "pas de choix", "aucune sélection", "ne rien faire"],
  },
  {
    question: "Est-ce que les assurances et logiciels sont obligatoires ?",
    answer:
      "Non, ils ne sont pas obligatoires, mais ils peuvent apporter des avantages stratégiques selon votre scénario de jeu.",
    keywords: ["obligatoire", "dois-je", "nécessaire", "forcé", "obligation"],
  },
  {
    question: "Est-ce que je peux revenir sur l’écran après avoir quitté ?",
    answer:
      "Oui, vous pouvez revenir à cette section, mais vos sélections précédentes ne seront plus modifiables si elles ont été confirmées.",
    keywords: ["revenir", "retourner", "écran", "section", "navigation"],
  },
  {
    question: "Quels types d’assurances sont proposés ?",
    answer:
      "Les assurances proposées couvrent différents domaines comme les locaux, les machines, les ressources humaines, etc.",
    keywords: ["types", "assurances", "disponibles", "liste", "options"],
  },
  {
    question: "Quels logiciels sont disponibles ?",
    answer:
      "Vous pouvez choisir parmi différents logiciels comme la gestion RH, CRM, production, logistique, etc.",
    keywords: ["logiciels", "disponibles", "liste", "exemples", "types"],
  },
  {
    question: "Quel impact ont les logiciels dans le jeu ?",
    answer:
      "Les logiciels peuvent améliorer la productivité, la gestion des équipes ou la relation client selon celui que vous choisissez.",
    keywords: ["impact", "effet", "logiciels", "jeu", "influence"],
  },
  {
    question: "Combien de logiciels puis-je choisir ?",
    answer:
      "Il n’y a pas de limite stricte, mais chaque sélection augmente le coût total, donc soyez stratégique.",
    keywords: ["nombre", "combien", "logiciels", "maximum", "limite"],
  },

  {
    question:
      "Comment naviguer entre les différentes directions dans la sidebar ?",
    answer:
      "Utilisez le menu latéral pour accéder à chaque direction. Les activités sont classées en soutien, principales, finances, etc. Cliquez sur une direction pour afficher ses options.",
    keywords: ["naviguer", "sidebar", "direction", "menu", "latéral", "accès"],
  },
  {
    question: "C’est quoi le Dashboard Global ?",
    answer:
      "Le Dashboard Global est la page d'accueil qui vous offre une vue synthétique sur l’ensemble des performances et décisions de votre entreprise virtuelle.",
    keywords: ["dashboard", "global", "page d'accueil", "vue", "synthèse"],
  },
  {
    question: "À quoi sert la section Finances dans la sidebar ?",
    answer:
      "La section Finances permet de consulter les documents financiers clés comme le bilan, le compte de résultat, l'EBITDA, le seuil de rentabilité, etc.",
    keywords: [
      "finances",
      "bilan",
      "compte",
      "résultat",
      "EBITDA",
      "rentabilité",
    ],
  },
  {
    question: "Que contient la section Activités de soutien ?",
    answer:
      "Elle regroupe les directions transversales telles que la direction générale, achats, ressources humaines, R&D, et RSE.",
    keywords: [
      "activités de soutien",
      "direction générale",
      "RH",
      "RSE",
      "R&D",
    ],
  },
  {
    question: "Que contient la section Activités principales ?",
    answer:
      "Elle regroupe les directions opérationnelles comme logistique, production, qualité, marketing et commerciale.",
    keywords: [
      "activités principales",
      "production",
      "logistique",
      "qualité",
      "marketing",
    ],
  },
  {
    question: "Où trouver la section Calculatrice, Chat ou Jeux ?",
    answer:
      "Ces outils sont accessibles en bas de la sidebar pour vous assister pendant vos prises de décision.",
    keywords: ["calculatrice", "chat", "jeux", "sidebar", "outils"],
  },
  {
    question: "Qu’est-ce que le calendrier dans la plateforme ?",
    answer:
      "Le calendrier vous permet de suivre la progression du jeu, les deadlines des tours et les périodes de décisions.",
    keywords: ["calendrier", "planning", "temps", "tours", "jeu", "décisions"],
  },
  {
    question: "Comment revenir à la page d'accueil ?",
    answer:
      "Cliquez sur 'Dashboard Global' en haut de la sidebar pour revenir à la vue d'ensemble.",
    keywords: ["page d'accueil", "dashboard", "global", "retour", "accueil"],
  },
  {
    question: "Comment accéder à une direction spécifique ?",
    answer:
      "Repérez la catégorie (soutien, principale, finances) dans la sidebar puis cliquez sur la direction souhaitée.",
    keywords: [
      "direction",
      "accès",
      "sidebar",
      "menu",
      "soutien",
      "principale",
    ],
  },






















  
    
    /*Read from here */

      {
    "question": "Comment augmenter le niveau d'une technologie en R&D ?",
    "keywords": ["niveau technologie", "coût 20000", "progression 20%"],
    "answer": "Investissez dans la technologie (ex: Matériaux avancés) jusqu'à atteindre le coût requis pour le niveau suivant (ex: 20 000 unités). La progression actuelle est affichée (ex: 20%)."
  },
  {
    "question": "Quels sont les choix de gamme pour un produit ?",
    "keywords": ["gamme produit", "bas gamme", "finition métallique"],
    "answer": "Options : 'Bas gamme' (19.99 $), finitions (métalliques, satinées), textures, couleurs, et volume."
  },
  {
    "question": "Comment investir dans l'emballage d'un produit ?",
    "keywords": ["investir emballage", "recyclable", "écologie"],
    "answer": "Cochez 'Emballages' sous Composants, puis choisissez des critères comme 'Écologie' ou 'Recyclable'. Le coût dépend des options (ex: 19.99 $ pour bas de gamme)."
  },
  {
    "question": "Quels sont les coûts d'investissement trimestriels en R&D ?",
    "keywords": ["coût trimestriel", "1000 unités", "investissement total"],
    "answer": "L'investissement trimestriel par défaut est de 1 000 unités, cumulable dans l'investissement total (ex: 10 000 unités)."
  },
  {
    "question": "Comment annuler un investissement en R&D ?",
    "keywords": ["annuler R&D", "valeur précédente", "1000 BA"],
    "answer": "Cliquez sur 'Annuler' avant confirmation pour revenir à la valeur précédente (ex: 1 000 BA)."
  },
  {
    "question": "Comment personnaliser l'apparence d'un produit ?",
    "keywords": ["apparence produit", "couleurs", "volume"],
    "answer": "Dans 'Choix', sélectionnez des options comme 'Couleurs', 'Volume', ou 'Textures' sous la section Design."
  },
  {
    "question": "Quelles sont les finitions disponibles pour un produit haut de gamme ?",
    "keywords": ["finition haut de gamme", "métallique", "satinée"],
    "answer": "Options : Finitions métalliques, satinées, ou textures premium. Les coûts varient selon la gamme."
  },
  {
    "question": "Comment ajouter un composant recyclable ?",
    "keywords": ["composant recyclable", "écologie", "emballage"],
    "answer": "Cochez 'Écologie' ou 'Recyclable' sous 'Emballages', puis confirmez l'investissement."
  },
  {
    "question": "Quel est le coût d'un composant bas de gamme ?",
    "keywords": ["coût bas de gamme", "19.99", "composant 2"],
    "answer": "Le 'Composant 2' en bas de gamme coûte 19.99 $."
  },
  {
    "question": "Comment appliquer un achat direct pour un composant ?",
    "keywords": ["achat direct", "composant", "appliquer"],
    "answer": "Sélectionnez un composant, choisissez 'Achat direct', et cliquez sur 'Appliquer'."
  },
   {
    "question": "Que faire si la progression d'un partenariat stagne à 20% ?",
    "keywords": ["progression bloquée", "20%", "partenariat"],
    "answer": "Vérifiez l'investissement trimestriel (1 000 unités minimum) et le coût requis pour le niveau suivant (ex: 20 000 unités)."
  },
  {
    "question": "Comment comparer les brevets disponibles ?",
    "keywords": ["comparer brevets", "brevet 1", "cedir 20000"],
    "answer": "Consultez la 'Liste des brevets' pour voir les coûts (ex: 'Brevet 1' à 20 000 unités) et leurs durées technologiques."
  },
  {
    "question": "Pourquoi ne puis-je pas confirmer un partenariat ?",
    "keywords": ["erreur confirmation", "budget 0", "investissement insuffisant"],
    "answer": "Assurez-vous que le budget n'est pas à 0 et que l'investissement est suffisant (ex: 20 000 unités pour une startup)."
  },
  {
    "question": "Comment réinitialiser les choix de design ?",
    "keywords": ["réinitialiser design", "annuler", "valeurs par défaut"],
    "answer": "Cliquez sur 'Annuler' pour revenir aux valeurs précédentes ou désélectionnez manuellement les options."
  },
  {
    "question": "Quels partenariats permettent d'accéder à des thèses de doctorat ?",
    "keywords": ["thèses doctorat", "partenariat université", "laboratoire"],
    "answer": "Les partenariats universitaires ou avec laboratoires de recherche donnent accès à des thèses. Consultez la section 'Liste des Thèses'."
  },

  {
    "question": "Comment optimiser l'investissement pour atteindre un niveau supérieur en R&D ?",
    "keywords": ["optimiser R&D", "niveau suivant", "20000 unités"],
    "answer": "Allouez 1 000 unités/trimestre jusqu'à atteindre 20 000 unités. Surveillez la progression (ex: 20% actuelle)."
  },
  {
    "question": "Quels partenariats offrent des délais raccourcis ?",
    "keywords": ["délais rapides", "startups", "brevets"],
    "answer": "Les brevets (achat direct) et les startups (investissement ponctuel) ont des délais plus courts que les partenariats universitaires."
  },
  {
    "question": "Comment suivre l'historique des investissements ?",
    "keywords": ["historique investissements", "valeur précédente", "1000 BA"],
    "answer": "La 'Valeur précédente' (ex: 1 000 BA) est affichée avant confirmation. Pour un historique complet, exportez les données depuis le tableau."
  },
  {
    "question": "Quelle est la différence entre 'Simple prise de participation' et 'Achat direct' pour les startups ?",
    "keywords": ["prise de participation", "achat direct", "startup"],
    "answer": "'Simple prise de participation' donne des droits limités, tandis que 'Achat direct' transfère la propriété (coût similaire : 20 000 unités)."
  },
  {
    "question": "Comment utiliser les partenariats pour réduire les coûts de R&D ?",
    "keywords": ["réduire coûts", "partenariats", "laboratoires"],
    "answer": "Collaborez avec des laboratoires ou universités pour partager les coûts de R&D (ex: 'Théor en AI' à 20 20 unités)."
  }
];

export default faqRecruitment;
