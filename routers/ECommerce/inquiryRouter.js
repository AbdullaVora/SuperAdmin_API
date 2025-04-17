const express = require('express');
const { createInquiry, getInquiries, getInquiry, updateInquiryStatus } = require('../../controllers/ECommerce/inquiryController');

const router = express.Router();

// E-commerce inquiry endpoint
router.post('/e-commerce/inquiry', createInquiry);

// Admin routes (protected)
router.get('/inquiries', getInquiries);
router.get('/inquiries/:id', getInquiry);
router.patch('/inquiries/:id/status', updateInquiryStatus);

module.exports = router;