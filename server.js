import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock Data
let heartDataHistory = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  value: 60 + Math.random() * 40
}));

let currentVitals = {
  heartRate: 72,
  bloodPressure: "118/76",
  oxygenLevel: 98,
  temperature: 36.6,
  sleepQuality: "Optimal"
};

// Simulate real-time data changes
setInterval(() => {
  const newRate = 60 + Math.random() * 40;
  currentVitals.heartRate = Math.round(newRate);
  
  // Fluctuate oxygen and temp slightly for realism
  currentVitals.oxygenLevel = 95 + Math.floor(Math.random() * 5); // 95 to 99
  currentVitals.temperature = (36.5 + Math.random() * 0.4).toFixed(1); // 36.5 to 36.9
  
  heartDataHistory.push({
    time: heartDataHistory[heartDataHistory.length - 1].time + 1,
    value: newRate
  });
  
  // Keep only the last 20 elements
  if (heartDataHistory.length > 20) {
    heartDataHistory.shift();
  }
}, 2000);

// API Endpoints
app.get('/api/vitals', (req, res) => {
  res.json({
    current: currentVitals,
    history: heartDataHistory
  });
});

app.get('/api/insights', (req, res) => {
  res.json([
    {
      id: 1,
      type: "success",
      message: "Sleep pattern improved by 15% this week. Deep sleep duration optimal."
    },
    {
      id: 2,
      type: "warning",
      message: "Slight irregular heartbeat detected at 02:45 AM. Recommendation: Schedule routine checkup."
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
