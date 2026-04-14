const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
<<<<<<< HEAD
  process.env.GOOGLE_REDIRECT_URI //
);

exports.getAuthUrl = (userId) => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline', // Gets refresh_token
    prompt: 'consent',     // FORCES Google to send the refresh_token again
    scope: ['https://www.googleapis.com/auth/business.manage'],
    state: userId          // The ID we catch in the callback
=======
  process.env.GOOGLE_REDIRECT_URI // Should be http://localhost:5000/api/auth/google/callback
);

const getAuthUrl = (userId) => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline', // CRITICAL: Gets the refresh_token
    prompt: 'consent',     // Forces Google to show the refresh_token again
    scope: [
      'https://www.googleapis.com/auth/business.manage',
      'email',
      'profile'
    ],
    state: userId // We pass the DB User ID to identify them in the callback
>>>>>>> d14f6c33b2c52dc1ef80db350caf70b49d704961
  });
};

module.exports = { oauth2Client, getAuthUrl };