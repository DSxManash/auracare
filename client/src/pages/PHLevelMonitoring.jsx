import React from 'react';
import MetricPage from '../components/MetricPage';
import { FlaskConical } from 'lucide-react';

const history = [
  { time: '10:00 AM', value: 5.8 },
  { time: '9:30 AM', value: 5.9 },
  { time: '9:00 AM', value: 6.1 },
  { time: '8:30 AM', value: 6.3 },
  { time: '8:00 AM', value: 6.5 },
];

const PHLevelMonitoring = () => (
  <MetricPage
    title="pH Level"
    icon={FlaskConical}
    currentVal={5.8}
    unit=" pH"
    minVal={4}
    maxVal={9}
    optimalMin={6.0}
    optimalMax={7.0}
    history={history}
    description="Acidity of water and soil in root zone"
  />
);

export default PHLevelMonitoring;
