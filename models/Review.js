const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  googleReviewId: { type: String, unique: true },
  reviewerName: { type: String },
  rating: { type: Number, required: true },
  comment: { type: String },
  reply: { type: String },
  status: { type: String, enum: ['PENDING', 'REPLIED'], default: 'PENDING' },
}, { timestamps: true });
module.exports = mongoose.model('Review', ReviewSchema);