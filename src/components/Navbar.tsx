import { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';

export function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { authState } = useAuth();

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="font-heading text-lg font-bold gradient-primary bg-clip-text text-transparent">
              Job Journal
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-velvet-rose rounded-full"></span>
            </Button>
            <ThemeToggle />
            <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {authState.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <Sidebar 
        isMobile={true} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
    </>
  );
}