import React from 'react';
import MetricPage from '../components/MetricPage';
import { Thermometer } from 'lucide-react';

const TemperatureMonitoring = () => {
  return (
    <MetricPage 
      title="Temperature Monitoring"
      icon={Thermometer}
      currentVal={24}
      unit="°C"
      minVal={18}
      maxVal={32}
      optimalMin={18}
      optimalMax={28}
      assessment="Temperature is within optimal range for current species. Cooling systems are on standby."
      trend="Stable"
      alertLevel="> 35°C"
    />
  );
};

export default TemperatureMonitoring;
