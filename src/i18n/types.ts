export type Locale = 'en' | 'es' | 'fr';

export interface SkillCategory {
  label: string;
  items: string;
  alt: string;
}

export interface EducationEntry {
  school: string;
  period: string;
  degree: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface AdditionalExperienceEntry {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface CertificationEntry {
  title: string;
  date: string;
  issuer: string;
  verifyUrl?: string;
}

export interface Dict {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    resume: string;
    contact: string;
    skipToContent: string;
  };
  about: {
    title: string;
    subtitle: string;
    bio: string;
    pageIndex: string;
    imageAlt: string;
  };
  resume: {
    title: string;
    pageIndex: string;
    sections: {
      certifications: string;
      skills: string;
      education: string;
      experience: string;
      additionalExperience: string;
    };
    skills: {
      backendApis: SkillCategory;
      webMobile: SkillCategory;
      cloudDevOpsTools: SkillCategory;
    };
    certifications: CertificationEntry[];
    education: EducationEntry[];
    experience: ExperienceEntry[];
    additionalExperience: AdditionalExperienceEntry[];
  };
  contact: {
    title: string;
    pageIndex: string;
    labels: {
      mail: string;
      linkedin: string;
      github: string;
    };
    imageAlt: string;
  };
  footer: {
    role: string;
    location: string;
    languageNavLabel: string;
  };
}
