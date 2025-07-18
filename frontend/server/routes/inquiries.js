const express = require('express');
const Inquiry = require('../models/Inquiry');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Create new inquiry (buyers only)
router.post('/', authenticateToken, requireRole(['buyer']), async (req, res) => {
  try {
    const inquiryData = {
      ...req.body,
      buyer_id: req.user.id
    };

    const inquiryId = await Inquiry.create(inquiryData);
    
    res.status(201).json({
      message: 'Inquiry sent successfully',
      inquiryId
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ error: 'Failed to send inquiry' });
  }
});

// Get all inquiries (admin only)
router.get('/all', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const inquiries = await Inquiry.getAll();
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// Get farmer's inquiries
router.get('/farmer', authenticateToken, requireRole(['farmer']), async (req, res) => {
  try {
    const inquiries = await Inquiry.findByFarmerId(req.user.id);
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching farmer inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// Get buyer's inquiries
router.get('/buyer', authenticateToken, requireRole(['buyer']), async (req, res) => {
  try {
    const inquiries = await Inquiry.findByBuyerId(req.user.id);
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching buyer inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch your inquiries' });
  }
});

// Update inquiry status
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Inquiry.updateStatus(req.params.id, status);
    
    if (!updated) {
      return res.status(400).json({ error: 'Failed to update inquiry status' });
    }

    res.json({ message: 'Inquiry status updated successfully' });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    res.status(500).json({ error: 'Failed to update inquiry status' });
  }
});

module.exports = router;