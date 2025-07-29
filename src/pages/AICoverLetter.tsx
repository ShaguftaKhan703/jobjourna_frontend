import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PenTool, Sparkles, Copy, Download, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AICoverLetter() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    jobDescription: '',
    tone: 'professional',
    experience: '',
    skills: '',
    motivation: '',
  });

  const handleGenerate = async () => {
    if (!formData.jobTitle || !formData.company) {
      toast({
        title: "Missing information",
        description: "Please fill in at least the job title and company name.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockLetter = generateMockCoverLetter(formData);
      setGeneratedLetter(mockLetter);
      setIsGenerating(false);
      
      toast({
        title: "Cover letter generated!",
        description: "Your personalized cover letter is ready for review.",
      });
    }, 3000);
  };

  const generateMockCoverLetter = (data: typeof formData) => {
    return `Dear Hiring Manager,

I am writing to express my strong interest in the ${data.jobTitle} position at ${data.company}. Your commitment to innovation and excellence aligns perfectly with my career aspirations and professional values.

With my background in ${data.experience || 'software development'}, I bring a unique combination of technical expertise and ${data.skills || 'problem-solving abilities'} that would make me a valuable addition to your team. I am particularly drawn to this opportunity because ${data.motivation || 'of the company\'s reputation for fostering growth and innovation'}.

${data.jobDescription ? `Based on the job description, I understand you're looking for someone who can contribute to ${data.company}'s continued success. My experience has prepared me to tackle the challenges outlined in your posting and contribute meaningfully from day one.` : ''}

I am excited about the possibility of bringing my passion for technology and dedication to excellence to ${data.company}. I would welcome the opportunity to discuss how my background and enthusiasm can contribute to your team's continued success.

Thank you for considering my application. I look forward to hearing from you soon.

Sincerely,
[Your Name]`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({
      title: "Copied to clipboard",
      description: "Cover letter has been copied to your clipboard.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Cover letter saved",
      description: "Your cover letter has been saved to your documents.",
    });
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <PenTool className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold">AI Cover Letter Generator</h1>
            <p className="text-muted-foreground text-lg">
              Create personalized cover letters powered by AI
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-velvet-rose" />
              Job Details
            </CardTitle>
            <CardDescription>
              Provide details about the position and company
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => updateFormData('jobTitle', e.target.value)}
                  placeholder="Senior Frontend Developer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  placeholder="TechCorp Inc"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={formData.tone} onValueChange={(value) => updateFormData('tone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                  <SelectItem value="confident">Confident</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                value={formData.jobDescription}
                onChange={(e) => updateFormData('jobDescription', e.target.value)}
                placeholder="Paste the job description here (optional)..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Your Experience</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => updateFormData('experience', e.target.value)}
                placeholder="Briefly describe your relevant experience..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Key Skills</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => updateFormData('skills', e.target.value)}
                placeholder="React, TypeScript, Problem-solving..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Why This Company?</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => updateFormData('motivation', e.target.value)}
                placeholder="What attracts you to this company and role?"
                rows={2}
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Generating Cover Letter...
                </>
              ) : (
                <>
                  <PenTool className="mr-2 h-4 w-4" />
                  Generate Cover Letter
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Letter */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Cover Letter</CardTitle>
            <CardDescription>
              Review and customize your AI-generated cover letter
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedLetter ? (
              <div className="space-y-4">
                <Textarea
                  value={generatedLetter}
                  onChange={(e) => setGeneratedLetter(e.target.value)}
                  rows={20}
                  className="font-body text-sm leading-relaxed"
                />
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    {generatedLetter.split(' ').length} words • {generatedLetter.split('\n').length} paragraphs
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <PenTool className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">No cover letter generated yet</h3>
                <p className="text-muted-foreground">
                  Fill in the job details and click "Generate Cover Letter" to get started
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Cover Letter Tips</CardTitle>
          <CardDescription>
            Best practices for effective cover letters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sapphire-blue">Personalization</h4>
              <p className="text-sm text-muted-foreground">
                Always customize your cover letter for each specific job and company. Research the company culture and values.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-velvet-rose">Structure</h4>
              <p className="text-sm text-muted-foreground">
                Keep it concise (under one page), with clear opening, body, and closing paragraphs that flow logically.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-dusty-coral">Impact</h4>
              <p className="text-sm text-muted-foreground">
                Use specific examples and quantify your achievements. Show how you can solve their problems and add value.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}