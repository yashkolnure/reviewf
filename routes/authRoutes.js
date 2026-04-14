const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');
const { register, login, getMe } = require('../controllers/authController');
const { getAuthUrl, oauth2Client } = require('../services/googleService');

// Import the new functions from the controller
const { getLocations, saveLocation } = require('../controllers/googleController');

// --- Google OAuth Redirect & Callback ---

router.get('/google/url', auth, async (req, res) => {
  // Use the ID from the auth middleware to ensure security
  const url = getAuthUrl(req.user.id);
  res.json({ url });
});

router.get('/google/callback', async (req, res) => {
  const { code, state } = req.query; 
  if (!state) return res.redirect(`https://reviews.avenirya.com/?error=no_user_context`);

  try {
    const { tokens } = await oauth2Client.getToken(code);
    const updateData = { googleConnected: true };

    if (tokens.refresh_token) {
      updateData.googleRefreshToken = tokens.refresh_token;
    }

    await User.findByIdAndUpdate(state, { $set: updateData });
    res.redirect(`https://reviews.avenirya.com/?connected=true`);
  } catch (err) {
    console.error("❌ OAuth Update Error:", err);
    res.redirect(`https://reviews.avenirya.com/?error=oauth_failed`);
  }
});

// --- Business Management Routes (The ones that were 404) ---

router.get('/google/locations', auth, getLocations);
router.post('/google/save-location', auth, saveLocation);

// --- Standard Auth ---
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);

module.exports = router;