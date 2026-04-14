const mongoose = require('mongoose');
const BusinessSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  googleLocationId: { type: String, unique: true },
  accessToken: { type: String },
  refreshToken: { type: String },
  autoReplyEnabled: { type: Boolean, default: false },
  whatsappNotification: { type: String }, // Phone number
}, { timestamps: true });
module.exports = mongoose.model('Business', BusinessSchema);