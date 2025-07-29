import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { AuthPage } from '@/pages/AuthPage';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Navbar />
      
      <main className="lg:pl-64 min-h-screen">
        <div className="px-4 py-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}