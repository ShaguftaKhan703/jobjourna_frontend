import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MessageSquare, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ContactUs() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground text-lg">
          Get in touch with our team for support and feedback
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feedback">General Feedback</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => updateFormData('subject', e.target.value)}
                    placeholder="Brief description of your message"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  {isSubmitting ? (
                    <>
                      <Send className="mr-2 h-4 w-4 animate-pulse" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Other ways to reach us
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-sapphire-blue/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-sapphire-blue" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">support@jobjournal.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-velvet-rose/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-velvet-rose" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-dusty-coral/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-dusty-coral" />
                </div>
                <div>
                  <p className="font-medium">Office</p>
                  <p className="text-sm text-muted-foreground">
                    123 Tech Street<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">How do I reset my password?</h4>
                <p className="text-sm text-muted-foreground">
                  Use the "Forgot Password" link on the login page to reset your password.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Can I export my data?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can export your job application data from your profile settings.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Is there a mobile app?</h4>
                <p className="text-sm text-muted-foreground">
                  We're working on mobile apps. For now, our web app is fully responsive.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}