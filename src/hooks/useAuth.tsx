import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthChange = useCallback(async (session: any) => {
    try {
      console.log('Auth change detected:', { session });
      
      if (!session?.user) {
        console.log('No session user found');
        setUser(null);
        return;
      }

      // Get user profile from your profiles table
      let profileData;
      try {
        console.log('Fetching profile for user:', session.user.id);
        
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id, email, role, name')
          .eq('id', session.user.id)
          .single();

        console.log('Profile fetch result:', { profile, error });

        if (error) {
          if (error.code === 'PGRST116') {
            console.log('No profile exists, creating one');
            // No profile exists, create one
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: session.user.id,
                  email: session.user.email,
                  role: 'viewer',
                  name: session.user.email?.split('@')[0] || 'User'
                }
              ])
              .select('id, email, role, name')
              .single();

            if (createError) {
              console.error('Error creating profile:', createError);
              throw createError;
            }
            console.log('New profile created:', newProfile);
            profileData = newProfile;
          } else {
            console.error('Error fetching profile:', error);
            throw error;
          }
        } else {
          profileData = profile;
        }

        const userData = {
          id: session.user.id,
          email: session.user.email!,
          role: profileData.role || 'viewer',
          name: profileData.name || session.user.email!.split('@')[0]
        };

        console.log('Setting user data:', userData);
        setUser(userData);
      } catch (profileError: any) {
        console.error('Profile fetch error:', profileError);
        // If we can't fetch or create profile, still set basic user info
        const fallbackUser = {
          id: session.user.id,
          email: session.user.email!,
          role: 'viewer',
          name: session.user.email?.split('@')[0] || 'User'
        };
        console.log('Setting fallback user data:', fallbackUser);
        setUser(fallbackUser);
        toast.error('Error loading profile data. Some features may be limited.');
      }
    } catch (error: any) {
      console.error('Error in handleAuthChange:', error);
      setUser(null);
      toast.error('An error occurred while loading your profile.');
    }
  }, []);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        console.log('Checking auth on mount');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Session check result:', { session });
        
        if (session) {
          await handleAuthChange(session);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', { event, session });
      if (event === 'SIGNED_IN' && session) {
        handleAuthChange(session);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [handleAuthChange]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      if (!data.user) {
        throw new Error('No user data returned');
      }

      toast.success('Logged in successfully');
      return data;
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err.message || 'Failed to login. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      const { error: signOutError } = await supabase.auth.signOut();
      
      if (signOutError) {
        throw signOutError;
      }

      setUser(null);
      toast.success('Logged out successfully');
    } catch (err: any) {
      console.error('Logout error:', err);
      const errorMessage = err.message || 'Failed to logout. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session) {
        await handleAuthChange(session);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      setUser(null);
    }
  }, [handleAuthChange]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
export type { User, AuthContextType }; 