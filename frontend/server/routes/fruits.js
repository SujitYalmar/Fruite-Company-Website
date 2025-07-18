const express = require('express');
const Fruit = require('../models/Fruit');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all fruits with filters
router.get('/', async (req, res) => {
  try {
    const filters = {
      type: req.query.type,
      location: req.query.location,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      status: req.query.status || 'available',
      search: req.query.search
    };

    const fruits = await Fruit.getAll(filters);
    res.json(fruits);
  } catch (error) {
    console.error('Error fetching fruits:', error);
    res.status(500).json({ error: 'Failed to fetch fruits' });
  }
});

// Get fruit by ID
router.get('/:id', async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    if (!fruit) {
      return res.status(404).json({ error: 'Fruit not found' });
    }
    res.json(fruit);
  } catch (error) {
    console.error('Error fetching fruit:', error);
    res.status(500).json({ error: 'Failed to fetch fruit' });
  }
});

// Create new fruit listing (farmers only)
router.post('/', authenticateToken, requireRole(['farmer']), async (req, res) => {
  try {
    const fruitData = {
      ...req.body,
      farmer_id: req.user.id,
      farmer_name: req.user.name
    };

    const fruitId = await Fruit.create(fruitData);
    const fruit = await Fruit.findById(fruitId);
    
    res.status(201).json({
      message: 'Fruit listing created successfully',
      fruit
    });
  } catch (error) {
    console.error('Error creating fruit:', error);
    res.status(500).json({ error: 'Failed to create fruit listing' });
  }
});

// Update fruit listing (farmers only, own listings)
router.put('/:id', authenticateToken, requireRole(['farmer']), async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    if (!fruit) {
      return res.status(404).json({ error: 'Fruit not found' });
    }

    if (fruit.farmer_id !== req.user.id) {
      return res.status(403).json({ error: 'You can only update your own listings' });
    }

    const updated = await Fruit.update(req.params.id, req.body);
    if (!updated) {
      return res.status(400).json({ error: 'Failed to update fruit listing' });
    }

    const updatedFruit = await Fruit.findById(req.params.id);
    res.json({
      message: 'Fruit listing updated successfully',
      fruit: updatedFruit
    });
  } catch (error) {
    console.error('Error updating fruit:', error);
    res.status(500).json({ error: 'Failed to update fruit listing' });
  }
});

// Delete fruit listing (farmers only, own listings)
router.delete('/:id', authenticateToken, requireRole(['farmer']), async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    if (!fruit) {
      return res.status(404).json({ error: 'Fruit not found' });
    }

    if (fruit.farmer_id !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own listings' });
    }

    const deleted = await Fruit.delete(req.params.id);
    if (!deleted) {
      return res.status(400).json({ error: 'Failed to delete fruit listing' });
    }

    res.json({ message: 'Fruit listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting fruit:', error);
    res.status(500).json({ error: 'Failed to delete fruit listing' });
  }
});

// Get farmer's fruits
router.get('/farmer/my-listings', authenticateToken, requireRole(['farmer']), async (req, res) => {
  try {
    const fruits = await Fruit.findByFarmerId(req.user.id);
    res.json(fruits);
  } catch (error) {
    console.error('Error fetching farmer fruits:', error);
    res.status(500).json({ error: 'Failed to fetch your fruit listings' });
  }
});

// Get fruit statistics
router.get('/stats/overview', authenticateToken, async (req, res) => {
  try {
    const farmerId = req.user.role === 'farmer' ? req.user.id : null;
    const stats = await Fruit.getStats(farmerId);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;