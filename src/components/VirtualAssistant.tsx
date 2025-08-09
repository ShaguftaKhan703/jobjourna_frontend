import { useState, useEffect, useRef } from 'react';
import { useVirtualAssistant } from '@/context/VirtualAssistantContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  X, 
  Minimize2, 
  Maximize2, 
  Send, 
  User,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function VirtualAssistant() {
  const {
    isVisible,
    isMinimized,
    messages,
    currentFlow,
    hideAssistant,
    minimizeAssistant,
    showAssistant,
    addMessage,
    startJobAddingFlow,
    startOnboarding
  } = useVirtualAssistant();

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    company: '',
    source: '',
    status: 'applied' as const
  });
  const [currentStep, setCurrentStep] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when assistant becomes visible
  useEffect(() => {
    if (isVisible && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isVisible, isMinimized]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage({
      sender: 'user',
      content: inputValue,
      type: 'text'
    });

    // Handle different conversation flows
    if (currentFlow === 'job-adding') {
      handleJobAddingResponse(inputValue);
    } else {
      handleGeneralResponse(inputValue);
    }

    setInputValue('');
  };

  const handleJobAddingResponse = (userInput: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const steps = [
        { field: 'title', question: "Great! Now, which company is this for?" },
        { field: 'company', question: "Perfect! Where did you find this job? (LinkedIn, Indeed, Company Website, etc.)" },
        { field: 'source', question: "Excellent! I'll add this job to your dashboard now! 🎉" }
      ];

      if (currentStep < steps.length - 1) {
        // Update form data
        const currentField = Object.keys(jobFormData)[currentStep] as keyof typeof jobFormData;
        setJobFormData(prev => ({
          ...prev,
          [currentField]: userInput
        }));

        // Ask next question
        addMessage({
          sender: 'jobsy',
          content: steps[currentStep].question,
          type: 'text'
        });

        setCurrentStep(prev => prev + 1);
      } else {
        // Final step - complete the job addition
        const finalJobData = {
          ...jobFormData,
          source: userInput
        };

        addMessage({
          sender: 'jobsy',
          content: `Perfect! I've added "${finalJobData.title}" at "${finalJobData.company}" to your dashboard. You can find it in your job list and update the status as you progress through the application process!`,
          type: 'text'
        });

        setTimeout(() => {
          addMessage({
            sender: 'jobsy',
            content: "Is there anything else I can help you with?",
            type: 'suggestion',
            suggestions: ['Add another job', 'Show me features', 'Thanks, I\'m all set!'],
            onSuggestionClick: handleGeneralSuggestion
          });
        }, 2000);

        // Reset form
        setJobFormData({ title: '', company: '', source: '', status: 'applied' });
        setCurrentStep(0);
      }
      
      setIsTyping(false);
    }, 1000);
  };

  const handleGeneralResponse = (userInput: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const lowerInput = userInput.toLowerCase();
      
      if (lowerInput.includes('help') || lowerInput.includes('how')) {
        addMessage({
          sender: 'jobsy',
          content: "I'm here to help! I can assist you with adding jobs, explaining features, navigating the platform, and providing job search tips. What would you like to know?",
          type: 'suggestion',
          suggestions: ['Add a job', 'Explain features', 'Job search tips', 'Show me around'],
          onSuggestionClick: handleGeneralSuggestion
        });
      } else if (lowerInput.includes('job') || lowerInput.includes('add')) {
        startJobAddingFlow();
      } else if (lowerInput.includes('feature') || lowerInput.includes('tool')) {
        addMessage({
          sender: 'jobsy',
          content: "Great question! This platform has several powerful features: Job tracking dashboard, AI-powered cover letter generator, document management, interview preparation tips, and application analytics. Which one interests you most?",
          type: 'text'
        });
      } else {
        addMessage({
          sender: 'jobsy',
          content: "Thanks for your message! I'm designed to help you with job tracking and applications. Here are some things I can help with:",
          type: 'suggestion',
          suggestions: ['Add a job application', 'Explain platform features', 'Job search tips', 'Navigate the dashboard'],
          onSuggestionClick: handleGeneralSuggestion
        });
      }
      
      setIsTyping(false);
    }, 1000);
  };

  const handleGeneralSuggestion = (suggestion: string) => {
    addMessage({
      sender: 'user',
      content: suggestion,
      type: 'text'
    });

    setTimeout(() => {
      if (suggestion.includes('job') || suggestion.includes('Add')) {
        startJobAddingFlow();
      } else if (suggestion.includes('features') || suggestion.includes('Explain')) {
        addMessage({
          sender: 'jobsy',
          content: "Here's what you can do on this platform: Track job applications, generate AI cover letters, manage documents, get interview tips, and view your application analytics! Check out the sidebar for all features.",
          type: 'text'
        });
      } else if (suggestion.includes('tips')) {
        addMessage({
          sender: 'jobsy',
          content: "💡 Job Search Tips: Keep your application status updated, follow up within a week of applying, tailor your resume for each role, and use the AI cover letter tool for personalized applications!",
          type: 'text'
        });
      } else if (suggestion.includes('around') || suggestion.includes('Navigate')) {
        startOnboarding();
      } else {
        addMessage({
          sender: 'jobsy',
          content: "You're welcome! I'm always here when you need assistance. Happy job hunting! 🎯",
          type: 'text'
        });
        setTimeout(() => hideAssistant(), 2000);
      }
    }, 1000);
  };

  // Floating assistant trigger button
  if (!isVisible) {
    return (
      <Button
        onClick={showAssistant}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-gradient-to-br from-velvet-rose to-sapphire-blue hover:opacity-90 shadow-lg shadow-primary/25 z-50"
        size="lg"
      >
        <Sparkles className="h-6 w-6" />
      </Button>
    );
  }

  // Minimized state
  if (isMinimized) {
    return (
      <Card className="fixed bottom-6 right-6 w-72 z-50 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-br from-velvet-rose to-sapphire-blue rounded-t-lg">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-white/20 text-white text-sm">
                <Sparkles className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="text-white">
              <h3 className="font-medium text-sm">Jobsy</h3>
              <p className="text-xs opacity-90">Your Job Assistant</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={showAssistant}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={hideAssistant}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  // Full chat interface
  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] z-50 shadow-xl flex flex-col">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-br from-velvet-rose to-sapphire-blue rounded-t-lg shrink-0">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-white/20 text-white">
              <Sparkles className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="text-white">
            <h3 className="font-medium">Jobsy</h3>
            <p className="text-xs opacity-90 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Your Job Assistant
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={minimizeAssistant}
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={hideAssistant}
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === 'jobsy' && (
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-velvet-rose to-sapphire-blue text-white text-xs">
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    message.sender === 'user'
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted"
                  )}
                >
                  <p>{message.content}</p>
                  
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => message.onSuggestionClick?.(suggestion)}
                          className="w-full justify-start text-xs h-8"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                
                {message.sender === 'user' && (
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-velvet-rose to-sapphire-blue text-white text-xs">
                    <Sparkles className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      {/* Input */}
      <div className="border-t p-4 shrink-0">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            disabled={!inputValue.trim()}
            className="bg-gradient-to-br from-velvet-rose to-sapphire-blue hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}