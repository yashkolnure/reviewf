const express = require('express');
const router = express.Router();
const Review = require('../src/models/Review');

// Get all reviews for a business
router.get('/:businessId', async (req, res) => {
  const reviews = await Review.find({ businessId: req.params.businessId }).sort({ createdAt: -1 });
  res.json(reviews);
});

// Post a reply to Google
router.post('/reply', async (req, res) => {
  const { reviewId, replyText } = req.body;
  // logic to call Google API goes here
  await Review.findByIdAndUpdate(reviewId, { reply: replyText, status: 'REPLIED' });
  res.json({ success: true });
});

module.exports = router;