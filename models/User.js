const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  plan: { type: String, default: 'STARTER' }, 
  googleConnected: { type: Boolean, default: false },
  googleRefreshToken: { type: String },
  googleLocationId: { type: String },
  businessName: { type: String },
  businessAddress: { type: String },
  
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);