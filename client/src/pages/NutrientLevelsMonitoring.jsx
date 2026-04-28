import React from 'react';
import MetricPage from '../components/MetricPage';
import { FlaskConical } from 'lucide-react';

const NutrientLevelsMonitoring = () => {
  return (
    <MetricPage 
      title="Nutrient Levels (EC)"
      icon={FlaskConical}
      currentVal={1.8}
      unit=" mS"
      minVal={1.2}
      maxVal={2.4}
      optimalMin={1.5}
      optimalMax={2.0}
      assessment="Electrical conductivity (EC) shows balanced nutrient availability. Nitrogen levels are slightly elevated, supporting rapid foliage growth."
      trend="Stable"
      alertLevel="> 3.0 mS"
    />
  );
};

export default NutrientLevelsMonitoring;
