import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./components/LanguageContext";
import { AuthProvider } from '@/hooks/useAuth';
import { DonationProvider } from '@/contexts/DonationContext';
import PayPalProvider from '@/components/PayPalProvider';
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
import Arts from "./pages/programs/Arts";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import ProtectedRoute from '@/components/ProtectedRoute';
import BlogManagement from '@/pages/BlogManagement';
import BlogEditor from '@/components/blog/BlogEditor';
import Media from './pages/Media';
import NewsUpdates from './pages/NewsUpdates';
import Resources from './pages/Resources';
import Staff from './pages/Staff';
import './i18n'; // Import i18n configuration

const App = () => {
  // Create QueryClient inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider>
          <AuthProvider>
            <PayPalProvider>
              <DonationProvider>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/programs" element={<Programs />} />
                      <Route path="/programs/education" element={<Education />} />
                      <Route path="/programs/economic" element={<Economic />} />
                      <Route path="/programs/health" element={<Health />} />
                      <Route path="/programs/peace" element={<Peace />} />
                      <Route path="/programs/arts" element={<Arts />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/media" element={<Media />} />
                      <Route path="/news" element={<NewsUpdates />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/staff" element={<Staff />} />
                      <Route
                        path="/dms"
                        element={
                          <ProtectedRoute requiredRole="admin">
                            <DMS />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/blog/manage"
                        element={
                          <ProtectedRoute requiredRole="admin">
                            <BlogManagement />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/blog/new"
                        element={
                          <ProtectedRoute requiredRole="admin">
                            <BlogEditor />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/blog/edit/:id"
                        element={
                          <ProtectedRoute requiredRole="admin">
                            <BlogEditor />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </DonationProvider>
            </PayPalProvider>
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
