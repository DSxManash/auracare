import React from 'react';
import MetricPage from '../components/MetricPage';
import { Droplets } from 'lucide-react';

const history = [
  { time: '10:00 AM', value: 42 },
  { time: '9:30 AM', value: 45 },
  { time: '9:00 AM', value: 48 },
  { time: '8:30 AM', value: 50 },
  { time: '8:00 AM', value: 52 },
];

const SoilMoistureMonitoring = () => (
  <MetricPage
    title="Soil Moisture"
    icon={Droplets}
    currentVal={42}
    unit="%"
    minVal={0}
    maxVal={100}
    optimalMin={45}
    optimalMax={70}
    history={history}
    description="Volumetric water content in root zone"
  />
);

export default SoilMoistureMonitoring;
