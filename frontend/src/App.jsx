import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Features = lazy(() => import('./pages/Features'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Products = lazy(() => import('./pages/Products'));
const Team = lazy(() => import('./pages/Team'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/Admin/Login'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminManage = lazy(() => import('./pages/Admin/ManageContent'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-purple-600 animate-pulse" />
        <p className="text-muted text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                <Route path="/features" element={<PublicLayout><Features /></PublicLayout>} />
                <Route path="/how-it-works" element={<PublicLayout><HowItWorks /></PublicLayout>} />
                <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
                <Route path="/team" element={<PublicLayout><Team /></PublicLayout>} />
                <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

                {/* Admin Routes */}
                <Route path="/admin" element={<Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>} />
                <Route path="/admin/dashboard" element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
                <Route path="/admin/manage" element={<Suspense fallback={<PageLoader />}><AdminManage /></Suspense>} />

                {/* 404 */}
                <Route path="*" element={
                  <PublicLayout>
                    <div className="min-h-screen flex items-center justify-center text-center px-4">
                      <div>
                        <div className="text-8xl font-black gradient-text mb-4">404</div>
                        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
                        <p className="text-muted mb-8">The page you are looking for doesn't exist.</p>
                        <a href="/" className="btn-primary">Go Home</a>
                      </div>
                    </div>
                  </PublicLayout>
                } />
              </Routes>
            </Suspense>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
