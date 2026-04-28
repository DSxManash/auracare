import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Thermometer, Droplets, Sprout, Sun, Menu, X, ArrowRight, 
  Shield, Zap, CheckCircle, Globe, Leaf, Eye, EyeOff, Loader2, ArrowLeft 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const features = [
  { icon: Thermometer, title: 'Temperature Control', desc: 'Real-time heat monitoring with zone-level alerts.', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { icon: Droplets, title: 'Humidity Tracking', desc: 'Precision vapor monitoring for optimal transpiration.', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { icon: Sun, title: 'Light Intensity', desc: 'PAR sensor integration for photosynthesis control.', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { icon: Sprout, title: 'Soil Intelligence', desc: 'Moisture and nutrient sensors keep roots at peak health.', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { icon: Shield, title: 'Secure & Reliable', desc: 'AES-256 encrypted data with 99.9% uptime SLA.', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { icon: Zap, title: 'Instant Alerts', desc: 'Notifications the moment readings leave safe range.', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
];

const stats = [
  { value: '99.9%', label: 'Uptime' },
  { value: '6+', label: 'Sensor Types' },
  { value: '24/7', label: 'Monitoring' },
  { value: '<5s', label: 'Alert Speed' },
];

// Internal Auth Popup Component
const AuthPopup = ({ isOpen, onClose, initialView = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialView === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(initialView === 'login');
  }, [initialView]);

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      onClose();
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const body = isLogin ? { email: form.email, password: form.password } : form;
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      login(data.accessToken, data.user);
      onClose();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 md:p-12 border border-slate-200/50 dark:border-white/5 shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[60px] -mr-16 -mt-16 pointer-events-none" />
            <button onClick={onClose} className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-slate-50 dark:bg-white/5 rounded-xl">
              <X size={18} />
            </button>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Leaf size={18} className="text-white" />
              </div>
              <span className="font-black text-slate-900 dark:text-white text-base tracking-tight uppercase">AuraCare</span>
            </div>
            <div className="mb-10 text-left">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {isLogin ? 'Welcome\nback.' : 'Join the\nnursery.'}
              </h1>
              <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-3 font-medium leading-relaxed">
                {isLogin ? 'Sign in to access your dashboard.' : 'Create an account to start monitoring.'}
              </p>
            </div>
            {error && (
              <div className="mb-6 px-4 py-3 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-500 text-[11px] font-bold uppercase tracking-wider flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="input-field h-12 text-sm px-5 bg-slate-50/50 dark:bg-white/5"
                    required={!isLogin}
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="jane@nursery.com"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="input-field h-12 text-sm px-5 bg-slate-50/50 dark:bg-white/5"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    className="input-field h-12 text-sm px-5 pr-12 bg-slate-50/50 dark:bg-white/5"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full h-12 justify-center text-[11px] font-black uppercase tracking-[0.2em] mt-4 shadow-xl shadow-accent/20 group">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <> {isLogin ? 'Sign In' : 'Create Account'} <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-1 transition-transform" /> </>}
              </button>
            </form>
            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 text-center">
              <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button onClick={() => setIsLogin(!isLogin)} className="text-accent font-bold hover:underline ml-1">
                  {isLogin ? 'Sign up for free' : 'Sign in to account'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Landingpage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authView, setAuthView] = useState('login');
  const navigate = useNavigate();
  const location = useLocation();

  // Show popup if route is /auth
  const isAuthOpen = location.pathname === '/auth';

  const openAuth = (view = 'login') => {
    setAuthView(view);
    setMenuOpen(false);
    navigate('/auth');
  };

  const closeAuth = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-base">AuraCare</span>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              <a href="#features" className="text-[13px] font-bold text-slate-500 dark:text-slate-400 hover:text-accent transition-colors uppercase tracking-wider">Features</a>
              <a href="#about" className="text-[13px] font-bold text-slate-500 dark:text-slate-400 hover:text-accent transition-colors uppercase tracking-wider">About</a>
            </div>
            <div className="h-6 w-px bg-slate-100 dark:bg-slate-800" />
            <div className="flex items-center gap-6">
              <ThemeToggle />
              <div className="flex items-center gap-4">
                <button onClick={() => openAuth('login')} className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.15em] hover:text-accent transition-colors">Login</button>
                <button onClick={() => openAuth('register')} className="btn-primary text-[10px] px-7 h-10 uppercase tracking-[0.15em] font-black shadow-xl shadow-emerald-500/20">Get Started</button>
              </div>
            </div>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-6 py-4 space-y-3">
            <a href="#features" className="block text-sm text-slate-600 dark:text-slate-400 py-2">Features</a>
            <a href="#about" className="block text-sm text-slate-600 dark:text-slate-400 py-2">About</a>
            <button onClick={() => openAuth('register')} className="btn-primary w-full justify-center mt-2">Get Started</button>
          </div>
        )}
      </header>

      <AuthPopup isOpen={isAuthOpen} onClose={closeAuth} initialView={authView} />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em]">Always-on Monitoring</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-8 max-w-4xl">
          Intelligent care for<br /><span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">modern nurseries</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mb-12 font-medium leading-relaxed">
          AuraCare combines real-time sensor intelligence, automated alerts, and care scheduling into one platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-24 w-full sm:w-auto">
          <button onClick={() => openAuth('register')} className="btn-primary px-10 py-4 text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-accent/20">
            Start Free <ArrowRight size={14} />
          </button>
          <button onClick={() => openAuth('login')} className="btn-secondary px-10 py-4 text-xs font-black uppercase tracking-[0.2em] bg-white dark:bg-slate-900 border-slate-100 dark:border-white/5">View Dashboard</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 w-full max-w-4xl border-y border-slate-100 dark:border-white/5 py-12">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{s.value}</div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-[#fafafa] dark:bg-slate-900/50 py-24 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Everything you need to thrive</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm font-medium">Six sensor-driven modules working in harmony to keep your plants at peak health.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white dark:bg-slate-900/40 rounded-3xl p-8 border border-slate-100 dark:border-white/5 hover:border-accent transition-all duration-300 group">
                <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <f.icon size={20} className={f.color} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for section */}
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-left">
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Built for modern<br />nurseries</h2>
                <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-md">
                  Whether you manage a boutique greenhouse or a large-scale commercial operation, AuraCare scales with you. Real data, real time, zero downtime.
                </p>
              </div>
              <ul className="space-y-5">
                {['Real-time readings across all sensor zones', 'Staff scheduling and task assignment', 'Automated alerts for out-of-range conditions', 'Historical trend analysis and reporting'].map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/5 flex items-center justify-center shrink-0 border border-emerald-500/10">
                      <CheckCircle size={14} className="text-emerald-500" />
                    </div>
                    <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => openAuth('register')} className="btn-primary px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-accent/10">Get started <ArrowRight size={14} /></button>
            </div>
            <div className="bg-slate-900 dark:bg-slate-900/80 rounded-[3rem] p-12 space-y-8 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32" />
              <div className="flex items-center justify-between mb-4 relative">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Zone Status</span>
                <span className="text-[9px] text-emerald-400 font-black flex items-center gap-2 uppercase tracking-[0.2em] bg-emerald-400/5 px-4 py-1.5 rounded-full border border-emerald-400/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Sensor
                </span>
              </div>
              {[
                { label: 'Temperature', val: '24°C', pct: 72, color: 'bg-emerald-400' },
                { label: 'Humidity', val: '65%', pct: 65, color: 'bg-emerald-500' },
                { label: 'Light', val: '820 lux', pct: 55, color: 'bg-emerald-600' },
                { label: 'Soil Moisture', val: '42%', pct: 42, color: 'bg-emerald-700' },
              ].map((r) => (
                <div key={r.label} className="space-y-3 relative">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                    <span className="text-white/30">{r.label}</span>
                    <span className="text-white">{r.val}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${r.color} opacity-80`} style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-6 pt-6 relative">
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                  <div className="text-emerald-400 font-black text-2xl tracking-tighter">99.9%</div>
                  <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mt-1.5">Uptime SLA</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                  <div className="text-emerald-400 font-black text-2xl tracking-tighter">AES-256</div>
                  <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mt-1.5">Security</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 dark:bg-emerald-700 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Ready to grow smarter?</h2>
          <p className="text-emerald-100 font-medium text-lg">Join nurseries already using AuraCare to monitor and scale their operations.</p>
          <button onClick={() => openAuth('register')} className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-white text-emerald-700 text-xs font-black uppercase tracking-[0.2em] hover:bg-emerald-50 transition-all shadow-2xl shadow-black/10">
            Start for free <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 border-b border-white/5 pb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <Leaf size={13} className="text-white" />
                </div>
                <span className="font-bold text-white text-sm">AuraCare</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">Intelligent plant care for serious growers.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Product</p>
              <ul className="space-y-2 text-xs">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><button onClick={() => openAuth('login')} className="hover:text-white transition-colors">Dashboard</button></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Company</p>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Legal</p>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} AuraCare. All rights reserved.</p>
            <Globe size={15} className="text-slate-600" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;