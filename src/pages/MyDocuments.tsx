import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Download, Edit, Trash2, Plus, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  type: 'resume' | 'cover-letter';
  lastModified: Date;
  size: string;
  isDefault?: boolean;
}

export function MyDocuments() {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Software_Engineer_Resume_v3.pdf',
      type: 'resume',
      lastModified: new Date('2024-01-20'),
      size: '1.2 MB',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Frontend_Developer_Resume.pdf',
      type: 'resume',
      lastModified: new Date('2024-01-15'),
      size: '1.1 MB',
    },
    {
      id: '3',
      name: 'TechCorp_Cover_Letter.pdf',
      type: 'cover-letter',
      lastModified: new Date('2024-01-18'),
      size: '0.8 MB',
    },
    {
      id: '4',
      name: 'Startup_Cover_Letter.pdf',
      type: 'cover-letter',
      lastModified: new Date('2024-01-16'),
      size: '0.9 MB',
    },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const newDoc: Document = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.name.toLowerCase().includes('resume') ? 'resume' : 'cover-letter',
        lastModified: new Date(),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      };
      
      setDocuments(prev => [newDoc, ...prev]);
    });

    toast({
      title: "Documents uploaded",
      description: `Successfully uploaded ${files.length} document(s).`,
    });

    // Reset input
    event.target.value = '';
  };

  const handleDelete = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "The document has been removed from your library.",
    });
  };

  const handleSetDefault = (id: string) => {
    setDocuments(prev => 
      prev.map(doc => ({
        ...doc,
        isDefault: doc.id === id && doc.type === 'resume' ? true : 
                   doc.type === 'resume' ? false : doc.isDefault
      }))
    );
    toast({
      title: "Default resume updated",
      description: "This resume will be suggested for new applications.",
    });
  };

  const resumes = documents.filter(doc => doc.type === 'resume');
  const coverLetters = documents.filter(doc => doc.type === 'cover-letter');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">My Documents</h1>
            <p className="text-muted-foreground text-lg">
              Manage your resumes and cover letters
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="file"
              id="file-upload"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button variant="outline" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Upload Documents
              </label>
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-sapphire-blue" />
                <div>
                  <p className="text-2xl font-bold">{resumes.length}</p>
                  <p className="text-sm text-muted-foreground">Resumes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Edit className="h-5 w-5 text-velvet-rose" />
                <div>
                  <p className="text-2xl font-bold">{coverLetters.length}</p>
                  <p className="text-sm text-muted-foreground">Cover Letters</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Download className="h-5 w-5 text-dusty-coral" />
                <div>
                  <p className="text-2xl font-bold">{documents.length}</p>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resumes Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Resumes
          </CardTitle>
          <CardDescription>
            Manage your resume library and set your default resume
          </CardDescription>
        </CardHeader>
        <CardContent>
          {resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-sapphire-blue/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-sapphire-blue" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{doc.name}</h3>
                        {doc.isDefault && (
                          <Badge variant="secondary" className="bg-velvet-rose text-white">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {doc.size} • Modified {doc.lastModified.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    {!doc.isDefault && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSetDefault(doc.id)}
                      >
                        Set Default
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(doc.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No resumes yet</h3>
              <p className="text-muted-foreground">Upload your first resume to get started</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cover Letters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Edit className="mr-2 h-5 w-5" />
            Cover Letters
          </CardTitle>
          <CardDescription>
            Keep track of your tailored cover letters for different applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {coverLetters.length > 0 ? (
            <div className="space-y-4">
              {coverLetters.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-velvet-rose/10 rounded-lg flex items-center justify-center">
                      <Edit className="h-6 w-6 text-velvet-rose" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {doc.size} • Modified {doc.lastModified.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(doc.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Edit className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No cover letters yet</h3>
              <p className="text-muted-foreground">Create your first cover letter to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}