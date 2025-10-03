import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { JobCard } from '@/components/JobCard';
import { AddJobModal } from '@/components/AddJobModal';
import { Job, JobFormData, JOB_STATUSES } from '@/types/job';
import { Plus, Search, TrendingUp, Briefcase, Clock, CheckCircle, MoreVertical, Eye, Pencil, Trash2, LayoutGrid, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

export function Dashboard() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | undefined>();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // Mock data - in a real app, this would come from an API
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc',
      status: 'interviewing',
      source: 'LinkedIn',
      resumeUsed: 'Frontend_Resume_v3.pdf',
      coverLetterUsed: 'TechCorp_Cover_Letter.pdf',
      applicationDate: new Date('2024-01-15'),
      location: 'San Francisco, CA',
      salary: '$120k - $150k',
      description: 'Looking for an experienced React developer...',
      notes: 'Had first interview, waiting for technical round',
      nextSteps: 'Prepare for technical interview',
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      status: 'applied',
      source: 'Company Website',
      resumeUsed: 'Fullstack_Resume_v2.pdf',
      applicationDate: new Date('2024-01-20'),
      location: 'Remote',
      salary: '$100k - $130k',
      description: 'Join our growing team...',
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'Design Agency',
      status: 'offer',
      source: 'Indeed',
      resumeUsed: 'Frontend_Resume_v3.pdf',
      coverLetterUsed: 'Agency_Cover_Letter.pdf',
      applicationDate: new Date('2024-01-10'),
      location: 'New York, NY',
      salary: '$95k - $115k',
    },
  ]);

  // Filter and search jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = jobs.length;
    const applied = jobs.filter(j => j.status === 'applied').length;
    const interviewing = jobs.filter(j => j.status === 'interviewing').length;
    const offers = jobs.filter(j => j.status === 'offer').length;
    
    return { total, applied, interviewing, offers };
  }, [jobs]);

  const handleAddJob = (jobData: JobFormData) => {
    const newJob: Job = {
      id: Date.now().toString(),
      ...jobData,
      applicationDate: new Date(),
    };
    setJobs(prev => [newJob, ...prev]);
    setIsModalOpen(false);
  };

  const handleEditJob = (jobData: JobFormData) => {
    if (!editingJob) return;
    
    const updatedJob: Job = {
      ...editingJob,
      ...jobData,
    };
    
    setJobs(prev => prev.map(job => job.id === editingJob.id ? updatedJob : job));
    setEditingJob(undefined);
    setIsModalOpen(false);
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
    toast({
      title: "Job deleted",
      description: "The job application has been removed from your tracker.",
    });
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingJob(undefined);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Track and manage your job applications
            </p>
          </div>
          <Button onClick={openAddModal} className="bg-gradient-primary hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Active job applications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applied</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sapphire-blue">{stats.applied}</div>
              <p className="text-xs text-muted-foreground">
                Waiting for response
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviewing</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-dusty-coral">{stats.interviewing}</div>
              <p className="text-xs text-muted-foreground">
                In progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offers</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-velvet-rose">{stats.offers}</div>
              <p className="text-xs text-muted-foreground">
                Received offers
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Job Applications</CardTitle>
          <CardDescription>
            Manage and track your job application progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {JOB_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Jobs View */}
          {filteredJobs.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={openEditModal}
                    onDelete={handleDeleteJob}
                    onView={openEditModal}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.map((job) => {
                      const statusInfo = JOB_STATUSES.find(s => s.value === job.status);
                      return (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>{job.location || '-'}</TableCell>
                          <TableCell>
                            <Badge className={statusInfo?.color}>
                              {statusInfo?.label}
                            </Badge>
                          </TableCell>
                          <TableCell>{job.source}</TableCell>
                          <TableCell>
                            {formatDistanceToNow(job.applicationDate, { addSuffix: true })}
                          </TableCell>
                          <TableCell>{job.salary || '-'}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditModal(job)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openEditModal(job)}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteJob(job.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No jobs found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Add your first job application to get started'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button onClick={openAddModal} className="mt-4 bg-gradient-primary hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Job
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(undefined);
        }}
        onSave={editingJob ? handleEditJob : handleAddJob}
        job={editingJob}
      />
    </div>
  );
}