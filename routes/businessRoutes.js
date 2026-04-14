const express = require('express');
const router = express.Router();
const Business = require('../src/models/Business');
const { google } = require('googleapis');

// Connect GMB Account
router.post('/connect', async (req, res) => {
  const { userId, locationId, accessToken, refreshToken, name } = req.body;
  try {
    const business = await Business.findOneAndUpdate(
      { googleLocationId: locationId },
      { userId, name, accessToken, refreshToken },
      { upsert: true, new: true }
    );
    res.json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;