const express = require('express');
const router = express.Router();
const { getTopFAQs,createFAQ } = require('../controllers/faqController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware=require('../controllers/authControllers')

router.get('/get',authMiddleware, getTopFAQs);
router.post('/add',authMiddleware,adminMiddleware,createFAQ);

module.exports = router;