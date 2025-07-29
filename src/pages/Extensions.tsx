import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Puzzle, Chrome, Globe, ArrowRight } from 'lucide-react';

export function Extensions() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold">Browser Extensions</h1>
        <p className="text-muted-foreground text-lg">
          Coming soon - Apply to jobs directly from your browser
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardHeader>
            <Chrome className="mx-auto h-12 w-12 text-sapphire-blue mb-4" />
            <CardTitle>Chrome Extension</CardTitle>
            <CardDescription>One-click job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">Coming Soon</Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Globe className="mx-auto h-12 w-12 text-velvet-rose mb-4" />
            <CardTitle>Firefox Extension</CardTitle>
            <CardDescription>Seamless job tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">Coming Soon</Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Globe className="mx-auto h-12 w-12 text-dusty-coral mb-4" />
            <CardTitle>Web App</CardTitle>
            <CardDescription>Full-featured platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-primary hover:opacity-90">
              Available Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}