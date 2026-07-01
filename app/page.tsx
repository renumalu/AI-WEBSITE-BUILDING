'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, Rocket, BookOpen, Target, Sparkles, CheckCircle2, ChevronRight,
  Monitor, Terminal, Layers, Shield, Database, LayoutTemplate, 
  Map, BarChart, Code2, Cpu, Globe, Users, PlayCircle, Clock, MapPin, Menu, X, Search,
  Twitter, Linkedin, Github, Youtube
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import Image from 'next/image';

const NAV_ITEMS = ['Home', 'Features', 'Dashboard', 'Courses', 'Career', 'About'];

export default function Home() {
  const [activeTab, setActiveTab] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check for existing JWT in localStorage
    const token = localStorage.getItem('jwt_token');
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({ email: 'student@learnsphere.ai' });
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate JWT token generation
    const mockJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_payload.mock_signature';
    localStorage.setItem('jwt_token', mockJwt);
    setUser({ email: 'student@learnsphere.ai' });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] shrink-0">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="font-display font-bold text-xl md:text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 hidden sm:block">LearnSphere<span className="text-cyan-400">.ai</span></span>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm font-medium transition-colors hover:text-white whitespace-nowrap ${activeTab === item ? 'text-white' : 'text-slate-400'}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className="hidden lg:flex items-center gap-2 md:gap-4 shrink-0">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold text-sm">
                      S
                    </div>
                    <span className="text-sm font-medium text-slate-300 hidden xl:block">{user.email}</span>
                  </div>
                  <button onClick={handleLogout} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white backdrop-blur-md hover:bg-white/10 transition-all text-sm font-medium whitespace-nowrap">
                    Log out
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} 
                    className="px-4 md:px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-white backdrop-blur-md hover:bg-white/10 transition-all text-sm font-medium whitespace-nowrap"
                  >
                    Log in
                  </button>
                  <button 
                    onClick={() => { setAuthMode('signup'); setIsAuthModalOpen(true); }}
                    className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white shadow-lg shadow-blue-500/20 text-sm font-semibold hover:opacity-90 transition-all whitespace-nowrap"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
            
            <button 
              className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0a0a0f] pt-24 px-6 lg:hidden overflow-y-auto pb-12"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`text-xl font-medium transition-colors text-left py-2 border-b border-white/5 ${activeTab === item ? 'text-cyan-400' : 'text-slate-300'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 flex flex-col gap-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 py-4 border-b border-white/5">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold">
                        S
                      </div>
                      <span className="text-base font-medium text-slate-200">{user.email}</span>
                    </div>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }} 
                      className="w-full py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => { 
                        setIsMobileMenuOpen(false);
                        setAuthMode('login'); 
                        setIsAuthModalOpen(true); 
                      }} 
                      className="w-full py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all"
                    >
                      Log in
                    </button>
                    <button 
                      onClick={() => { 
                        setIsMobileMenuOpen(false);
                        setAuthMode('signup'); 
                        setIsAuthModalOpen(true); 
                      }}
                      className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/20 font-semibold hover:opacity-90 transition-all"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 relative shadow-2xl"
            >
              <button 
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
              
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  {authMode === 'login' ? 'Welcome back' : 'Create an account'}
                </h3>
                <p className="text-slate-400 text-sm">
                  {authMode === 'login' 
                    ? 'Enter your credentials to access your dashboard' 
                    : 'Join LearnSphere to start your personalized journey'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Password</label>
                  <input 
                    type="password" 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity"
                >
                  {authMode === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-400">
                {authMode === 'login' ? (
                  <>
                    Don&apos;t have an account?{' '}
                    <button onClick={() => setAuthMode('signup')} className="text-cyan-400 hover:text-cyan-300 font-medium">
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button onClick={() => setAuthMode('login')} className="text-cyan-400 hover:text-cyan-300 font-medium">
                      Log in
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <HeroSection onStartLearning={() => { setAuthMode('signup'); setIsAuthModalOpen(true); }} />
        <FeaturesSection />
        <DashboardSection />
        <CoursesSection />
        <CareerSection />
        <EcosystemSection />
        <AboutSection />
        <ContactSection onStartLearning={() => { setAuthMode('signup'); setIsAuthModalOpen(true); }} />
      </main>

      <Footer />
    </div>
  );
}

function HeroSection({ onStartLearning }: { onStartLearning: () => void }) {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span>Introducing LearnSphere 2.0</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white max-w-5xl mb-8"
        >
          Master any skill with <br />
          <span className="text-gradient">Intelligent Tutoring.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12"
        >
          Personalized Learning Powered by Artificial Intelligence. Adaptive study plans, real-time feedback, and career-focused education designed for your success.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button onClick={onStartLearning} className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center group gap-2">
            Start Learning Free <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl"
        >
          {[
            { label: 'Active Students', value: '1M+' },
            { label: 'AI Courses', value: '200+' },
            { label: 'Success Rate', value: '95%' },
            { label: 'Expert Mentors', value: '500+' },
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center border border-white/10">
              <span className="font-display text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const features = [
    { icon: <Map />, title: 'AI Personalized Roadmaps', desc: 'Custom study paths adapted to your pace and goals.', details: 'Our AI analyzes your background, learning speed, and career goals to create a dynamic curriculum. It automatically adjusts if you need more time on complex topics or want to fast-track through basics.' },
    { icon: <Brain />, title: 'Smart Revision', desc: 'Spaced repetition engine to eliminate forgetting.', details: 'Using advanced cognitive science, our engine predicts exactly when you are about to forget a concept and schedules targeted reviews, ensuring long-term retention with minimal study time.' },
    { icon: <Target />, title: 'Adaptive Practice', desc: 'Quizzes that adjust difficulty based on your performance.', details: 'Say goodbye to static tests. Our adaptive practice sessions get harder as you master concepts and provide targeted hints when you struggle, keeping you in the optimal learning zone.' },
    { icon: <Code2 />, title: 'Coding Playground', desc: 'Real-time AI feedback on your code syntax and logic.', details: 'Write code in our browser-based IDE and get instant, context-aware feedback from our AI tutor. It spots bugs, suggests optimizations, and explains concepts just like a senior engineer would.' },
    { icon: <Users />, title: 'Mock Interviews', desc: 'Practice technical interviews with our voice AI coach.', details: 'Experience realistic technical and behavioral interviews with our voice-enabled AI coach. Get detailed feedback on your communication, technical accuracy, and problem-solving approach.' },
    { icon: <Briefcase />, title: 'Career Guidance', desc: 'Data-driven insights to prepare you for top tech roles.', details: 'We analyze millions of job postings to ensure you are learning the most in-demand skills. Get resume reviews, portfolio feedback, and interview prep tailored to your target companies.' },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-transparent relative">
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">Learning, <span className="text-gradient">Redefined.</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Our AI analyzes your strengths and weaknesses to generate a learning experience that is uniquely yours.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              onClick={() => setSelectedFeature(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 rounded-3xl group hover:bg-white/[0.04] transition-colors cursor-pointer border border-white/5 hover:border-cyan-500/30"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedFeature !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 relative shadow-2xl"
            >
              <button 
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 text-cyan-400">
                {features[selectedFeature].icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{features[selectedFeature].title}</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                {features[selectedFeature].details}
              </p>
              <button onClick={() => setSelectedFeature(null)} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function DashboardSection() {
  const [showAdvancedAnalytics, setShowAdvancedAnalytics] = useState(false);

  const performanceData = [
    { name: 'Mon', score: 65 },
    { name: 'Tue', score: 72 },
    { name: 'Wed', score: 85 },
    { name: 'Thu', score: 81 },
    { name: 'Fri', score: 90 },
    { name: 'Sat', score: 95 },
    { name: 'Sun', score: 98 },
  ];

  const advancedPerformanceData = [
    { name: 'Mon', score: 65, avg: 50 },
    { name: 'Tue', score: 72, avg: 55 },
    { name: 'Wed', score: 85, avg: 60 },
    { name: 'Thu', score: 81, avg: 62 },
    { name: 'Fri', score: 90, avg: 65 },
    { name: 'Sat', score: 95, avg: 68 },
    { name: 'Sun', score: 98, avg: 70 },
  ];

  const radarData = [
    { subject: 'Algorithms', A: 120, fullMark: 150 },
    { subject: 'System Design', A: 98, fullMark: 150 },
    { subject: 'React', A: 130, fullMark: 150 },
    { subject: 'Databases', A: 90, fullMark: 150 },
    { subject: 'Cloud', A: 85, fullMark: 150 },
  ];

  const advancedRadarData = [
    { subject: 'Algorithms', A: 120, peer: 90, fullMark: 150 },
    { subject: 'System Design', A: 98, peer: 80, fullMark: 150 },
    { subject: 'React', A: 130, peer: 100, fullMark: 150 },
    { subject: 'Databases', A: 90, peer: 75, fullMark: 150 },
    { subject: 'Cloud', A: 85, peer: 70, fullMark: 150 },
  ];

  return (
    <section id="dashboard" className="py-24 px-6 relative">
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
                Your <span className="text-gradient">Smart Dashboard.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Track your progress in real-time. Our AI identifies your weak spots and suggests targeted materials to improve your career readiness score.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Predictive performance analytics',
                  'Automated daily study goals',
                  'Skill radar charts & gap analysis'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" /> {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowAdvancedAnalytics(!showAdvancedAnalytics)} className={`px-6 py-3 rounded-full border transition-colors ${showAdvancedAnalytics ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10'}`}>
                {showAdvancedAnalytics ? 'Hide Advanced Analytics' : 'Explore Analytics'}
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="glass-panel rounded-3xl p-6 relative overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="text-sm text-slate-400 mb-1">Career Readiness</div>
                  <div className="text-3xl font-bold text-white">92<span className="text-lg text-cyan-400">%</span></div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="text-sm text-slate-400 mb-1">Learning Streak</div>
                  <div className="text-3xl font-bold text-white">14 <span className="text-lg text-purple-400">Days</span></div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-4 h-48 border border-white/5">
                  <div className="text-sm font-medium text-slate-300 mb-4">Performance Trend {showAdvancedAnalytics && '(vs Peers)'}</div>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={showAdvancedAnalytics ? advancedPerformanceData : performanceData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                        </linearGradient>
                        {showAdvancedAnalytics && (
                           <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                           </linearGradient>
                        )}
                      </defs>
                      <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" name="Your Score" />
                      {showAdvancedAnalytics && (
                        <Area type="monotone" dataKey="avg" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorAvg)" name="Peer Average" />
                      )}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 h-64 flex flex-col border border-white/5">
                  <div className="text-sm font-medium text-slate-300 mb-2">Skills Radar {showAdvancedAnalytics && '(vs Peers)'}</div>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={showAdvancedAnalytics ? advancedRadarData : radarData}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                        <Radar name="Your Skills" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
                        {showAdvancedAnalytics && (
                           <Radar name="Peer Average" dataKey="peer" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                        )}
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const courses = [
    { title: 'Generative AI Engineering', category: 'Artificial Intelligence', icon: <Brain />, level: 'Advanced', students: '24k', color: 'from-purple-500 to-indigo-500', youtubeLink: 'https://www.youtube.com/results?search_query=generative+ai+engineering+course' },
    { title: 'Full Stack Next.js 15', category: 'Web Development', icon: <LayoutTemplate />, level: 'Intermediate', students: '45k', color: 'from-blue-500 to-cyan-500', youtubeLink: 'https://www.youtube.com/results?search_query=nextjs+15+course' },
    { title: 'Cloud Infrastructure', category: 'DevOps', icon: <Cloud />, level: 'Advanced', students: '18k', color: 'from-cyan-500 to-teal-500', youtubeLink: 'https://www.youtube.com/results?search_query=cloud+infrastructure+course' },
    { title: 'Applied Data Science', category: 'Data', icon: <Database />, level: 'Beginner', students: '62k', color: 'from-green-500 to-emerald-500', youtubeLink: 'https://www.youtube.com/results?search_query=data+science+course' },
    { title: 'System Design Interview', category: 'Engineering', icon: <Layers />, level: 'Advanced', students: '33k', color: 'from-orange-500 to-red-500', youtubeLink: 'https://www.youtube.com/results?search_query=system+design+interview+course' },
    { title: 'Cybersecurity Fundamentals', category: 'Security', icon: <Shield />, level: 'Beginner', students: '29k', color: 'from-rose-500 to-pink-500', youtubeLink: 'https://www.youtube.com/results?search_query=cybersecurity+fundamentals+course' },
  ];

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="courses" className="py-24 px-6 bg-transparent border-y border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Master <span className="text-gradient">In-Demand</span> Skills.</h2>
            <p className="text-slate-400">Curated, AI-driven courses designed for the modern tech landscape.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search courses..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
            <a href="https://www.youtube.com/results?search_query=tech+courses" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors whitespace-nowrap">
              View All Courses <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, i) => (
              <motion.a 
                href={course.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="block glass-panel p-6 rounded-3xl group border border-white/5 hover:border-cyan-500/30 transition-colors cursor-pointer relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${course.color} rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-cyan-300 transition-colors">
                    {course.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                    {course.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors relative z-10">{course.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-400 relative z-10">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.level}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {course.students}</span>
                </div>
              </motion.a>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-400">
              No courses found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CareerSection() {
  const [selectedRole, setSelectedRole] = useState(0);

  const careerPaths = [
    {
      title: 'AI Engineer',
      description: 'Master Machine Learning, Neural Networks, NLP, and MLOps. Learn to deploy scalable models.',
      salary: '$160k+',
      jobReadiness: '98%',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Mathematics', 'LLMs', 'Prompt Engineering', 'LangChain', 'MLOps', 'Vector DBs']
    },
    {
      title: 'Software Engineer',
      description: 'Build scalable systems, master algorithms, and develop full-stack applications for the modern web.',
      salary: '$140k+',
      jobReadiness: '95%',
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'System Design', 'Algorithms', 'SQL', 'Git', 'Docker', 'Next.js']
    },
    {
      title: 'Data Scientist',
      description: 'Extract insights from complex data, build predictive models, and drive business decisions through analytics.',
      salary: '$135k+',
      jobReadiness: '94%',
      skills: ['Python', 'SQL', 'Pandas', 'Scikit-learn', 'Statistics', 'Data Visualization', 'A/B Testing', 'Machine Learning', 'Jupyter']
    },
    {
      title: 'Cloud Architect',
      description: 'Design and manage robust, secure, and scalable cloud infrastructures across AWS, GCP, and Azure.',
      salary: '$155k+',
      jobReadiness: '96%',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Networking', 'Security', 'Linux', 'Serverless', 'Microservices', 'GCP']
    }
  ];

  const currentPath = careerPaths[selectedRole];

  return (
    <section id="career" className="py-24 px-6 relative">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">From Learning to <span className="text-gradient">Leading.</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-16">
          Select a career path and let our AI build your exact roadmap. Includes estimated timelines, required skills, and portfolio project recommendations.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {careerPaths.map((role, i) => (
            <button 
              onClick={() => setSelectedRole(i)}
              key={i} 
              className={`block p-6 rounded-2xl border ${selectedRole === i ? 'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'border-white/10 glass-panel hover:border-cyan-500/50'} flex flex-col items-center justify-center cursor-pointer transition-colors w-full text-left`}
            >
              <h3 className={`text-lg font-bold mb-2 text-center ${selectedRole === i ? 'text-cyan-300' : 'text-white'}`}>{role.title}</h3>
              <span className="text-sm text-slate-400 text-center">View Roadmap &rarr;</span>
            </button>
          ))}
        </div>

        <motion.div 
          key={selectedRole}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-12 glass-panel p-8 md:p-12 rounded-3xl text-left border border-cyan-500/20 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none"></div>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-500/30">
                <Target className="w-3 h-3" /> Recommended Path
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-3">{currentPath.title} Roadmap</h3>
              <p className="text-slate-400 max-w-xl text-lg">{currentPath.description}</p>
            </div>
            <div className="flex gap-6 bg-black/40 p-6 rounded-2xl border border-white/5">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">{currentPath.salary}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Avg Salary</div>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">{currentPath.jobReadiness}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Job Readiness</div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 relative z-10">
            <div className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wide">Core Skills to Master</div>
            <div className="flex flex-wrap gap-3">
               {currentPath.skills.map(skill => (
                 <span key={skill} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-200 hover:bg-white/10 transition-colors cursor-default">
                   {skill}
                 </span>
               ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EcosystemSection() {
  const advancedFeatures = [
    'Virtual Classroom', 'Student Community', 'Hackathons', 'Coding Challenges', 
    'Research Labs', 'Open Source Projects', 'Internship Portal', 'Scholarships', 
    'Success Stories', 'Employer Partnerships', 'University Collaborations', 'Learning Blog', 
    'Resource Library', 'Events & Webinars', 'AI Mentor Chat', 'Parent Dashboard', 
    'Teacher Dashboard', 'Enterprise Learning'
  ];

  return (
    <section className="py-24 px-6 overflow-hidden relative border-y border-white/[0.05] bg-transparent">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto text-center relative z-10 mb-16">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">A Complete <span className="text-gradient">Ecosystem.</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          LearnSphere AI goes beyond just courses. It&apos;s a comprehensive platform for lifelong learning, career advancement, and institutional success.
        </p>
      </div>

      <div className="relative w-full max-w-7xl mx-auto flex flex-wrap justify-center gap-3 md:gap-4 z-10">
        {advancedFeatures.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.05 }}
            className="px-5 py-3 rounded-full glass-panel border border-white/5 hover:border-cyan-500/50 hover:bg-white/5 transition-colors cursor-default text-slate-300 font-medium text-sm md:text-base flex items-center gap-2"
          >
             <Sparkles className="w-4 h-4 text-cyan-400 opacity-50" /> {feature}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-transparent border-t border-white/[0.05] relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">Our <span className="text-gradient">Mission.</span></h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            We started LearnSphere AI in Silicon Valley with a simple belief: Education should adapt to the student, not the other way around. 
          </p>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            By leveraging advanced Large Language Models, we are making personalized, 1-on-1 tutoring accessible to every learner on the planet, eliminating the barriers of cost and geography.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-colors">
             <div className="text-5xl font-display font-bold text-cyan-400 mb-2">150+</div>
             <div className="text-slate-400 font-medium">Countries Reached</div>
          </div>
          <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-colors">
             <div className="text-5xl font-display font-bold text-purple-400 mb-2">50M</div>
             <div className="text-slate-400 font-medium">Lessons Completed</div>
          </div>
          <div className="glass-panel p-8 rounded-3xl col-span-2 flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 gap-6">
             <div className="text-center sm:text-left">
               <div className="text-2xl font-display font-bold text-white mb-1">Backed By</div>
               <div className="text-sm text-slate-300">Top Tier Silicon Valley VCs</div>
             </div>
             <div className="flex -space-x-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-[#020205] bg-white/10 overflow-hidden">
                    <Image src={`https://picsum.photos/seed/vc${i}/100/100`} alt="Partner" width={48} height={48} unoptimized referrerPolicy="no-referrer" />
                  </div>
                ))}
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection({ onStartLearning }: { onStartLearning: () => void }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsContactModalOpen(false);
    }, 3000);
  };

  return (
    <>
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto glass-panel p-8 md:p-16 rounded-[2.5rem] text-center relative overflow-hidden border border-white/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
               <Rocket className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">Ready to accelerate <br/> your career?</h2>
            <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">
              Join the community of forward-thinking learners. Start your personalized AI-driven journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={onStartLearning} className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-colors text-lg">
                Create Free Account
              </button>
              <button onClick={() => setIsContactModalOpen(true)} className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors text-lg inline-flex items-center justify-center">
                Contact Enterprise Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 relative shadow-2xl"
            >
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Enterprise Sales
                </h3>
                <p className="text-slate-400 text-sm">
                  Get in touch with our team to upgrade your organization&apos;s learning capabilities.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Request Sent!</h4>
                  <p className="text-slate-400">Our sales team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Company Name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Work Email</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Team Size</label>
                    <select required className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none">
                      <option value="" disabled selected>Select team size</option>
                      <option value="1-50">1-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 pt-20 pb-8 px-6 bg-[#020205] relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-white">LearnSphere<span className="text-cyan-400">.ai</span></span>
          </div>
          <p className="text-slate-400 text-base max-w-sm leading-relaxed mb-8">
            Help every learner master any skill through adaptive AI learning, personalized study plans, and intelligent tutoring.
          </p>
          <div className="flex gap-4">
             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors border border-white/5">
               <span className="sr-only">Twitter</span>
               <Twitter className="w-4 h-4" />
             </a>
             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors border border-white/5">
               <span className="sr-only">LinkedIn</span>
               <Linkedin className="w-4 h-4" />
             </a>
             <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors border border-white/5">
               <span className="sr-only">GitHub</span>
               <Github className="w-4 h-4" />
             </a>
             <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors border border-white/5">
               <span className="sr-only">YouTube</span>
               <Youtube className="w-4 h-4" />
             </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Platform</h4>
          <ul className="space-y-4 text-slate-400">
            <li><button onClick={() => { const el = document.getElementById('home'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors text-left">AI Tutor</button></li>
            <li><button onClick={() => { const el = document.getElementById('dashboard'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors text-left">Study Planner</button></li>
            <li><button onClick={() => { const el = document.getElementById('career'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors text-left">Mock Interviews</button></li>
            <li><button onClick={() => { const el = document.getElementById('courses'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors text-left">Coding Playground</button></li>
            <li><button onClick={() => { const el = document.getElementById('dashboard'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors text-left">Career Analytics</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
          <ul className="space-y-4 text-slate-400">
            <li><button onClick={() => { const el = document.getElementById('about'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors text-left">About Us</button></li>
            <li><button onClick={() => { const el = document.getElementById('career'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors text-left">Careers</button></li>
            <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors text-left">Blog</button></li>
            <li><a href="mailto:sales@learnsphere.ai" className="hover:text-cyan-400 transition-colors">Contact</a></li>
            <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors text-left">Partners</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Legal</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
            <li><a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Cookie Policy</a></li>
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Security</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500">© 2026 LearnSphere AI Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Additional decorative icons wrapper
function Briefcase(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}

function Cloud(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  );
}
