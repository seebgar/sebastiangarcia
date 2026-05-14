import type { Dict } from './types';

const dict: Dict = {
  meta: {
    title: 'Sebastian Garcia - Ingeniero de software en Bogotá, Colombia',
    description:
      'Sebastian Garcia, ingeniero de software en Bogotá, Colombia. Construye plataformas full-stack, microservicios en la nube y sistemas a gran escala en Scotiabank.',
  },
  nav: {
    about: 'Sobre mí',
    resume: 'CV',
    contact: 'Contacto',
    skipToContent: 'Saltar al contenido',
  },
  about: {
    title: 'Sebastian Garcia',
    subtitle:
      'Ingeniero full-stack construyendo plataformas fintech a gran escala y sistemas nativos en la nube.',
    bio: 'Soy ingeniero de software full-stack con más de {years} años de experiencia construyendo plataformas fintech empresariales y sistemas nativos en la nube en los ecosistemas de Java, C# y JavaScript. He liderado equipos multifuncionales en la modernización de servicios de alto tráfico - endureciendo la seguridad, migrando microservicios a GCP y acelerando las entregas sin interrupciones. Disfruto diseñando arquitecturas limpias y escalables, y encontrando formas inteligentes de conciliar las prioridades de negocio con las decisiones de ingeniería.',
    pageIndex: 'Sobre mí  |  P/01',
    imageAlt: 'Retrato de Sebastian Garcia',
  },
  resume: {
    title: 'CV.',
    pageIndex: 'CV  |  P/02',
    sections: {
      certifications: 'Certificaciones',
      skills: 'Habilidades',
      education: 'Educación',
      experience: 'Experiencia',
      additionalExperience: 'Experiencia adicional',
    },
    skills: {
      backendApis: {
        label: 'Backend y APIs',
        items:
          'Java (Experto), C#, Python (Experto), SQL, NoSQL, Spring, .NET Core, REST/SOAP, Microservicios, Kafka, OAuth2 / JWT.',
        alt: 'Ícono de backend y APIs',
      },
      webMobile: {
        label: 'Tecnologías web y móviles',
        items: 'ReactJS, Angular, JavaScript, TypeScript, HTML, SCSS, Flutter, Swift.',
        alt: 'Ícono de tecnologías web y móviles',
      },
      cloudDevOpsTools: {
        label: 'Nube, DevOps y herramientas',
        items:
          'Google Cloud Platform (GCP), Microsoft Azure, Amazon Web Services (AWS), Kubernetes, Integración y Entrega Continuas (CI/CD), Metodologías ágiles, Jira, Confluence, Jenkins, Git, Dynatrace, Splunk.',
        alt: 'Ícono de nube, DevOps y herramientas',
      },
    },
    certifications: [
      {
        title: 'Especialización CCSP (Pearson)',
        date: 'Ago 2025',
        issuer: 'Coursera',
        verifyUrl: 'https://coursera.org/verify/specialization/FOAG4X64PJQM',
      },
      {
        title: 'Google Cloud Fundamentals: Core Infrastructure',
        date: 'Ago 2025',
        issuer: 'Google Cloud',
        verifyUrl: 'https://coursera.org/verify/TPIW3878UR0L',
      },
      {
        title: 'Ciberseguridad con Cloud Computing',
        date: 'Ago 2025',
        issuer: 'LinkedIn Learning',
      },
      {
        title: 'Criptografía y Seguridad de Redes',
        date: 'Ago 2025',
        issuer: 'LinkedIn Learning',
      },
      {
        title: 'Fundamentos de Seguridad TI: Conceptos básicos',
        date: 'Ago 2025',
        issuer: 'LinkedIn Learning',
      },
      {
        title: 'Gestión de Identidad y Accesos',
        date: 'Ago 2025',
        issuer: 'LinkedIn Learning',
      },
      {
        title: 'Redes Neuronales y Deep Learning',
        date: '2021',
        issuer: 'DeepLearning.AI',
      },
    ],
    education: [
      {
        school: 'Universidad de los Andes',
        period: '2016 – 2021',
        degree: 'Ingeniería de Sistemas y Computación',
      },
      {
        school: 'Colegio Gimnasio Vermont',
        period: '2016',
        degree: 'Bachillerato Internacional',
      },
    ],
    experience: [
      {
        company: 'Scotia GBS Colombia / Scotiabank',
        role: 'Software Engineer Specialist',
        period: 'Ene 2022 – Actualidad',
        bullets: [
          'Lideré el desarrollo de plataformas de financiación automotriz con Java, C# y React, mejorando la eficiencia en el procesamiento de más de 200 solicitudes de crédito mensuales.',
          'Lideré el endurecimiento de la seguridad de sistemas legados, mitigando vulnerabilidades críticas y garantizando el cumplimiento sin interrupciones del servicio.',
          'Lideré un equipo multifuncional de desarrolladores en la modernización de microservicios en la nube, acelerando los ciclos de desarrollo en un 50% y asegurando una migración fluida de Azure a GCP.',
          'Integré sistemas internos de financiación con plataformas de fabricantes, aumentando las tasas de conversión en el mercado automotriz canadiense.',
          'Reconocido con el Premio al Mejor Desempeño Individual en 2023 y 2025 por contribuciones destacadas al desarrollo de software.',
        ],
      },
      {
        company: 'Mayasoft / MINT Software Systems',
        role: 'Desarrollador de software',
        period: 'Abr 2021 – Dic 2021',
        bullets: [
          'Desarrollé TMS Web, una plataforma en la nube con Java, Python y Angular, automatizando procesos para más de 20 aerolíneas europeas y empresas de cadena de suministro.',
          'Aproveché herramientas de automatización de AWS para optimizar la incorporación de clientes, reduciendo el tiempo en un 60%.',
          'Organicé e implementé marcos de automatización de programación, mejorando la asignación de recursos y garantizando el cumplimiento normativo.',
        ],
      },
      {
        company: 'Imagine Apps',
        role: 'Desarrollador full-stack junior',
        period: 'Mar 2020 – Abr 2021',
        bullets: [
          'Adquirí experiencia práctica en una start-up de ritmo acelerado, liderando iteraciones de producto con recursos limitados y plazos ajustados.',
          'Construí y diseñé soluciones creativas de e-commerce y CRM con NodeJS, Angular, Flutter y Java, aumentando las ventas de los clientes en un 15% y la retención en un 10% para pymes colombianas.',
          'Colaboré con stakeholders para definir requisitos de negocio y acompañar el ciclo de vida completo de productos de software.',
        ],
      },
    ],
    additionalExperience: [
      {
        company: 'Universidad de los Andes',
        role: 'Monitor académico',
        period: 'Ago 2017 – Dic 2018',
        bullets: [
          'Enseñé desarrollo full-stack y diseño de APIs con Java, React, NoSQL y Jenkins.',
          'Acompañé a estudiantes en sus proyectos de código, fortaleciendo sus habilidades de resolución de problemas.',
        ],
      },
    ],
  },
  contact: {
    title: 'Contacto.',
    pageIndex: 'Contacto  |  P/03',
    labels: {
      mail: 'Correo',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    imageAlt: 'Vista de Bogotá, Colombia',
  },
  footer: {
    role: 'Ingeniero de software',
    location: 'Bogotá, Colombia',
    languageNavLabel: 'Idioma',
  },
};

export default dict;
