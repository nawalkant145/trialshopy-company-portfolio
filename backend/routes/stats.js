import express from 'express';
import Stats from '../models/Stats.js';
import Application from '../models/Application.js';
import Contact from '../models/Contact.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/stats/increment-visitors:
 *   post:
 *     summary: Increment visitor count (Session guarded on client)
 *     tags: [Stats & Counters]
 *     responses:
 *       200:
 *         description: Visitor counter updated
 */
router.post('/increment-visitors', async (req, res) => {
  try {
    let stats = await Stats.findOne({ key: 'global' });
    if (!stats) {
      stats = new Stats({ key: 'global', visitorsCount: 1 });
    } else {
      stats.visitorsCount += 1;
    }
    await stats.save();
    res.status(200).json({ success: true, visitorsCount: stats.visitorsCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/stats/dashboard:
 *   get:
 *     summary: Retrieve aggregate counts for the Admin Dashboard (Admin Only)
 *     tags: [Stats & Counters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Object containing dashboard metrics
 */
router.get('/dashboard', protect, async (req, res) => {
  try {
    const stats = await Stats.findOne({ key: 'global' });
    const visitors = stats ? stats.visitorsCount : 0;
    
    const totalApplications = await Application.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        visitorsCount: visitors,
        applicationsCount: totalApplications,
        contactsCount: totalContacts,
        productsCount: totalProducts
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
