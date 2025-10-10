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
    feelings: '',
    lessonsLearned: '',
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
        feelings: job.feelings || '',
        lessonsLearned: job.lessonsLearned || '',
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
        feelings: '',
        lessonsLearned: '',
      });
      setFollowUpDate(undefined);
    }
  }, [job, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.company.trim()) {
      toast({
        title: "Just a moment...",
        description: "Please share the role and company to continue your journey.",
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
        title: job ? "Journey updated ✨" : "Step added to your journey ✨",
        description: job 
          ? `${formData.title} at ${formData.company} has been updated.`
          : `${formData.title} at ${formData.company} is now part of your story.`,
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl animate-in fade-in-0 zoom-in-95">
        <DialogHeader className="space-y-3">
          <DialogTitle className="font-playfair text-3xl">
            {job ? 'Reflect on Your Journey' : 'Add a Step in Your Journey'}
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            {job ? 'Update your experience and thoughts' : 'Capture this opportunity and how it makes you feel'}
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-1">
            <h3 className="font-playfair text-lg mb-4">The Essentials</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">Role *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  placeholder="e.g., Senior Designer"
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  placeholder="e.g., Acme Studios"
                  required
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">Current Status</Label>
              <Select value={formData.status} onValueChange={(value) => updateFormData('status', value)}>
                <SelectTrigger className="rounded-xl">
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
              <Label htmlFor="source" className="text-sm font-medium">Where You Found It</Label>
              <Input
                id="source"
                value={formData.source}
                onChange={(e) => updateFormData('source', e.target.value)}
                placeholder="e.g., LinkedIn, Company Site"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                placeholder="e.g., Remote or City"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary" className="text-sm font-medium">Salary Range</Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => updateFormData('salary', e.target.value)}
                placeholder="e.g., $80k - $120k"
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-1 pt-4 border-t">
            <h3 className="font-playfair text-lg mb-4">Documents Shared</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="resumeUsed" className="text-sm font-medium">Resume Used</Label>
                <Input
                  id="resumeUsed"
                  value={formData.resumeUsed}
                  onChange={(e) => updateFormData('resumeUsed', e.target.value)}
                  placeholder="e.g., Resume_2024.pdf"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverLetterUsed" className="text-sm font-medium">Cover Letter Used</Label>
                <Input
                  id="coverLetterUsed"
                  value={formData.coverLetterUsed}
                  onChange={(e) => updateFormData('coverLetterUsed', e.target.value)}
                  placeholder="e.g., Cover_Letter.pdf"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-6 pt-4 border-t">
            <h3 className="font-playfair text-lg mb-4">More Details (Optional)</h3>
            
            <div className="space-y-2">
              <Label htmlFor="jobUrl" className="text-sm font-medium">Job Posting Link</Label>
              <Input
                id="jobUrl"
                type="url"
                value={formData.jobUrl}
                onChange={(e) => updateFormData('jobUrl', e.target.value)}
                placeholder="https://example.com/careers/job-posting"
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactPerson" className="text-sm font-medium">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => updateFormData('contactPerson', e.target.value)}
                  placeholder="e.g., Jane Smith"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-sm font-medium">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => updateFormData('contactEmail', e.target.value)}
                  placeholder="e.g., jane@company.com"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Role Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                placeholder="What excites you about this role?"
                rows={3}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">Notes & Reflections</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => updateFormData('notes', e.target.value)}
              placeholder="Jot down your thoughts, interview feedback, or key details..."
              rows={3}
              className="rounded-xl"
            />
          </div>

          {/* Journaling Fields */}
          <div className="space-y-6 pt-4 border-t">
            <h3 className="font-playfair text-lg">Your Inner Journey 🌿</h3>
            
            <div className="space-y-2">
              <Label htmlFor="feelings" className="text-sm font-medium">How did you feel after applying?</Label>
              <Textarea
                id="feelings"
                value={formData.feelings}
                onChange={(e) => updateFormData('feelings', e.target.value)}
                placeholder="Excited, nervous, hopeful, uncertain... there's no wrong answer"
                rows={2}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lessonsLearned" className="text-sm font-medium">Lessons learned or insights</Label>
              <Textarea
                id="lessonsLearned"
                value={formData.lessonsLearned}
                onChange={(e) => updateFormData('lessonsLearned', e.target.value)}
                placeholder="What did you discover about yourself or this process?"
                rows={2}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nextSteps" className="text-sm font-medium">Next Steps</Label>
              <Input
                id="nextSteps"
                value={formData.nextSteps}
                onChange={(e) => updateFormData('nextSteps', e.target.value)}
                placeholder="e.g., Follow up next week"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Follow-up Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-xl",
                      !followUpDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {followUpDate ? format(followUpDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                  <Calendar
                    mode="single"
                    selected={followUpDate}
                    onSelect={setFollowUpDate}
                    initialFocus
                    className="pointer-events-auto rounded-xl"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3 pt-8 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
              Maybe Later
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-primary hover:opacity-90 rounded-xl"
            >
              {isLoading ? 'Saving your journey...' : (job ? 'Update Journey' : 'Add to Journal')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}