const { getAuthorizedClient } = require('../services/googleService');
const User = require('../models/User');

// 1. Fetch all locations (businesses) the user owns
exports.getLocations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const auth = getAuthorizedClient(user.googleRefreshToken);

    // Get the Account ID first
    const accounts = await auth.request({
      url: 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts'
    });
    const accountName = accounts.data.accounts[0].name;

    // Get locations for that account
    const locations = await auth.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=name,title,storefrontAddress`
    });

    res.json(locations.data.locations || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Fetch real reviews for the selected location
exports.getReviews = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.googleLocationId) return res.status(400).json({ message: "No location selected" });

    const auth = getAuthorizedClient(user.googleRefreshToken);
    
    // Using v4 for reviews as it's the most stable for list operations
    const reviews = await auth.request({
      url: `https://mybusiness.googleapis.com/v4/${user.googleLocationId}/reviews`
    });

    res.json(reviews.data.reviews || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};