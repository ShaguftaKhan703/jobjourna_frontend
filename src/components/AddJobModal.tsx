import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Job, JobFormData, JOB_STATUSES } from '@/types/job';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (job: JobFormData) => void;
  job?: Job;
}

export function AddJobModal({ isOpen, onClose, onSave, job }: AddJobModalProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [followUpDate, setFollowUpDate] = useState<Date>();
  
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    status: 'saved',
    source: '',
    resumeUsed: '',
    coverLetterUsed: '',
    description: '',
    notes: '',
    location: '',
    salary: '',
    jobUrl: '',
    contactPerson: '',
    contactEmail: '',
    nextSteps: '',
  });

  // Populate form when editing
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        company: job.company,
        status: job.status,
        source: job.source,
        resumeUsed: job.resumeUsed || '',
        coverLetterUsed: job.coverLetterUsed || '',
        description: job.description || '',
        notes: job.notes || '',
        location: job.location || '',
        salary: job.salary || '',
        jobUrl: job.jobUrl || '',
        contactPerson: job.contactPerson || '',
        contactEmail: job.contactEmail || '',
        nextSteps: job.nextSteps || '',
      });
      setFollowUpDate(job.followUpDate);
    } else {
      // Reset form for new job
      setFormData({
        title: '',
        company: '',
        status: 'saved',
        source: '',
        resumeUsed: '',
        coverLetterUsed: '',
        description: '',
        notes: '',
        location: '',
        salary: '',
        jobUrl: '',
        contactPerson: '',
        contactEmail: '',
        nextSteps: '',
      });
      setFollowUpDate(undefined);
    }
  }, [job, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.company.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in at least the job title and company.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      onSave({
        ...formData,
        followUpDate,
      });
      
      toast({
        title: job ? "Job updated!" : "Job added!",
        description: job 
          ? `${formData.title} at ${formData.company} has been updated.`
          : `${formData.title} at ${formData.company} has been added to your tracker.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            {job ? 'Edit Job Application' : 'Add New Job Application'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                placeholder="Software Engineer"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                placeholder="Tech Corp"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => updateFormData('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_STATUSES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                value={formData.source}
                onChange={(e) => updateFormData('source', e.target.value)}
                placeholder="LinkedIn, Indeed, Company Website"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => updateFormData('salary', e.target.value)}
                placeholder="$80k - $120k"
              />
            </div>
          </div>

          {/* Documents */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="resumeUsed">Resume Used</Label>
              <Input
                id="resumeUsed"
                value={formData.resumeUsed}
                onChange={(e) => updateFormData('resumeUsed', e.target.value)}
                placeholder="Software_Engineer_Resume_v2.pdf"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverLetterUsed">Cover Letter Used</Label>
              <Input
                id="coverLetterUsed"
                value={formData.coverLetterUsed}
                onChange={(e) => updateFormData('coverLetterUsed', e.target.value)}
                placeholder="Cover_Letter_TechCorp.pdf"
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <Label htmlFor="jobUrl">Job Posting URL</Label>
            <Input
              id="jobUrl"
              type="url"
              value={formData.jobUrl}
              onChange={(e) => updateFormData('jobUrl', e.target.value)}
              placeholder="https://example.com/job-posting"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => updateFormData('contactPerson', e.target.value)}
                placeholder="Jane Smith, HR Manager"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData('contactEmail', e.target.value)}
                placeholder="jane.smith@techcorp.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Brief description of the role and requirements..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => updateFormData('notes', e.target.value)}
              placeholder="Interview feedback, application insights, etc..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nextSteps">Next Steps</Label>
              <Input
                id="nextSteps"
                value={formData.nextSteps}
                onChange={(e) => updateFormData('nextSteps', e.target.value)}
                placeholder="Follow up, interview preparation, etc."
              />
            </div>
            <div className="space-y-2">
              <Label>Follow-up Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !followUpDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {followUpDate ? format(followUpDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={followUpDate}
                    onSelect={setFollowUpDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-primary hover:opacity-90"
            >
              {isLoading ? 'Saving...' : (job ? 'Update Job' : 'Add Job')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}