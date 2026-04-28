import React from 'react';
import MetricPage from '../components/MetricPage';
import { Sun } from 'lucide-react';

const history = [
  { time: '10:00 AM', value: 820 },
  { time: '9:30 AM', value: 780 },
  { time: '9:00 AM', value: 650 },
  { time: '8:30 AM', value: 500 },
  { time: '8:00 AM', value: 320 },
];

const LightIntensityMonitoring = () => (
  <MetricPage
    title="Light Intensity"
    icon={Sun}
    currentVal={820}
    unit=" lux"
    minVal={0}
    maxVal={2000}
    optimalMin={600}
    optimalMax={1200}
    history={history}
    description="Photosynthetically active radiation (PAR)"
  />
);

export default LightIntensityMonitoring;
