import type { Dict } from './types';

const dict: Dict = {
  meta: {
    title: 'Sebastian Garcia - Software Engineer in Bogotá, Colombia',
    description:
      'Sebastian Garcia is a software engineer based in Bogotá, Colombia, building full-stack platforms, cloud microservices and large-scale systems at Scotiabank.',
  },
  nav: {
    about: 'About',
    resume: 'Resume',
    contact: 'Contact',
    skipToContent: 'Skip to content',
  },
  about: {
    title: "I'm Sebastian Garcia",
    subtitle: 'Full-stack engineer building enterprise-scale fintech and cloud-native platforms.',
    bio: "I'm a full-stack software engineer with {years}+ years of experience building enterprise fintech platforms and cloud-native systems across Java, C#, and JavaScript ecosystems. I've led cross-functional teams modernizing high-traffic services — hardening security, migrating microservices to GCP, and accelerating delivery without disruption. I enjoy designing clean, scalable architectures and finding smart ways to bridge business priorities with engineering trade-offs.",
    pageIndex: 'About  |  P/01',
    imageAlt: 'Portrait of Sebastian Garcia',
  },
  resume: {
    title: 'Resume.',
    pageIndex: 'Resume  |  P/02',
    sections: {
      certifications: 'Certifications',
      skills: 'Skills',
      education: 'Education',
      experience: 'Experience',
      additionalExperience: 'Additional Experience',
    },
    skills: {
      backendApis: {
        label: 'Backend & APIs',
        items:
          'Java (Expert), C#, Python (Expert), SQL, NoSQL, Spring, .NET Core, REST/SOAP, Microservices, Kafka, OAuth2 / JWT.',
        alt: 'Backend and APIs icon',
      },
      webMobile: {
        label: 'Web and Mobile Technologies',
        items: 'ReactJS, Angular, JavaScript, TypeScript, HTML, SCSS, Flutter, Swift.',
        alt: 'Web and mobile technologies icon',
      },
      cloudDevOpsTools: {
        label: 'Cloud, DevOps & Tools',
        items:
          'Google Cloud Platform (GCP), Microsoft Azure, Amazon Web Services (AWS), Kubernetes, Continuous Integration and Continuous Delivery (CI/CD), Agile Methodologies, Jira, Confluence, Jenkins, Git, Dynatrace, Splunk.',
        alt: 'Cloud, DevOps and tools icon',
      },
    },
    certifications: [
      {
        title: 'CCSP Specialization (Pearson)',
        date: 'Aug 2025',
        issuer: 'Coursera',
        verifyUrl: 'https://coursera.org/verify/specialization/FOAG4X64PJQM',
      },
      {
        title: 'Google Cloud Fundamentals: Core Infrastructure',
        date: 'Aug 2025',
        issuer: 'Google Cloud',
        verifyUrl: 'https://coursera.org/verify/TPIW3878UR0L',
      },
      {
        title: 'Cybersecurity with Cloud Computing',
        date: 'Aug 2025',
        issuer: 'LinkedIn Learning',
      },
      {
        title: 'Cryptography and Network Security',
        date: 'Aug 2025',
        issuer: 'LinkedIn Learning',
      },
      {
        title: 'IT Security Foundations: Core Concepts',
        date: 'Aug 2025',
        issuer: 'LinkedIn Learning',
      },
      {
        title: 'Identity and Access Management',
        date: 'Aug 2025',
        issuer: 'LinkedIn Learning',
      },
      {
        title: 'Neural Networks and Deep Learning',
        date: '2021',
        issuer: 'DeepLearning.AI',
      },
    ],
    education: [
      {
        school: 'University of the Andes',
        period: '2016 – 2021',
        degree: 'Bachelor of Engineering in Computer & Systems',
      },
      {
        school: 'Vermont High School',
        period: '2016',
        degree: 'International Baccalaureate',
      },
    ],
    experience: [
      {
        company: 'Scotia GBS Colombia / Scotiabank',
        role: 'Full-Stack Software Engineer',
        period: 'Jan 2022 – Present',
        bullets: [
          'Led development of Automotive Financing platforms using Java, C#, and React, improving efficiency in processing 200+ monthly credit applications.',
          'Led security hardening of legacy systems, successfully mitigating critical vulnerabilities and ensuring compliance without service disruptions.',
          'Led a cross-functional team of developers in modernizing cloud microservices, accelerating development cycles by 50% and ensuring seamless cloud migration from Azure to GCP.',
          'Integrated internal financing systems with manufacturer platforms, increasing conversion rates in Canada’s automotive market.',
          'Recognized with the 2023 and 2025 Top Individual Performance Award for outstanding contributions to software development.',
        ],
      },
      {
        company: 'Mayasoft / MINT Software Systems',
        role: 'Software Developer',
        period: 'Apr 2021 – Dec 2021',
        bullets: [
          'Developed TMS Web, a cloud-based platform using Java, Python, and Angular, automating processes for 20+ European airlines and supply-chain companies.',
          'Leveraged AWS automation tools to streamline customer onboarding, reducing time by 60%.',
          'Organized and implemented scheduling automation frameworks, enhancing resource allocation and ensuring regulatory compliance.',
        ],
      },
      {
        company: 'Imagine Apps',
        role: 'Junior Full-Stack Developer',
        period: 'Mar 2020 – Apr 2021',
        bullets: [
          'Gained hands-on experience in a fast-paced startup, leading product iterations with limited resources and tight timelines.',
          'Built and designed creative e-commerce and CRM solutions using NodeJS, Angular, Flutter, and Java, increasing client sales by 15% and retention by 10% for Colombian SMEs.',
          'Collaborated with stakeholders to define business requirements and support end-to-end software product life cycles.',
        ],
      },
    ],
    additionalExperience: [
      {
        company: 'University of the Andes',
        role: 'Teaching Assistant',
        period: 'Aug 2017 – Dec 2018',
        bullets: [
          'Taught full-stack development and API design using Java, React, NoSQL, and Jenkins.',
          'Mentored students on coding projects, strengthening their problem-solving skills.',
        ],
      },
    ],
  },
  contact: {
    title: 'Contact',
    pageIndex: 'Contact  |  P/03',
    labels: {
      mail: 'Mail',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    imageAlt: 'Bogotá, Colombia skyline',
  },
  footer: {
    role: 'Software Engineer',
    location: 'Bogotá, Colombia',
    languageNavLabel: 'Language',
  },
};

export default dict;
