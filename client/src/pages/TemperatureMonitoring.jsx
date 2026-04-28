import React from 'react';
import MetricPage from '../components/MetricPage';
import { Thermometer } from 'lucide-react';

const history = [
  { time: '10:00 AM', value: 24 },
  { time: '9:30 AM', value: 23 },
  { time: '9:00 AM', value: 22 },
  { time: '8:30 AM', value: 21 },
  { time: '8:00 AM', value: 20 },
];

const TemperatureMonitoring = () => (
  <MetricPage
    title="Temperature"
    icon={Thermometer}
    currentVal={24}
    unit="°C"
    minVal={10}
    maxVal={40}
    optimalMin={20}
    optimalMax={28}
    history={history}
    description="Zone ambient air temperature"
  />
);

export default TemperatureMonitoring;
