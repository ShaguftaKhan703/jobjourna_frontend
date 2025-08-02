import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Puzzle, Chrome, Globe, ArrowRight, Mail, Briefcase, MousePointer, Eye, Building2, Search } from 'lucide-react';

export function Extensions() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold">Browser Extensions</h1>
        <p className="text-muted-foreground text-lg">
          Automate your job search with powerful browser extensions for Chrome and Firefox
        </p>
      </div>

      {/* Core Extensions */}
      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold">Core Extensions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <MousePointer className="mx-auto h-12 w-12 text-sapphire-blue mb-4" />
              <CardTitle>One-Click Apply</CardTitle>
              <CardDescription>Apply to jobs instantly with pre-filled forms and auto-submission</CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full">Coming Soon</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Briefcase className="mx-auto h-12 w-12 text-velvet-rose mb-4" />
              <CardTitle>Job Tracker</CardTitle>
              <CardDescription>Automatically track applications and organize your job search</CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full">Coming Soon</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Mail className="mx-auto h-12 w-12 text-dusty-coral mb-4" />
              <CardTitle>Email Integration</CardTitle>
              <CardDescription>Track job updates and responses directly from your email</CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full">Coming Soon</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Platform Integrations */}
      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold">Platform Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Building2 className="mx-auto h-12 w-12 text-sapphire-blue mb-4" />
              <CardTitle>LinkedIn Assistant</CardTitle>
              <CardDescription>Enhanced LinkedIn job searching and application automation</CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full">Coming Soon</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Search className="mx-auto h-12 w-12 text-velvet-rose mb-4" />
              <CardTitle>Indeed Integration</CardTitle>
              <CardDescription>Streamline Indeed applications and job tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full">Coming Soon</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Eye className="mx-auto h-12 w-12 text-dusty-coral mb-4" />
              <CardTitle>Glassdoor Connector</CardTitle>
              <CardDescription>Access company insights and salary data while applying</CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full">Coming Soon</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Browser Support */}
      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold">Browser Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Chrome className="mx-auto h-12 w-12 text-sapphire-blue mb-4" />
              <CardTitle>Chrome Extension</CardTitle>
              <CardDescription>Full extension suite for Chrome browser</CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full">Coming Soon</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Globe className="mx-auto h-12 w-12 text-velvet-rose mb-4" />
              <CardTitle>Firefox Extension</CardTitle>
              <CardDescription>Complete Firefox addon support</CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full">Coming Soon</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Globe className="mx-auto h-12 w-12 text-dusty-coral mb-4" />
              <CardTitle>Web App</CardTitle>
              <CardDescription>Full-featured platform available now</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                Available Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}