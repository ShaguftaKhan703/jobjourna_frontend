import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

  const [viewedDocument, setViewedDocument] = useState<Document | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, documentType?: 'resume' | 'cover-letter') => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const newDoc: Document = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: documentType || (file.name.toLowerCase().includes('resume') ? 'resume' : 'cover-letter'),
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

  const handleView = (doc: Document) => {
    setViewedDocument(doc);
  };

  const handleDownload = (doc: Document) => {
    // In a real app, this would download the actual file
    const link = window.document.createElement('a');
    link.href = '#'; // This would be the actual file URL
    link.download = doc.name;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: `Downloading ${doc.name}...`,
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
              onChange={(e) => handleFileUpload(e)}
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Resumes
              </CardTitle>
              <CardDescription>
                Manage your resume library and set your default resume
              </CardDescription>
            </div>
            <div>
              <input
                type="file"
                id="resume-upload"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e, 'resume')}
                className="hidden"
              />
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Resume
                </label>
              </Button>
            </div>
          </div>
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
                     <Button 
                       variant="ghost" 
                       size="icon"
                       onClick={() => handleView(doc)}
                     >
                       <Eye className="h-4 w-4" />
                     </Button>
                     <Button 
                       variant="ghost" 
                       size="icon"
                       onClick={() => handleDownload(doc)}
                     >
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Edit className="mr-2 h-5 w-5" />
                Cover Letters
              </CardTitle>
              <CardDescription>
                Keep track of your tailored cover letters for different applications
              </CardDescription>
            </div>
            <div>
              <input
                type="file"
                id="cover-letter-upload"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e, 'cover-letter')}
                className="hidden"
              />
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="cover-letter-upload" className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Cover Letter
                </label>
              </Button>
            </div>
          </div>
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
                     <Button 
                       variant="ghost" 
                       size="icon"
                       onClick={() => handleView(doc)}
                     >
                       <Eye className="h-4 w-4" />
                     </Button>
                     <Button 
                       variant="ghost" 
                       size="icon"
                       onClick={() => handleDownload(doc)}
                     >
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

      {/* Document Viewer Dialog */}
      <Dialog open={!!viewedDocument} onOpenChange={(open) => !open && setViewedDocument(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{viewedDocument?.name}</DialogTitle>
            <DialogDescription>
              {viewedDocument?.type === 'resume' ? 'Resume' : 'Cover Letter'} • {viewedDocument?.size} • Modified {viewedDocument?.lastModified.toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 bg-muted/30 rounded-lg p-8 text-center">
            <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold mb-2">Document Preview</p>
            <p className="text-muted-foreground mb-6">
              Preview functionality would show the document content here.
              <br />
              In a real application, this would display the PDF or document viewer.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={() => viewedDocument && handleDownload(viewedDocument)}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" onClick={() => setViewedDocument(null)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}