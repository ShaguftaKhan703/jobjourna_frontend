import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Settings, Bell, Download } from 'lucide-react';

export function Profile() {
  const { authState } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    name: authState.user?.name || '',
    email: authState.user?.email || '',
    emailNotifications: true,
    dashboardLayout: 'grid',
  });

  const handleSave = async () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({ title: "Profile updated", description: "Your changes have been saved." });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about your applications</p>
                </div>
                <Switch
                  id="notifications"
                  checked={profile.emailNotifications}
                  onCheckedChange={(checked) => setProfile({...profile, emailNotifications: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleSave} disabled={isLoading} className="w-full bg-gradient-primary">
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}