import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Landingpage from "./pages/Landingpage";
import Auth from "./pages/Auth";
import TemperatureMonitoring from "./pages/TemperatureMonitoring";
import HumidityMonitoring from "./pages/HumidityMonitoring";
import SoilMoistureMonitoring from "./pages/SoilMoistureMonitoring";
import LightIntensityMonitoring from "./pages/LightIntensityMonitoring";
import NutrientLevelsMonitoring from "./pages/NutrientLevelsMonitoring";
import PHLevelMonitoring from "./pages/PHLevelMonitoring";
import PlantCareTasks from "./pages/PlantCareTasks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Environmental Monitoring Routes */}
        <Route path="/dashboard/temperature" element={<TemperatureMonitoring />} />
        <Route path="/dashboard/humidity" element={<HumidityMonitoring />} />
        <Route path="/dashboard/soil-moisture" element={<SoilMoistureMonitoring />} />
        <Route path="/dashboard/light-intensity" element={<LightIntensityMonitoring />} />
        <Route path="/dashboard/nutrients" element={<NutrientLevelsMonitoring />} />
        <Route path="/dashboard/ph-level" element={<PHLevelMonitoring />} />
        
        {/* Plant Care Routes */}
        <Route path="/dashboard/daily-tasks" element={<PlantCareTasks />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
