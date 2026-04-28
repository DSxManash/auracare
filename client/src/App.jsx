import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Landingpage from './pages/Landingpage';
import Dashboard from './pages/Dashboard';
import TemperatureMonitoring from './pages/TemperatureMonitoring';
import HumidityMonitoring from './pages/HumidityMonitoring';
import SoilMoistureMonitoring from './pages/SoilMoistureMonitoring';
import LightIntensityMonitoring from './pages/LightIntensityMonitoring';
import NutrientLevelsMonitoring from './pages/NutrientLevelsMonitoring';
import PHLevelMonitoring from './pages/PHLevelMonitoring';
import PlantCareTasks from './pages/PlantCareTasks';
import PlantsList from './pages/PlantsList';
import StaffManagement from './pages/StaffManagement';
import Settings from './pages/Settings';

import { useAuth } from './context/AuthContext';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
        <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Initializing AuraCare...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/auth" element={<Landingpage />} />
        <Route path="/dashboard" element={<Dashboard />} />

            {/* Sensor Monitoring */}
            <Route path="/dashboard/temperature" element={<TemperatureMonitoring />} />
            <Route path="/dashboard/humidity" element={<HumidityMonitoring />} />
            <Route path="/dashboard/soil-moisture" element={<SoilMoistureMonitoring />} />
            <Route path="/dashboard/light-intensity" element={<LightIntensityMonitoring />} />
            <Route path="/dashboard/nutrients" element={<NutrientLevelsMonitoring />} />
            <Route path="/dashboard/ph-level" element={<PHLevelMonitoring />} />

            {/* Plant Care */}
            <Route path="/dashboard/daily-tasks" element={<PlantCareTasks />} />
            <Route path="/dashboard/plants" element={<PlantsList />} />

            {/* Admin */}
            <Route path="/dashboard/staff" element={<StaffManagement />} />
            <Route path="/dashboard/settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
