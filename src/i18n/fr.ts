import type { Dict } from "./types";

const dict: Dict = {
  meta: {
    title: "Sebastian Garcia",
    description: "CV de Sebastian Garcia.",
  },
  nav: {
    about: "À propos",
    resume: "CV",
    contact: "Contact",
  },
  about: {
    title: "Je suis Sebastian Garcia",
    subtitle: "Ingénieur logiciel spécialisé en développement full-stack.",
    bio: "Au fil des années, j’ai conçu et optimisé des systèmes à grande échelle, dans des start-ups comme dans de grandes entreprises. J’aime concevoir des architectures propres et évolutives, et résoudre des problèmes d’ingénierie complexes par la collaboration et l’itération. Je m’intéresse aussi aux technologies cloud, aux pratiques de développement modernes et aux moyens intelligents de réduire la complexité.",
    pageIndex: "À propos  |  P/01",
    imageAlt: "Portrait de Sebastian Garcia",
  },
  resume: {
    title: "CV.",
    pageIndex: "CV  |  P/02",
    sections: {
      education: "Formation",
      skills: "Compétences",
      experience: "Expérience",
      additionalExperience: "Expérience complémentaire",
    },
    skills: {
      programmingLanguages: {
        label: "Langages de programmation",
        items: "Java (Expert), Python (Expert), .Net C# (3+ ans), SQL, NoSQL.",
        alt: "Icône des langages de programmation",
      },
      webMobile: {
        label: "Technologies web et mobiles",
        items:
          "ReactJS, Angular, JavaScript, TypeScript, HTML, SCSS, Flutter, Swift.",
        alt: "Icône des technologies web et mobiles",
      },
      cloudDevOps: {
        label: "Cloud et DevOps",
        items:
          "Google Cloud Platform (GCP), Microsoft Azure, Amazon Web Services (AWS), Kubernetes, Intégration et Livraison Continues (CI/CD), Méthodologies agiles.",
        alt: "Icône Cloud et DevOps",
      },
    },
    education: [
      {
        school: "Université des Andes",
        period: "2016 – 2021",
        degree: "Licence en génie des systèmes et informatique",
      },
      {
        school: "DeepLearning.AI",
        period: "2021",
        degree: "Certificat — Réseaux de neurones et Deep Learning",
      },
      {
        school: "Vermont High School",
        period: "2016",
        degree: "Baccalauréat International",
      },
    ],
    experience: [
      {
        company: "Scotia GBS Colombia / Scotiabank",
        role: "Ingénieur logiciel full-stack",
        period: "janv. 2022 – présent",
        bullets: [
          "Dirigé le développement de plateformes de financement automobile avec Java, C# et React, améliorant l’efficacité du traitement de plus de 200 demandes de crédit mensuelles.",
          "Dirigé le renforcement de la sécurité de systèmes hérités, atténuant les vulnérabilités critiques et garantissant la conformité sans interruption de service.",
          "Dirigé une équipe pluridisciplinaire de développeurs dans la modernisation des microservices cloud, accélérant les cycles de développement de 50% et assurant une migration cloud fluide d’Azure vers GCP.",
          "Intégré les systèmes internes de financement aux plateformes des constructeurs, augmentant les taux de conversion sur le marché automobile canadien.",
          "Lauréat du Prix de la Meilleure Performance Individuelle en 2023 et 2025 pour des contributions remarquables au développement logiciel.",
        ],
      },
      {
        company: "Mayasoft / MINT Software Systems",
        role: "Développeur logiciel",
        period: "avr. 2021 – déc. 2021",
        bullets: [
          "Développé TMS Web, une plateforme cloud avec Java, Python et Angular, automatisant des processus pour plus de 20 compagnies aériennes européennes et entreprises de la chaîne d’approvisionnement.",
          "Tiré parti des outils d’automatisation AWS pour rationaliser l’intégration des clients, réduisant le temps de 60%.",
          "Organisé et mis en œuvre des frameworks d’automatisation de planification, améliorant l’allocation des ressources et garantissant la conformité réglementaire.",
        ],
      },
      {
        company: "Imagine Apps",
        role: "Développeur full-stack junior",
        period: "mars 2020 – avr. 2021",
        bullets: [
          "Acquis une expérience pratique dans une start-up en croissance rapide, pilotant des itérations produit avec des ressources limitées et des délais serrés.",
          "Construit et conçu des solutions e-commerce et CRM créatives avec NodeJS, Angular, Flutter et Java, augmentant les ventes clients de 15% et la rétention de 10% pour des PME colombiennes.",
          "Collaboré avec les parties prenantes pour définir les besoins métier et accompagner le cycle de vie complet des produits logiciels.",
        ],
      },
    ],
    additionalExperience: [
      {
        company: "Université des Andes",
        role: "Assistant d’enseignement",
        bullets: [
          "Enseigné le développement full-stack et la conception d’API avec Java, React, NoSQL et Jenkins.",
          "Accompagné des étudiants dans leurs projets de code, renforçant leurs compétences en résolution de problèmes.",
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    pageIndex: "Contact  |  P/03",
    labels: {
      mail: "E-mail",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    imageAlt: "Vue de Bogotá, Colombie",
  },
  footer: {
    role: "Ingénieur logiciel",
    location: "Bogotá, Colombie",
    languageNavLabel: "Langue",
  },
};

export default dict;
