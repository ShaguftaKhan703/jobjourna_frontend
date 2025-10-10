export interface Job {
  id: string;
  title: string;
  company: string;
  status: 'applied' | 'interviewing' | 'offer' | 'rejected' | 'saved';
  resumeUsed?: string;
  coverLetterUsed?: string;
  source: string;
  applicationDate: Date;
  description?: string;
  notes?: string;
  location?: string;
  salary?: string;
  jobUrl?: string;
  contactPerson?: string;
  contactEmail?: string;
  nextSteps?: string;
  followUpDate?: Date;
  feelings?: string;
  lessonsLearned?: string;
}

export interface JobFormData {
  title: string;
  company: string;
  status: Job['status'];
  resumeUsed?: string;
  coverLetterUsed?: string;
  source: string;
  description?: string;
  notes?: string;
  location?: string;
  salary?: string;
  jobUrl?: string;
  contactPerson?: string;
  contactEmail?: string;
  nextSteps?: string;
  followUpDate?: Date;
  feelings?: string;
  lessonsLearned?: string;
}

export const JOB_STATUSES = [
  { value: 'saved', label: 'Saved', color: 'bg-status-saved' },
  { value: 'applied', label: 'Applied', color: 'bg-status-applied' },
  { value: 'interviewing', label: 'Interviewing', color: 'bg-dusty-coral' },
  { value: 'offer', label: 'Offer', color: 'bg-status-offer' },
  { value: 'rejected', label: 'Rejected', color: 'bg-status-rejected' },
] as const;