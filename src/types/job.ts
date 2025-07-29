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
}

export const JOB_STATUSES = [
  { value: 'saved', label: 'Saved', color: 'bg-muted' },
  { value: 'applied', label: 'Applied', color: 'bg-sapphire-blue' },
  { value: 'interviewing', label: 'Interviewing', color: 'bg-dusty-coral' },
  { value: 'offer', label: 'Offer', color: 'bg-velvet-rose' },
  { value: 'rejected', label: 'Rejected', color: 'bg-destructive' },
] as const;