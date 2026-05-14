import type { Dict } from './types';

const dict: Dict = {
  meta: {
    title: 'Sebastian Garcia - Ingénieur logiciel à Bogotá, Colombie',
    description:
      'Sebastian Garcia, ingénieur logiciel basé à Bogotá, Colombie. Conçoit des plateformes full-stack, des microservices cloud et des systèmes à grande échelle chez Scotiabank.',
  },
  nav: {
    about: 'À propos',
    resume: 'CV',
    contact: 'Contact',
    skipToContent: 'Aller au contenu',
  },
  about: {
    title: "J'suis Sebastian Garcia",
    subtitle:
      'Ingénieur full-stack qui conçoit des plateformes fintech à grande échelle et des systèmes cloud-native.',
    bio: 'Je suis ingénieur logiciel full-stack avec plus de {years} ans d’expérience dans la conception de plateformes fintech d’entreprise et de systèmes cloud-native, sur les écosystèmes Java, C# et JavaScript. J’ai dirigé des équipes pluridisciplinaires pour moderniser des services à fort trafic - en renforçant la sécurité, en migrant des microservices vers GCP et en accélérant les livraisons sans interruption. J’aime concevoir des architectures propres et évolutives, et trouver des façons intelligentes de concilier les priorités métier et les arbitrages d’ingénierie.',
    pageIndex: 'À propos  |  P/01',
    imageAlt: 'Portrait de Sebastian Garcia',
  },
  resume: {
    title: 'CV.',
    pageIndex: 'CV  |  P/02',
    sections: {
      certifications: 'Certifications',
      skills: 'Compétences',
      education: 'Formation',
      experience: 'Expérience',
      additionalExperience: 'Expérience complémentaire',
    },
    skills: {
      backendApis: {
        label: 'Backend et APIs',
        items:
          'Java (Expert), C#, Python (Expert), SQL, NoSQL, Spring, .NET Core, REST/SOAP, Microservices, Kafka, OAuth2 / JWT.',
        alt: 'Icône backend et APIs',
      },
      webMobile: {
        label: 'Technologies web et mobiles',
        items: 'ReactJS, Angular, JavaScript, TypeScript, HTML, SCSS, Flutter, Swift.',
        alt: 'Icône des technologies web et mobiles',
      },
      cloudDevOpsTools: {
        label: 'Cloud, DevOps et outils',
        items:
          'Google Cloud Platform (GCP), Microsoft Azure, Amazon Web Services (AWS), Kubernetes, Intégration et Livraison Continues (CI/CD), Méthodologies agiles, Jira, Confluence, Jenkins, Git, Dynatrace, Splunk.',
        alt: 'Icône Cloud, DevOps et outils',
      },
    },
    certifications: [
      {
        title: 'Spécialisation CCSP (Pearson)',
        date: 'août 2025',
        issuer: 'Coursera',
        verifyUrl: 'https://coursera.org/verify/specialization/FOAG4X64PJQM',
      },
      {
        title: 'Google Cloud Fundamentals: Core Infrastructure',
        date: 'août 2025',
        issuer: 'Google Cloud',
        verifyUrl: 'https://coursera.org/verify/TPIW3878UR0L',
      },
      {
        title: 'Cybersécurité avec le Cloud Computing',
        date: 'août 2025',
        issuer: 'LinkedIn Learning',
      },
      {
        title: 'Cryptographie et sécurité des réseaux',
        date: 'août 2025',
        issuer: 'LinkedIn Learning',
      },
      {
        title: 'Fondamentaux de la sécurité informatique : concepts clés',
        date: 'août 2025',
        issuer: 'LinkedIn Learning',
      },
      {
        title: 'Gestion des identités et des accès',
        date: 'août 2025',
        issuer: 'LinkedIn Learning',
      },
      {
        title: 'Réseaux de neurones et Deep Learning',
        date: '2021',
        issuer: 'DeepLearning.AI',
      },
    ],
    education: [
      {
        school: 'Université des Andes',
        period: '2016 – 2021',
        degree: 'Licence en génie des systèmes et informatique',
      },
      {
        school: 'Lycée Vermont',
        period: '2016',
        degree: 'Baccalauréat International',
      },
    ],
    experience: [
      {
        company: 'Scotia GBS Colombia / Scotiabank',
        role: 'Software Engineer Specialist',
        period: 'janv. 2022 – présent',
        bullets: [
          'Dirigé le développement de plateformes de financement automobile avec Java, C# et React, améliorant l’efficacité du traitement de plus de 200 demandes de crédit mensuelles.',
          'Dirigé le renforcement de la sécurité de systèmes hérités, atténuant les vulnérabilités critiques et garantissant la conformité sans interruption de service.',
          'Dirigé une équipe pluridisciplinaire de développeurs dans la modernisation des microservices cloud, accélérant les cycles de développement de 50% et assurant une migration cloud fluide d’Azure vers GCP.',
          'Intégré les systèmes internes de financement aux plateformes des constructeurs, augmentant les taux de conversion sur le marché automobile canadien.',
          'Lauréat du Prix de la Meilleure Performance Individuelle en 2023 et 2025 pour des contributions remarquables au développement logiciel.',
        ],
      },
      {
        company: 'Mayasoft / MINT Software Systems',
        role: 'Développeur logiciel',
        period: 'avr. 2021 – déc. 2021',
        bullets: [
          'Développé TMS Web, une plateforme cloud avec Java, Python et Angular, automatisant des processus pour plus de 20 compagnies aériennes européennes et entreprises de la chaîne d’approvisionnement.',
          'Tiré parti des outils d’automatisation AWS pour rationaliser l’intégration des clients, réduisant le temps de 60%.',
          'Organisé et mis en œuvre des frameworks d’automatisation de planification, améliorant l’allocation des ressources et garantissant la conformité réglementaire.',
        ],
      },
      {
        company: 'Imagine Apps',
        role: 'Développeur full-stack junior',
        period: 'mars 2020 – avr. 2021',
        bullets: [
          'Acquis une expérience pratique dans une start-up en croissance rapide, pilotant des itérations produit avec des ressources limitées et des délais serrés.',
          'Construit et conçu des solutions e-commerce et CRM créatives avec NodeJS, Angular, Flutter et Java, augmentant les ventes clients de 15% et la rétention de 10% pour des PME colombiennes.',
          'Collaboré avec les parties prenantes pour définir les besoins métier et accompagner le cycle de vie complet des produits logiciels.',
        ],
      },
    ],
    additionalExperience: [
      {
        company: 'Université des Andes',
        role: 'Assistant d’enseignement',
        period: 'août 2017 – déc. 2018',
        bullets: [
          'Enseigné le développement full-stack et la conception d’API avec Java, React, NoSQL et Jenkins.',
          'Accompagné des étudiants dans leurs projets de code, renforçant leurs compétences en résolution de problèmes.',
        ],
      },
    ],
  },
  contact: {
    title: 'Contact.',
    pageIndex: 'Contact  |  P/03',
    labels: {
      mail: 'E-mail',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    imageAlt: 'Vue de Bogotá, Colombie',
  },
  footer: {
    role: 'Ingénieur logiciel',
    location: 'Bogotá, Colombie',
    languageNavLabel: 'Langue',
  },
};

export default dict;
