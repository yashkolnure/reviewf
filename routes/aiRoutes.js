const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.send('AI Route Active'));
module.exports = router;