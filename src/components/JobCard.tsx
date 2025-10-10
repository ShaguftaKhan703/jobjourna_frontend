import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job, JOB_STATUSES } from '@/types/job';
import { MoreHorizontal, ExternalLink, Calendar, FileText, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (jobId: string) => void;
  onView: (job: Job) => void;
}

export function JobCard({ job, onEdit, onDelete, onView }: JobCardProps) {
  const status = JOB_STATUSES.find(s => s.value === job.status);
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary cursor-pointer rounded-2xl hover:scale-[1.02]">
      <CardHeader className="pb-4 p-8">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1 min-w-0">
            <h3 className="font-playfair font-semibold text-xl truncate group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-muted-foreground font-medium text-base">
              {job.company}
            </p>
            {job.location && (
              <p className="text-sm text-muted-foreground">
                {job.location}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <Badge 
              variant="secondary" 
              className={`${status?.color} text-white border-none`}
            >
              {status?.label}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(job)}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(job)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(job.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <User className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 p-8 pt-0">
        {/* Documents used */}
        <div className="space-y-2">
          {job.resumeUsed && (
            <div className="flex items-center text-sm text-muted-foreground">
              <FileText className="mr-2 h-4 w-4" />
              <span className="truncate">Resume: {job.resumeUsed}</span>
            </div>
          )}
          {job.coverLetterUsed && (
            <div className="flex items-center text-sm text-muted-foreground">
              <FileText className="mr-2 h-4 w-4" />
              <span className="truncate">Cover: {job.coverLetterUsed}</span>
            </div>
          )}
        </div>
        
        {/* Source and date */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t">
          <span className="font-medium">
            via {job.source}
          </span>
          <div className="flex items-center">
            <Calendar className="mr-1.5 h-4 w-4" />
            <span>
              {formatDistanceToNow(job.applicationDate, { addSuffix: true })}
            </span>
          </div>
        </div>
        
        {/* Salary if available */}
        {job.salary && (
          <div className="text-base font-medium text-velvet-rose">
            {job.salary}
          </div>
        )}
      </CardContent>
    </Card>
  );
}