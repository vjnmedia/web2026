import './i18n';
import React, { Suspense, useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { LanguageProvider } from "./components/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from '@/hooks/useAuth';
import { DonationProvider } from '@/contexts/DonationContext';
import PayPalProvider from '@/components/PayPalProvider';
import { StaffProvider } from '@/contexts/StaffContext';
import { EventsProvider } from '@/contexts/EventsContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { SkipToMainContent, HighContrastMode, ReducedMotion } from '@/components/Accessibility';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Contact from "./pages/Contact";
import Login from "@/pages/Login";
import DMS from "@/pages/DMS";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import Education from "./pages/programs/Education";
import Economic from "./pages/programs/Economic";
import Health from "./pages/programs/Health";
import Peace from "./pages/programs/Peace";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from '@/components/ProtectedRoute';
import BlogManagement from '@/pages/BlogManagement';
import BlogEditor from '@/components/blog/BlogEditor';
import Media from './pages/Media';
import Resources from './pages/Resources';
import Staff from '@/pages/Staff';
import BlogPost from '@/pages/BlogPost';
import Donate from './pages/Donate';
import Stories from './pages/Stories';
import Partners from './pages/Partners';
import { Navigate } from 'react-router-dom';
import SportCultureArts from "./pages/programs/SportCultureArts";
import Volunteer from "./pages/Volunteer";
import ImageManager from './pages/ImageManager';
import Search from "./pages/Search";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Sitemap from "./pages/Sitemap";
import Impact from "./pages/Impact";
import Career from './pages/Career';
import BlogPosts from './pages/BlogPosts';
import ProjectsManagement from '@/components/dashboard/ProjectsManagement';
import News from './pages/News';
import Events from './pages/Events';

// Loading component for Suspense
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vjn-blue"></div>
  </div>
);

// LoginModal component to manage login state
const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Open modal when route is /login
  useEffect(() => {
    if (location.pathname === '/login') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    // Only navigate if we're still on the login page
    if (location.pathname === '/login') {
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    }
  };

  return <Login isOpen={isOpen} onClose={handleClose} />;
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  }));

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <HighContrastMode>
          <ReducedMotion>
            <Suspense fallback={<LoadingFallback />}>
              <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                  <LanguageProvider>
                    <AuthProvider>
                      <PayPalProvider>
                        <StaffProvider>
                          <EventsProvider>
                            <TooltipProvider>
                              <DonationProvider>
                            <div className="min-h-screen flex flex-col">
                              <SkipToMainContent />
                              <Navbar />
                              <main id="main-content" className="flex-grow" role="main" tabIndex={-1}>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/programs" element={<Programs />} />
                          <Route path="/programs/education" element={<Education />} />
                          <Route path="/programs/economic" element={<Economic />} />
                          <Route path="/programs/health" element={<Health />} />
                          <Route path="/programs/peace" element={<Peace />} />
                          <Route path="/programs/sport-culture-arts" element={<SportCultureArts />} />
                          <Route path="/events" element={<Events />} />
                          <Route path="/services" element={<Services />} />
                          <Route path="/media" element={<Media />} />
                            <Route path="/news" element={<News />} />
                          <Route path="/resources" element={<Resources />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/login" element={<LoginModal />} />
                            <Route path="/donate" element={<PayPalProvider><Donate /></PayPalProvider>} />
                          <Route path="/stories" element={<Stories />} />
                          <Route path="/partners" element={<Partners />} />
                          <Route path="/volunteer" element={<Volunteer />} />
                          <Route path="/career" element={<Career />} />
                          <Route path="/careers" element={<Career />} />
                          <Route path="/blog" element={<Navigate to="/news" replace />} />
                          <Route path="/blog/:id" element={<BlogPost />} />
                          <Route path="/search" element={<Search />} />
                          <Route path="/privacy" element={<Privacy />} />
                          <Route path="/terms" element={<Terms />} />
                          <Route path="/sitemap" element={<Sitemap />} />
                          <Route path="/staff" element={<Staff />} />
                          <Route path="/impact" element={<Impact />} />
                          <Route
                            path="/dashboard"
                            element={
                              <ProtectedRoute>
                                <Dashboard />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/dms"
                            element={
                              <ProtectedRoute>
                                <DMS />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/dms/project-management"
                            element={
                              <ProtectedRoute>
                                <ProjectsManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/blog-management"
                            element={
                              <ProtectedRoute>
                                <BlogManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/blog-editor/:id?"
                            element={
                              <ProtectedRoute>
                                <BlogEditor />
                              </ProtectedRoute>
                            }
                          />
                          <Route path="/image-manager" element={<ImageManager />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                              </main>
                              <Footer />
                            </div>
                            <Toaster />
                            <Sonner />
                              </DonationProvider>
                            </TooltipProvider>
                          </EventsProvider>
                        </StaffProvider>
                      </PayPalProvider>
                    </AuthProvider>
                  </LanguageProvider>
                </ThemeProvider>
              </QueryClientProvider>
            </Suspense>
          </ReducedMotion>
        </HighContrastMode>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
