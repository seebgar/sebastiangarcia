import type { Dict } from './types';

const dict: Dict = {
  meta: {
    title: 'Sebastian Garcia — Software Engineer in Bogotá, Colombia',
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
    subtitle: 'Software engineer focused on full-stack development.',
    bio: 'Over the years, I’ve built and optimized large-scale systems in both start-ups and enterprises. I enjoy designing clean, scalable architectures and solving tough engineering problems through collaboration and iteration. I’m also drawn to cloud technologies, modern development practices, and finding smart ways to reduce complexity.',
    pageIndex: 'About  |  P/01',
    imageAlt: 'Portrait of Sebastian Garcia',
  },
  resume: {
    title: 'Resume.',
    pageIndex: 'Resume  |  P/02',
    sections: {
      education: 'Education',
      skills: 'Skills',
      experience: 'Experience',
      additionalExperience: 'Additional Experience',
    },
    skills: {
      programmingLanguages: {
        label: 'Programming Languages',
        items: 'Java (Expert), Python (Expert), .Net C# (3+ years), SQL, NoSQL.',
        alt: 'Programming languages icon',
      },
      webMobile: {
        label: 'Web and Mobile Technologies',
        items: 'ReactJS, Angular, JavaScript, TypeScript, HTML, SCSS, Flutter, Swift.',
        alt: 'Web and mobile technologies icon',
      },
      cloudDevOps: {
        label: 'Cloud & DevOps',
        items:
          'Google Cloud Platform (GCP), Microsoft Azure, Amazon Web Services (AWS), Kubernetes, Continuous Integration and Continuous Delivery (CI/CD), Agile Methodologies.',
        alt: 'Cloud and DevOps icon',
      },
    },
    education: [
      {
        school: 'University of the Andes',
        period: '2016 – 2021',
        degree: 'Bachelor of Engineering in Computer & Systems',
      },
      {
        school: 'Deep Learning AI Certificate',
        period: '2021',
        degree: 'Neural Networks and Deep Learning',
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
        bullets: [
          'Taught full-stack development and API design using Java, React, NoSQL, and Jenkins.',
          'Mentored students on coding projects, strengthening their problem-solving skills.',
        ],
      },
    ],
  },
  contact: {
    title: 'Contact',
    pageIndex: 'Contact  |  P/03',
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
