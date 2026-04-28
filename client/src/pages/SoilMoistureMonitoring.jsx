import React from 'react';
import MetricPage from '../components/MetricPage';
import { Droplets } from 'lucide-react';

const SoilMoistureMonitoring = () => {
  return (
    <MetricPage 
      title="Soil Moisture"
      icon={Droplets}
      currentVal={42}
      unit="%"
      minVal={35}
      maxVal={55}
      optimalMin={40}
      optimalMax={60}
      assessment="Soil moisture is slightly low in the top layer. Deeper root zones remain stable but a light watering cycle is recommended."
      trend="Decreasing"
      alertLevel="< 20%"
    />
  );
};

export default SoilMoistureMonitoring;
