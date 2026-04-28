import React from 'react';
import MetricPage from '../components/MetricPage';
import { FlaskConical } from 'lucide-react';

const history = [
  { time: '10:00 AM', value: 1.8 },
  { time: '9:30 AM', value: 1.9 },
  { time: '9:00 AM', value: 2.1 },
  { time: '8:30 AM', value: 2.0 },
  { time: '8:00 AM', value: 1.7 },
];

const NutrientLevelsMonitoring = () => (
  <MetricPage
    title="Nutrient Levels (EC)"
    icon={FlaskConical}
    currentVal={1.8}
    unit=" mS/cm"
    minVal={0}
    maxVal={5}
    optimalMin={1.5}
    optimalMax={2.5}
    history={history}
    description="Electrical conductivity of nutrient solution"
  />
);

export default NutrientLevelsMonitoring;
