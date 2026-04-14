const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
<<<<<<< HEAD
  plan: { type: String, default: 'STARTER' }, 
  googleConnected: { type: Boolean, default: false },
  googleRefreshToken: { type: String },
  googleLocationId: { type: String },
  businessName: { type: String },
  businessAddress: { type: String },
  
=======
  plan: { type: String, default: 'NONE' }, // Keeps track of tier for the dashboard
>>>>>>> d14f6c33b2c52dc1ef80db350caf70b49d704961
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);