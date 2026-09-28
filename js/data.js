/**
 * Base de Données Centralisée du Portfolio Génie Civil
 * Profil professionnel, compétences, parcours académique et fiches réelles des projets
 * Titulaire : COMPAORE Dakiswendé P. Jean Landry - Ingénieur de Conception en Génie Civil
 */

const PORTFOLIO_DATA = {
  profile: {
    fullName: "COMPAORE Dakiswendé P. Jean Landry",
    shortName: "Landry COMPAORE",
    title: "Ingénieur de Conception en Génie Civil",
    subtitle: "Pilotage d'Études de Structures • Suivi-Contrôle Chantier • Démarche Qualité ISO 9001",
    tagline: "Fort de 5 années d'expertise entre pilotage d'études de structure, suivi-contrôle sur le terrain et démarche qualité ISO 9001. De l'analyse des dossiers d'exécution à la réception des travaux, je garantis la qualité des ouvrages, la maîtrise des budgets et le respect des délais.",
    experienceYears: 5,
    projectsDelivered: "15+",
    complianceRate: "100% Qualité ISO 9001",
    safetyRecord: "Zéro Accident Chantier",
    email: "Landrycompaore43@gmail.com",
    phones: ["+226 79 12 38 18", "+226 75 35 88 32"],
    location: "Ouagadougou, Burkina Faso",
    status: "Disponible pour le pilotage de projets structurants & direction d'études",
    linkedIn: "https://www.linkedin.com/in/landry-compaore",
    avatar: "assets/images/engineer_avatar.svg",
    cvPath: "assets/docs/cv_landry.pdf",

    // Synthèse Recruteur Rapide (Fast-Track RH)
    recruiterSummary: {
      contractType: "Chef de Service Études / Chef de Projet BTP / Responsable Technique",
      noticePeriod: "Disponible sous préavis",
      mobility: "Burkina Faso, Sous-région Afrique de l'Ouest, International",
      salaryExpectation: "Selon responsabilités du portefeuille projets & localisation",
      languages: [
        { name: "Français", level: "Langue maternelle / Parfait" },
        { name: "Anglais", level: "Intermédiaire (Score TOEIC : 640/990 – Décembre 2025, 2iE)" },
        { name: "Mooré", level: "Langue nationale / Parfait" }
      ],
      coreStrengths: [
        "Double compétence éprouvée : Pilotage d'études de structure (Béton armé & Charpente métallique) et suivi-contrôle rigoureux sur le terrain",
        "Expertise avancée en déboursés secs, études de prix analytiques et gestion budgétaire de grands marchés publics et privés",
        "Maîtrise du Système de Management de la Qualité (SMQ selon ISO 9001) et réception de travaux sans réserve",
        "Maîtrise complète de la chaîne logicielle technique : Robot Structural Analysis, CypeCAD, Arche, AutoCAD, Covadis, MS Project"
      ]
    },

    // Compétences Techniques & Logiciels
    skills: {
      structures: [
        { name: "Structures en Béton Armé (BAEL 91 / Eurocodes)", level: 96 },
        { name: "Charpentes Métalliques & Cloisonnements", level: 92 },
        { name: "Fondations Spéciales, Murs de Soutènement & Radier", level: 94 },
        { name: "Résistance des Matériaux (RDM) & Calculs aux États Limites", level: 95 }
      ],
      software: [
        { name: "Robot Structural Analysis", category: "Calcul", level: 95 },
        { name: "CypeCAD & Arche Ossature", category: "Béton Armé", level: 92 },
        { name: "AutoCAD & Covadis", category: "DAO / VRD", level: 95 },
        { name: "ArchiCAD", category: "Architecture & DAO", level: 90 },
        { name: "MS Project", category: "Planification", level: 92 },
        { name: "Alize LCPC", category: "Dimensionnement Chaussées", level: 88 }
      ],
      management: [
        { name: "Pilotage SMQ & Contrôle Qualité ISO 9001", level: 96 },
        { name: "Études de Prix & Établissement des Déboursés Secs", level: 96 },
        { name: "Suivi Technique & Contrôle de Conformité Chantier", level: 95 },
        { name: "Montage de Dossiers d'Appels d'Offres (DAO) & DQE", level: 94 }
      ]
    },

    // Diplômes & Certifications officielles (2iE & VERECHAGUINE AK)
    certifications: [
      {
        year: "2019 - 2022",
        title: "Master II en Génie Civil / Bâtiments & Travaux Publics",
        institution: "Institut International d'Ingénierie de l'Eau et de l'Environnement (2iE) - Ouagadougou",
        badge: "Ingénieur Diplômé de 2iE"
      },
      {
        year: "2025",
        title: "Certification TOEIC d'Anglais Professionnel (Score: 640/990)",
        institution: "2iE Ouagadougou",
        badge: "Anglais Professionnel"
      },
      {
        year: "2023",
        title: "Formation Entrepreneur Responsable (10e Édition)",
        institution: "2iE Ouagadougou",
        badge: "Management & Entrepreneuriat"
      },
      {
        year: "2016 - 2019",
        title: "Licence en Génie Civil",
        institution: "VERECHAGUINE AK à Cotonou au Bénin",
        badge: "Grade Licence BTP"
      },
      {
        year: "2016 - 2018",
        title: "Brevet de Technicien Supérieur (BTS) en Génie Civil",
        institution: "VERECHAGUINE AK à Cotonou au Bénin",
        badge: "BTS Génie Civil"
      },
      {
        year: "2016",
        title: "Permis de Conduire Catégories C",
        institution: "Délivrance Officielle",
        badge: "Mobilité Totale Chantier"
      }
    ],

    // Expériences Professionnelles Réelles
    experiences: [
      {
        period: "Depuis Mai 2025",
        role: "Chef de Service Étude",
        company: "Entreprise de Construction Woumtaba (ECW) Sarl",
        missions: [
          "Pilotage du système de management de la qualité (SMQ) et reporting stratégique des activités de la section étude ;",
          "Supervision des dossiers d’appel d’offre, dimensionnement des ouvrages et élaboration des plans d'exécutions ;",
          "Établissement des déboursés secs et suivi rigoureux de la budgétisation des projets en cours ;",
          "Suivi technique, contrôle de conformité des ouvrages."
        ],
        achievements: [
          "Supervision et gestion des travaux de l’équipe chargée des études ;",
          "Élaboration du déboursé sec, plans d’exécution et budgétisation du projet de Construction de 25 Centres de Santé (PRSS-ASN) pour le Ministère de la Santé ;",
          "Élaboration du déboursé sec, plans d’exécution et budgétisation du projet de Renforcement de la sécurisation des postes douaniers ;",
          "Conception, dimensionnement, suivi et contrôle d'un bâtiment R+2 en structure métallique avec cloisonnement en parpaing ;",
          "Dimensionnement et étude de prix d’un bâtiment R+2 pour un particulier en centre-ville ;",
          "Dimensionnement d’un amphithéâtre de 350 places ;",
          "Déboursé sec et budgétisation de travaux d’aménagement de piste rurale à Koudougou."
        ]
      },
      {
        period: "Janvier 2025 – Avril 2025",
        role: "Responsable Section Béton & Étude de Prix",
        company: "Entreprise de Construction Woumtaba (ECW) Sarl",
        missions: [
          "Dimensionnement des structures en béton armé et pilotage du processus opérationnel des études ;",
          "Suivi technique et contrôle de conformité des ouvrages ;",
          "Élaboration des devis quantitatifs et estimatifs (DQE) et plannings de réalisation."
        ],
        achievements: [
          "Réalisation du métré de l’immeuble de bureaux R+2 avec toiture accessible pour le nouveau bureau pays du Programme Alimentaire Mondial (PAM) ;",
          "Réalisation du métré d'un bâtiment R+4 avec sous-sol et édicule ;",
          "Étude d’avant-projet détaillé (APD) d’une infrastructure spécialisée pour la Banque Nationale de Gènes Phylogénétiques ;",
          "Étude des prix des travaux de construction d'une centrale thermique de production énergétique ;",
          "Suivi et contrôle des travaux de réhabilitation du monument des héros nationaux à Ouagadougou."
        ]
      },
      {
        period: "Mai 2024 – Décembre 2024",
        role: "Assistant du Directeur",
        company: "Bureau d’Ingénierie International (BEI) Sarl",
        missions: [
          "Suivi et contrôle technique des travaux de construction pour garantir la conformité aux plans ;",
          "Expertise technique ;",
          "Élaboration de plans d'exécutions et notes de calcul de structures."
        ],
        achievements: [
          "Dimensionnement et étude de prix d’un bâtiment R+2 pour un particulier à Kouba ;",
          "Expertise d’un bâtiment R+1 à usage d’habitation en centre-ville."
        ]
      },
      {
        period: "Septembre 2022 – Novembre 2023",
        role: "Ingénieur Génie Civil",
        company: "Entreprise ADVEO SA",
        missions: [
          "Montage de dossiers d'appels d'offres et de dossiers d'agrément technique ;",
          "Suivi-contrôle des travaux et établissement des devis quantitatifs et estimatifs."
        ],
        achievements: [
          "Montage et obtention d'agréments techniques majeurs ;",
          "Supervision technique de chantiers et établissement rigoureux des attachements et DQE."
        ]
      }
    ],

    // Références Professionnelles Vérifiables
    references: [
      {
        name: "Moussa TRAORE",
        role: "Chef de Projet",
        company: "Entreprise de Construction Woumtaba (ECW) Sarl",
        phone: "+226 77 95 18 54"
      },
      {
        name: "Issa KONATE",
        role: "Ingénieur",
        company: "Bureau d'Ingénierie International (BEI) Sarl",
        phone: "+226 78 66 13 56"
      },
      {
        name: "Dieudonné KORBEOGO",
        role: "Président Directeur Général (PDG)",
        company: "Entreprise ADVEO SA",
        phone: "+226 65 00 00 81"
      }
    ]
  },

  // 10 Grands Projets Phares Réels issus du CV
  projects: [
    {
      id: "Duplex R+2",
      number: "01",
      title: "Projet de construction d'un duplex R+2 à Ouagadougou",
      category: "Batiment",
      categoryLabel: "Habitation",
      image: "assets/images/duplex_R+2.jpeg",
      pdfDoc: "assets/docs/duplex_R+2.pdf",
      workDone: "Élaboration de l'avant projet détaillé",
      client: "Particulier",
      role: "Chef de Service Étude (ECW Sarl)",
      duration: "2025",
      location: "Ouagadougou, Burkina Faso"
    },
    {
      id: "Bloc hébergement",
      number: "02",
      title: "Bloc hébergement R+2",
      category: "Batiment",
      categoryLabel: "Scolaire",
      image: "assets/images/BLOC_HEBERGEMENT.jpeg",
      pdfDoc: "assets/docs/hebergement_r+2.pdf",
      workDone: "Conception technique, calculs de dimensionnement en béton armé banché haute résistance, élaboration méthodique du déboursé sec et budgétisation complète en zones frontalières sécuritaires sensibles.",
      client: "MINISTERE DE L’ENSEIGNEMENT SUPERIEUR, DE LA RECHERCHE SCIENTIFIQUE ET DE L’INNOVATION (MESRSI)",
      role: "Chef de Service Étude (ECW Sarl)",
      duration: "2025",
      location: "Bobo-Dioulasso, Burkina Faso"
    },
    {
      id: "Bloc Administration",
      number: "03",
      title: "Bloc Administration R+2",
      category: "batiment",
      categoryLabel: "Bâtiments scolaire",
      image: "assets/images/administration_r+2.jpeg",
      pdfDoc: "assets/docs/administration_r+2.pdf",
      workDone: "Réalisation du métré d'exécution structural et quantitatif, analyse des prix selon les standards internationaux de l'ONU (PAM / WFP) et optimisation des approvisionnements de ferraillage.",
      client: "MINISTERE DE L’ENSEIGNEMENT SUPERIEUR, DE LA RECHERCHE SCIENTIFIQUE ET DE L’INNOVATION (MESRSI)",
      role: "Responsable Section Béton & Étude de Prix (ECW Sarl)",
      duration: "2025",
      location: "Ouagadougou, Burkina Faso"
    },
    {
      id: "batiment-r+2",
      number: "04",
      title: "Bâtiment R+2 avec Édicule",
      category: "batiments-equipements",
      categoryLabel: "Bâtiments & Tertiaire",
      image: "assets/images/batiment_r4_page_1.jpg",
      pdfDoc: "assets/docs/Batiment_R+2_avec_Edicule.pdf",
      pdfTitle: "Dossier Technique & Modélisation 3D (PDF)",
      workDone: "Métré d'exécution structural complet, analyse des terrassements et de la poussée des terres sur les voiles de soutènement en sous-sol urbain, modélisation Robot Structural Analysis et nomenclatures d'aciers.",
      gallery: [
        { src: "assets/images/batiment_r4_page_1.jpg", label: "Page 1 - Rendu Architectural 3D & Façade" },
        { src: "assets/images/batiment_r4_page_2.jpg", label: "Page 2 - Structure Robot Analysis (Perspective A)" },
        { src: "assets/images/batiment_r4_page_3.jpg", label: "Page 3 - Structure Robot Analysis (Perspective B)" },
        { src: "assets/images/batiment_r4_page_4.jpg", label: "Page 4 - Structure Robot Analysis (Perspective C)" },
        { src: "assets/images/batiment_r4_page_5.jpg", label: "Page 5 - Structure Robot Analysis (Perspective D)" },
        { src: "assets/images/batiment_r4_page_6.jpg", label: "Page 6 - Vue en Plan de l'Ossature & Portiques" }
      ],
      client: "Promoteur Privé",
      role: "Responsable Section Béton & Étude de Prix (ECW Sarl)",
      duration: "2025",
      location: "Centre Urbain, Ouagadougou"
    },
    {
      id: "batiment-metal-r2",
      number: "05",
      title: "Bâtiment R+2 en Structure Métallique & Parpaing",
      category: "batiments-equipements",
      categoryLabel: "Bâtiments & Tertiaire",
      image: "assets/images/STRUCTURE MIXTE.jpeg",
      pdfDoc: "assets/docs/structure_mixte.pdf",
      workDone: "Conception structurale intégrale, notes de calcul de l'ossature métallique et des assemblages sous CypeCAD, suivi technique et contrôle de conformité des travaux.",
      client: "Ministère",
      role: "Chef de Service Étude (ECW Sarl)",
      duration: "2025",
      location: "Ouagadougou"
    },
    {
      id: "amphitheatre-350",
      number: "06",
      title: "Amphithéâtre Universitaire de 350 Places",
      category: "batiments-equipements",
      categoryLabel: "Bâtiments & Équipements",
      image: "assets/images/amphi_bobo.jpeg",
      pdfDoc: "assets/docs/amphithéatre.pdf",
      workDone: "Dimensionnement structural complet d'un édifice de grande portée sans appui intermédiaire, calculs des fermes de toiture.",
      client: "Établissement Universitaire",
      role: "Chef de Service Étude (ECW Sarl)",
      duration: "2025",
      location: "Campus Universitaire"
    },
    {
      id: "Bloc pédagogique",
      number: "07",
      title: "Bloc pédagogique R+2",
      category: "infrastructures-speciales",
      categoryLabel: "Infrastructures Spécialisées",
      image: "assets/images/Bloc_pédagogique.jpeg",
      pdfDoc: "assets/docs/BLOC_PEDAGOGIQUE.pdf",
      workDone: "Conduite des études d'avant-projet détaillé (APD)",
      client: "MINISTERE DE L’ENSEIGNEMENT SUPERIEUR, DE LA RECHERCHE SCIENTIFIQUE ET DE L’INNOVATION (MESRSI)",
      role: "Responsable Section Béton & Étude de Prix (ECW Sarl)",
      duration: "2025",
      location: "Burkina Faso"
    },
    {
      id: "Batiment R+2",
      number: "08",
      title: "Bâtiment administratif R+2",
      category: "infrastructures-speciales",
      categoryLabel: "Bâtiments",
      image: "assets/images/batiment_DG.jpeg",
      pdfDoc: "assets/docs/batiment_DG.pdf",
      workDone: "Établissement de l'avant projet détaillé.",
      client: "Entreprise de Construction Woumtaba (ECW) ",
      role: "Chef de Service Étude (ECW Sarl)",
      duration: "2025",
      location: "Ouagadougou, Burkina Faso"
    },
  ]
};
