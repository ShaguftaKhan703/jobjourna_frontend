import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'jobsy' | 'user';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'feature-highlight';
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

interface VirtualAssistantContextType {
  isVisible: boolean;
  isMinimized: boolean;
  messages: Message[];
  currentFlow: 'onboarding' | 'job-adding' | 'feature-explanation' | 'general' | null;
  showAssistant: () => void;
  hideAssistant: () => void;
  minimizeAssistant: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  startOnboarding: () => void;
  startJobAddingFlow: () => void;
  clearMessages: () => void;
  setCurrentFlow: (flow: 'onboarding' | 'job-adding' | 'feature-explanation' | 'general' | null) => void;
}

const VirtualAssistantContext = createContext<VirtualAssistantContextType | undefined>(undefined);

export function useVirtualAssistant() {
  const context = useContext(VirtualAssistantContext);
  if (!context) {
    throw new Error('useVirtualAssistant must be used within a VirtualAssistantProvider');
  }
  return context;
}

interface VirtualAssistantProviderProps {
  children: ReactNode;
}

export function VirtualAssistantProvider({ children }: VirtualAssistantProviderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentFlow, setCurrentFlow] = useState<'onboarding' | 'job-adding' | 'feature-explanation' | 'general' | null>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  const { authState } = useAuth();
  const location = useLocation();

  // Check if user is new (first visit)
  useEffect(() => {
    if (authState.isAuthenticated && !hasSeenOnboarding) {
      const hasSeenBefore = localStorage.getItem('jobsy-onboarding-completed');
      if (!hasSeenBefore) {
        setTimeout(() => {
          startOnboarding();
        }, 2000); // Show after 2 seconds
      } else {
        setHasSeenOnboarding(true);
      }
    }
  }, [authState.isAuthenticated]);

  // Dashboard specific triggers
  useEffect(() => {
    if (location.pathname === '/dashboard' && hasSeenOnboarding && !isVisible) {
      const dashboardVisits = parseInt(localStorage.getItem('jobsy-dashboard-visits') || '0');
      if (dashboardVisits < 3) {
        setTimeout(() => {
          showDashboardHelp();
        }, 5000);
        localStorage.setItem('jobsy-dashboard-visits', (dashboardVisits + 1).toString());
      }
    }
  }, [location.pathname, hasSeenOnboarding]);

  // Inactivity detection
  useEffect(() => {
    const handleActivity = () => setLastActivity(Date.now());
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, handleActivity, true));

    const inactivityTimer = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;
      
      // Show tips after 3 minutes of inactivity
      if (timeSinceLastActivity > 180000 && hasSeenOnboarding && !isVisible) {
        showInactivityTip();
      }
    }, 60000); // Check every minute

    return () => {
      events.forEach(event => document.removeEventListener(event, handleActivity, true));
      clearInterval(inactivityTimer);
    };
  }, [lastActivity, hasSeenOnboarding, isVisible]);

  const showAssistant = () => {
    setIsVisible(true);
    setIsMinimized(false);
  };

  const hideAssistant = () => {
    setIsVisible(false);
    setCurrentFlow(null);
  };

  const minimizeAssistant = () => {
    setIsMinimized(true);
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const startOnboarding = () => {
    setCurrentFlow('onboarding');
    clearMessages();
    showAssistant();
    
    addMessage({
      sender: 'jobsy',
      content: "Hey there! 👋 I'm Jobsy, your Job Journal assistant. Welcome to your new job tracking companion! I'm here to help you master this platform and land your dream job.",
      type: 'text'
    });

    setTimeout(() => {
      addMessage({
        sender: 'jobsy',
        content: "Want me to show you around? I can explain how everything works and help you add your first job application!",
        type: 'suggestion',
        suggestions: ['Show me around!', 'Help me add a job', 'Maybe later'],
        onSuggestionClick: handleOnboardingSuggestion
      });
    }, 1500);
  };

  const startJobAddingFlow = () => {
    setCurrentFlow('job-adding');
    clearMessages();
    showAssistant();
    
    addMessage({
      sender: 'jobsy',
      content: "Perfect! Let me help you add a job application quickly. I'll ask you a few simple questions, and I'll handle the rest! 🚀",
      type: 'text'
    });

    setTimeout(() => {
      addMessage({
        sender: 'jobsy',
        content: "First, what's the job title you applied for?",
        type: 'text'
      });
    }, 1000);
  };

  const showDashboardHelp = () => {
    clearMessages();
    showAssistant();
    
    addMessage({
      sender: 'jobsy',
      content: "I see you're on your dashboard! This is your command center for tracking all job applications. Want me to help you add a new job in just 3 quick questions?",
      type: 'suggestion',
      suggestions: ['Yes, add a job!', 'Show me dashboard features', 'Not now'],
      onSuggestionClick: handleDashboardSuggestion
    });
  };

  const showInactivityTip = () => {
    const tips = [
      "💡 Did you know you can track interview dates and follow-up reminders for each job?",
      "📄 Pro tip: Upload different versions of your resume for different types of roles!",
      "✨ Use the AI Cover Letter tool to create personalized cover letters for each application!",
      "📊 Check your application statistics to see your success rate and identify patterns!"
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    clearMessages();
    showAssistant();
    
    addMessage({
      sender: 'jobsy',
      content: randomTip,
      type: 'text'
    });

    setTimeout(() => {
      addMessage({
        sender: 'jobsy',
        content: "Need help with anything? I'm here to assist!",
        type: 'suggestion',
        suggestions: ['Add a job', 'Show me features', 'Thanks, I\'m good!'],
        onSuggestionClick: handleGeneralSuggestion
      });
    }, 2000);
  };

  const handleOnboardingSuggestion = (suggestion: string) => {
    addMessage({
      sender: 'user',
      content: suggestion,
      type: 'text'
    });

    setTimeout(() => {
      if (suggestion === 'Show me around!') {
        addMessage({
          sender: 'jobsy',
          content: "Great! Your dashboard shows all your job applications with their current status. The sidebar on the left gives you access to AI tools like cover letter generation and document management.",
          type: 'text'
        });
        
        setTimeout(() => {
          addMessage({
            sender: 'jobsy',
            content: "Ready to add your first job application?",
            type: 'suggestion',
            suggestions: ['Yes, let\'s do it!', 'Tell me about AI features', 'I\'ll explore myself'],
            onSuggestionClick: handleOnboardingNext
          });
        }, 2000);
      } else if (suggestion === 'Help me add a job') {
        startJobAddingFlow();
      } else {
        addMessage({
          sender: 'jobsy',
          content: "No problem! I'll be here whenever you need help. Just click on me anytime! 😊",
          type: 'text'
        });
        setHasSeenOnboarding(true);
        localStorage.setItem('jobsy-onboarding-completed', 'true');
      }
    }, 1000);
  };

  const handleOnboardingNext = (suggestion: string) => {
    addMessage({
      sender: 'user',
      content: suggestion,
      type: 'text'
    });

    setTimeout(() => {
      if (suggestion === 'Yes, let\'s do it!') {
        startJobAddingFlow();
      } else if (suggestion === 'Tell me about AI features') {
        addMessage({
          sender: 'jobsy',
          content: "Our AI tools can help you create personalized cover letters, manage your documents, and even provide interview tips! Check out the AI Assistant and AI Cover Letter pages in the sidebar.",
          type: 'text'
        });
      } else {
        addMessage({
          sender: 'jobsy',
          content: "Perfect! Feel free to explore. I'm always here if you need guidance!",
          type: 'text'
        });
      }
      setHasSeenOnboarding(true);
      localStorage.setItem('jobsy-onboarding-completed', 'true');
    }, 1000);
  };

  const handleDashboardSuggestion = (suggestion: string) => {
    addMessage({
      sender: 'user',
      content: suggestion,
      type: 'text'
    });

    setTimeout(() => {
      if (suggestion === 'Yes, add a job!') {
        startJobAddingFlow();
      } else if (suggestion === 'Show me dashboard features') {
        addMessage({
          sender: 'jobsy',
          content: "Your dashboard has several key areas: Statistics cards show your application progress, the search bar helps you find specific jobs, and each job card displays status, company, and next steps!",
          type: 'text'
        });
      } else {
        addMessage({
          sender: 'jobsy',
          content: "No worries! I'll be here when you're ready to add jobs or need any help! 👍",
          type: 'text'
        });
      }
    }, 1000);
  };

  const handleGeneralSuggestion = (suggestion: string) => {
    addMessage({
      sender: 'user',
      content: suggestion,
      type: 'text'
    });

    setTimeout(() => {
      if (suggestion === 'Add a job') {
        startJobAddingFlow();
      } else if (suggestion === 'Show me features') {
        addMessage({
          sender: 'jobsy',
          content: "I can help you with: Adding jobs quickly, explaining features, navigating the platform, and providing job search tips! What would you like to explore?",
          type: 'text'
        });
      } else {
        addMessage({
          sender: 'jobsy',
          content: "You got it! Happy job hunting! 🎯",
          type: 'text'
        });
        setTimeout(() => hideAssistant(), 2000);
      }
    }, 1000);
  };

  return (
    <VirtualAssistantContext.Provider
      value={{
        isVisible,
        isMinimized,
        messages,
        currentFlow,
        showAssistant,
        hideAssistant,
        minimizeAssistant,
        addMessage,
        startOnboarding,
        startJobAddingFlow,
        clearMessages,
        setCurrentFlow,
      }}
    >
      {children}
    </VirtualAssistantContext.Provider>
  );
}