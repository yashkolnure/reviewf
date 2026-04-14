const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI //
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
  });
};

module.exports = { oauth2Client, getAuthUrl };