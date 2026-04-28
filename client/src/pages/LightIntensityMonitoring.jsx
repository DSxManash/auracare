import React from 'react';
import MetricPage from '../components/MetricPage';
import { Sun } from 'lucide-react';

const LightIntensityMonitoring = () => {
  return (
    <MetricPage 
      title="Light Intensity"
      icon={Sun}
      currentVal={850}
      unit=" lx"
      minVal={200}
      maxVal={1200}
      optimalMin={600}
      optimalMax={1000}
      assessment="Light levels are perfect for photosynthesis. Shading system is at 20% to prevent leaf burn during peak sun."
      trend="Stable"
      alertLevel="> 1500 lx"
    />
  );
};

export default LightIntensityMonitoring;
