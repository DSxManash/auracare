import React from 'react';
import MetricPage from '../components/MetricPage';
import { Droplets } from 'lucide-react';

const HumidityMonitoring = () => {
  return (
    <MetricPage 
      title="Humidity Monitoring"
      icon={Droplets}
      currentVal={65}
      unit="%"
      minVal={45}
      maxVal={75}
      optimalMin={50}
      optimalMax={70}
      assessment="Humidity within ideal range with balanced moisture levels for current plant species."
      trend="Stable"
      alertLevel="< 30% or > 90%"
    />
  );
};

export default HumidityMonitoring;
