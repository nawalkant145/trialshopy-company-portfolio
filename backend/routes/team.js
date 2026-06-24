import express from 'express';
import TeamMember from '../models/TeamMember.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: Retrieve all team members
 *     tags: [Team Members]
 *     responses:
 *       200:
 *         description: A list of team members
 *   post:
 *     summary: Create a new team member (Admin Only)
 *     tags: [Team Members]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *               - category
 *               - bio
 *               - imageUrl
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [founder, core, advisor]
 *               bio:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Team member created successfully
 */

// Get all team members
router.get('/', async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, count: team.length, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create team member (Admin)
router.post('/', protect, async (req, res) => {
  try {
    const { name, role, category, bio, imageUrl } = req.body;
    if (!name || !role || !category || !bio || !imageUrl) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const teamMember = new TeamMember({ name, role, category, bio, imageUrl });
    await teamMember.save();
    res.status(201).json({ success: true, data: teamMember });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/team/{id}:
 *   put:
 *     summary: Update an existing team member (Admin Only)
 *     tags: [Team Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Team member updated successfully
 *   delete:
 *     summary: Delete a team member (Admin Only)
 *     tags: [Team Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team member deleted successfully
 */

// Update team member (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!teamMember) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.status(200).json({ success: true, data: teamMember });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete team member (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.status(200).json({ success: true, message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
