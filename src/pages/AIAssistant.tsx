import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI job search assistant. I can help you with interview preparation, resume optimization, cover letter writing, and job search strategies. What would you like to work on today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(newMessage),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('interview')) {
      return "Great! I can help you prepare for interviews. Here are some key tips:\n\n1. Research the company thoroughly\n2. Practice common interview questions\n3. Prepare specific examples using the STAR method\n4. Have thoughtful questions ready for the interviewer\n5. Practice your elevator pitch\n\nWould you like me to help you practice answers to specific questions or research a particular company?";
    }
    
    if (input.includes('resume')) {
      return "I'd be happy to help optimize your resume! Here are some best practices:\n\n• Use action verbs and quantify achievements\n• Tailor your resume for each job application\n• Keep it concise (1-2 pages)\n• Include relevant keywords from the job description\n• Ensure consistent formatting\n\nWould you like me to review a specific section or help you tailor your resume for a particular role?";
    }
    
    if (input.includes('cover letter')) {
      return "Cover letters are a great way to stand out! Here's my recommended structure:\n\n1. Opening: Hook the reader and mention the specific role\n2. Body: Connect your experience to their needs\n3. Closing: Express enthusiasm and next steps\n\nKey tips:\n• Keep it under one page\n• Show, don't just tell\n• Research the company culture\n• Address it to a specific person when possible\n\nWould you like help writing a cover letter for a specific position?";
    }
    
    return "That's a great question! I'm here to help with all aspects of your job search including:\n\n• Interview preparation and practice\n• Resume optimization and tailoring\n• Cover letter writing\n• Job search strategies\n• Salary negotiation tips\n• Company research\n\nWhat specific area would you like to focus on? Feel free to share details about a particular job you're applying for!";
  };

  const quickPrompts = [
    "Help me prepare for a technical interview",
    "Review my resume for ATS optimization",
    "Write a cover letter for a startup",
    "Negotiate salary for my offer",
    "Research company culture questions",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">
              Your personal job search companion powered by AI
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-velvet-rose" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setNewMessage(prompt)}
                className="text-sm"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="flex flex-col h-[600px]">
        <CardHeader className="border-b">
          <CardTitle>Chat with AI Assistant</CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </div>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                  
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-primary text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-current opacity-60 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-current opacity-60 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-current opacity-60 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask me anything about your job search..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!newMessage.trim() || isLoading}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}