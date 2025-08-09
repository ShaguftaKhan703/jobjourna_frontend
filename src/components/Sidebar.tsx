import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  Brain,
  FileText,
  PenTool,
  Mail,
  Puzzle,
  User,
  CreditCard,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Assistant', href: '/ai-assistant', icon: Bot },
  { name: 'Agentic Mode (v3)', href: '/agentic-mode', icon: Brain },
  { name: 'My Documents', href: '/my-documents', icon: FileText },
  { name: 'AI Cover Letter', href: '/ai-cover-letter', icon: PenTool },
  { name: 'Subscription', href: '/subscription', icon: CreditCard },
  { name: 'Contact Us', href: '/contact-us', icon: Mail },
  { name: 'Extensions', href: '/extensions', icon: Puzzle },
  { name: 'Profile', href: '/profile', icon: User },
];

interface SidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isMobile = false, isOpen = true, onClose }: SidebarProps) {
  const location = useLocation();
  const { authState, logout } = useAuth();

  if (isMobile) {
    return (
      <>
        {/* Mobile sidebar overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
            <div className="fixed left-0 top-0 h-full w-64 bg-card border-r shadow-elegant">
              <SidebarContent 
                location={location} 
                authState={authState} 
                logout={logout}
                isMobile={true}
                onClose={onClose}
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col bg-card border-r">
        <SidebarContent 
          location={location} 
          authState={authState} 
          logout={logout}
        />
      </div>
    </div>
  );
}

function SidebarContent({ 
  location, 
  authState, 
  logout, 
  isMobile = false, 
  onClose 
}: {
  location: any;
  authState: any;
  logout: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b">
        <div className="flex items-center">
          <h1 className="font-heading text-xl font-bold gradient-primary bg-clip-text text-transparent">
            Job Journal
          </h1>
        </div>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={isMobile ? onClose : undefined}
              className={`
                flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                ${isActive
                  ? 'bg-primary text-primary-foreground shadow-card'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }
              `}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {authState.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {authState.user?.name || 'User'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {authState.user?.email}
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}