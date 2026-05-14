const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Example of protected route for doctors only
router.get('/doctor-dashboard', protect, authorize('doctor', 'admin'), (req, res) => {
  res.json({ message: "Welcome to the Doctor's Dashboard" });
});

module.exports = router;
