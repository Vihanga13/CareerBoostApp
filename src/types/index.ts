declare module '@react-navigation/native';

export interface JobListing {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    requirements: string[];
    datePosted: string;
}

export interface Resume {
    name: string;
    email: string;
    phone: string;
    education: Education[];
    experience: Experience[];
    skills: string[];
}

export interface Education {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
}

export interface Experience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
}

export interface SkillMatch {
    skill: string;
    matchedJobs: JobListing[];
}

export interface InterviewTip {
    id: string;
    tip: string;
}

export interface Quiz {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
}