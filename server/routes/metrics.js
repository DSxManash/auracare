import { Router } from 'express';
import { asyncHandler } from '../middleware/error.js';

const router = Router();

// Mock sensor data
router.get('/current', asyncHandler(async (req, res) => {
  res.json({
    temperature: 24,
    humidity: 65,
    soilMoisture: 42,
    lightIntensity: 850,
    nutrients: 'Balanced',
    phLevel: 6.8,
    timestamp: new Date().toISOString()
  });
}));

router.get('/history', asyncHandler(async (req, res) => {
  // Generate last 24 hours of mock data
  const history = Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, '0')}:00`,
    temperature: 20 + Math.random() * 10,
    humidity: 50 + Math.random() * 20,
  }));
  res.json(history);
}));

export default router;
