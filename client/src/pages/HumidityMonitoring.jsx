import React from 'react';
import MetricPage from '../components/MetricPage';
import { Droplets } from 'lucide-react';

const history = [
  { time: '10:00 AM', value: 65 },
  { time: '9:30 AM', value: 68 },
  { time: '9:00 AM', value: 70 },
  { time: '8:30 AM', value: 67 },
  { time: '8:00 AM', value: 63 },
];

const HumidityMonitoring = () => (
  <MetricPage
    title="Humidity"
    icon={Droplets}
    currentVal={65}
    unit="%"
    minVal={20}
    maxVal={100}
    optimalMin={55}
    optimalMax={75}
    history={history}
    description="Relative air humidity across zones"
  />
);

export default HumidityMonitoring;
