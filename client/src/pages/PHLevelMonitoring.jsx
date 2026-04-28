import React from 'react';
import MetricPage from '../components/MetricPage';
import { FlaskConical } from 'lucide-react';

const PHLevelMonitoring = () => {
  return (
    <MetricPage 
      title="pH Level"
      icon={FlaskConical}
      currentVal={6.8}
      unit=""
      minVal={5.5}
      maxVal={7.5}
      optimalMin={6.0}
      optimalMax={7.0}
      assessment="pH is slightly leaning towards alkaline but remains within the safety buffer for most greenhouse species."
      trend="Stable"
      alertLevel="< 5.0 or > 8.0"
    />
  );
};

export default PHLevelMonitoring;
