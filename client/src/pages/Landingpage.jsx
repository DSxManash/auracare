import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Droplets, 
  Sprout, 
  Sun, 
  Menu,
  X,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Layout,
  Code
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Landingpage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-emerald rounded-lg flex items-center justify-center">
              <Sprout className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">AuraCare</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <ThemeToggle />
            <button onClick={() => navigate('/auth')} className="text-sm font-semibold hover:text-emerald transition-colors">Login</button>
            <button onClick={() => navigate('/auth')} className="btn-primary py-2.5 px-6">Get Started</button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 p-6 border-b border-slate-100 dark:border-slate-800 space-y-4">
            <button onClick={() => navigate('/auth')} className="block w-full text-left font-bold py-2">Login</button>
            <button onClick={() => navigate('/auth')} className="btn-primary w-full">Get Started</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 text-center max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
            Nursery Intelligence, <br />
            <span className="text-emerald">Simplified.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Monitor, automate, and grow your greenhouse with scientific precision. Professional tools for modern botanical care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate('/auth')} className="btn-primary px-10 py-4 text-base shadow-lg shadow-emerald/20">
              Start Growing Now
            </button>
            <button className="btn-secondary px-10 py-4 text-base">
              Explore Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features - Minimal */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Thermometer, title: 'Thermal IQ', desc: 'Precision heat monitoring and automated climate control.' },
            { icon: Droplets, title: 'Moisture Pulse', desc: 'Real-time soil hydration data for every species.' },
            { icon: Sun, title: 'Light Sync', desc: 'Optimize photosynthesis with solar-aware lighting.' },
          ].map((f, i) => (
            <div key={i} className="card-minimal group hover:border-emerald dark:hover:border-emerald transition-all">
              <div className="w-12 h-12 bg-emerald/10 text-emerald rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Stats/Trust */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around items-center gap-12 text-center">
          <div>
            <p className="text-4xl font-black text-emerald mb-2">99.9%</p>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">System Uptime</p>
          </div>
          <div>
            <p className="text-4xl font-black text-emerald mb-2">24/7</p>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Smart Monitoring</p>
          </div>
          <div>
            <p className="text-4xl font-black text-emerald mb-2">AES</p>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Secure Data</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-black mb-6">Ready for the future?</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-10">Join a global community of modern nurseries scaling with AuraCare.</p>
        <button onClick={() => navigate('/auth')} className="btn-primary px-12 py-5 text-lg mx-auto">
          Get Started for Free
        </button>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-12 border-t border-slate-100 dark:border-slate-800 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald rounded-md flex items-center justify-center">
              <Sprout className="text-white w-4 h-4" />
            </div>
            <span className="font-bold">AuraCare</span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-emerald">Privacy</a>
            <a href="#" className="hover:text-emerald">Terms</a>
            <a href="#" className="hover:text-emerald">Twitter</a>
          </div>

          <p className="text-sm text-slate-400 font-medium">© 2026 AuraCare Intelligence</p>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;