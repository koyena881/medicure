const express = require('express');
const router = express.Router();

// Mock Data State
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

// Simulate real-time background updates
setInterval(() => {
  const newRate = 60 + Math.random() * 40;
  currentVitals.heartRate = Math.round(newRate);
  
  currentVitals.oxygenLevel = 95 + Math.floor(Math.random() * 5); // 95 to 99
  currentVitals.temperature = (36.5 + Math.random() * 0.4).toFixed(1); // 36.5 to 36.9
  
  heartDataHistory.push({
    time: heartDataHistory[heartDataHistory.length - 1].time + 1,
    value: newRate
  });
  
  if (heartDataHistory.length > 20) {
    heartDataHistory.shift();
  }
}, 2000);

// Routes
router.get('/vitals', (req, res) => {
  res.json({
    current: currentVitals,
    history: heartDataHistory
  });
});

router.get('/insights', (req, res) => {
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

router.post('/chat', (req, res) => {
  const { sender, text } = req.body;
  console.log(`\n💬 [CHAT MESSAGE] From: ${sender}`);
  console.log(`   "${text}"\n`);
  res.json({ success: true });
});

router.post('/payment', (req, res) => {
  const { amount, cardLast4 } = req.body;
  console.log(`\n💳 [PAYMENT PROCESSED]`);
  console.log(`   Amount: $${amount}`);
  console.log(`   Card ending in: ${cardLast4}\n`);
  res.json({ success: true });
});

router.post('/approve-appointment', (req, res) => {
  const { patientName, doctorName } = req.body;
  console.log(`\n📅 [APPOINTMENT APPROVED]`);
  console.log(`   Patient: ${patientName}`);
  console.log(`   Doctor: ${doctorName}\n`);
  res.json({ success: true });
});

router.post('/sos', (req, res) => {
  const { location, contacts = [] } = req.body;
  
  // In a production environment, you would use Twilio or AWS SNS here.
  console.log(`\n\n🚨🚨 [CRITICAL EMERGENCY] SOS TRIGGERED 🚨🚨`);
  console.log(`📍 Location: LAT ${location?.lat || 'Unknown'}, LNG ${location?.lng || 'Unknown'}`);
  console.log(`✉️ Dispatching emergency SMS...`);
  
  if (contacts.length > 0) {
    contacts.forEach(contact => {
      console.log(`   -> Sending SMS to ${contact.name} at ${contact.phone}: "EMERGENCY: Patient requires immediate assistance. Live location attached."`);
    });
  } else {
    console.log(`   (No emergency contacts found, alerting primary responders only)`);
  }
  
  console.log(`🚑 Alerting City General Hospital dispatch...`);
  console.log(`✅ All emergency protocols successfully initiated.\n\n`);
  
  res.status(200).json({ success: true, message: "Emergency messages dispatched successfully." });
});

module.exports = router;
