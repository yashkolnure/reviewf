const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { getAuthUrl, oauth2Client } = require('../services/googleService');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');


// 1. GET /api/auth/google/url -> Returns the URL for the "Connect" button
router.get('/google/url', async (req, res) => {
  const { userId } = req.query; 
  const url = getAuthUrl(userId);
  res.json({ url });
});
<<<<<<< HEAD
// 2. GET /api/auth/google/callback
// 2. GET /api/auth/google/callback
router.get('/google/callback', async (req, res) => {
  const { code, state } = req.query; // 'state' is the userId
  
  if (!state) return res.redirect(`https://reviews.avenirya.com/?error=no_user_context`);

  try {
    const { tokens } = await oauth2Client.getToken(code);
    
    // Preparation for the update
    const updateData = { googleConnected: true };
    
    // CRITICAL: Only update the refresh token if Google actually sent it.
    // Google only sends it the first time unless prompt='consent' is used.
    if (tokens.refresh_token) {
      updateData.googleRefreshToken = tokens.refresh_token;
    }

    const updatedUser = await User.findByIdAndUpdate(
      state, 
      { $set: updateData }, 
      { new: true } // Returns the updated document for the console log below
    );

    console.log(`✅ User ${updatedUser.email} updated successfully!`);

    // Use HTTPS for production
    res.redirect(`https://reviews.avenirya.com/?connected=true`);
  } catch (err) {
    console.error("❌ OAuth Update Error:", err);
    res.redirect(`https://reviews.avenirya.com/?error=oauth_failed`);
=======

// 2. GET /api/auth/google/callback -> Where Google sends the user back
router.get('/google/callback', async (req, res) => {
  const { code, state } = req.query; // 'state' is the userId we passed
  try {
    const { tokens } = await oauth2Client.getToken(code);
    
    // Save tokens to the User in MongoDB
    await User.findByIdAndUpdate(state, {
      googleRefreshToken: tokens.refresh_token,
      googleConnected: true
    });

    // Redirect user back to the frontend dashboard
    res.redirect(`http://localhost:3000/?connected=true`);
  } catch (err) {
    console.error("OAuth Error", err);
    res.redirect(`http://localhost:3000/?error=oauth_failed`);
>>>>>>> d14f6c33b2c52dc1ef80db350caf70b49d704961
  }
});

// POST /api/auth/register
router.post('/register', register);
router.get('/me', auth, getMe);
// POST /api/auth/login
router.post('/login', login);

module.exports = router;