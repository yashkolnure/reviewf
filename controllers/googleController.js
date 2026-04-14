const { google } = require('googleapis');
const User = require('../models/User');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Helper to get an authorized client for a specific user
const getAuthClient = (refreshToken) => {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  client.setCredentials({ refresh_token: refreshToken });
  return client;
};

// 1. Fetch Locations from Google (Fixes the 404)
exports.getLocations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.googleRefreshToken) return res.status(401).json({ message: "Google not connected" });

    const auth = getAuthClient(user.googleRefreshToken);

    // Step A: Get the Google Account ID
    const accounts = await auth.request({
      url: 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts'
    });
    
    if (!accounts.data.accounts || accounts.data.accounts.length === 0) {
        return res.json([]);
    }
    
    const accountName = accounts.data.accounts[0].name;

    // Step B: Get Locations for that account
    const locations = await auth.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=name,title,storefrontAddress`
    });

    res.json(locations.data.locations || []);
  } catch (err) {
    console.error("Fetch Locations Error:", err);
    res.status(500).json({ error: "Failed to fetch locations from Google" });
  }
};

// 2. Save the Location selected by the user (Fixes the 404)
exports.saveLocation = async (req, res) => {
  const { locationId, businessName } = req.body;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      googleLocationId: locationId,
      businessName: businessName
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save location selection" });
  }
};