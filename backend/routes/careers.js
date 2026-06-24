import express from 'express';
import Career from '../models/Career.js';
import Application from '../models/Application.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

/**
 * @swagger
 * /api/careers:
 *   get:
 *     summary: Retrieve all job openings
 *     tags: [Careers]
 *     responses:
 *       200:
 *         description: A list of open career positions
 *   post:
 *     summary: Create a new job opening (Admin Only)
 *     tags: [Careers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - department
 *               - location
 *               - description
 *               - requirements
 *             properties:
 *               title:
 *                 type: string
 *               department:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Career opening created successfully
 */

// Get all open career positions
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: careers.length, data: careers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create career position (Admin)
router.post('/', protect, async (req, res) => {
  try {
    const { title, department, location, description, requirements } = req.body;
    if (!title || !department || !location || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const career = new Career({ title, department, location, description, requirements });
    await career.save();
    res.status(201).json({ success: true, data: career });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/careers/{id}:
 *   put:
 *     summary: Update an existing career opening (Admin Only)
 *     tags: [Careers]
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
 *         description: Career opening updated successfully
 *   delete:
 *     summary: Delete a career opening (Admin Only)
 *     tags: [Careers]
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
 *         description: Career opening deleted successfully
 */

// Update career position (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!career) {
      return res.status(404).json({ success: false, message: 'Career position not found' });
    }
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete career position (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: 'Career position not found' });
    }
    res.status(200).json({ success: true, message: 'Career position deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/careers/apply:
 *   post:
 *     summary: Submit a job application with resume file upload
 *     tags: [Careers]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - careerId
 *               - resume
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               careerId:
 *                 type: string
 *               resume:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Application submitted successfully
 */

// Submit job application (Public - with file upload)
router.post('/apply', (req, res) => {
  upload.single('resume')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    try {
      const { name, email, careerId } = req.body;
      if (!name || !email || !careerId) {
        return res.status(400).json({ success: false, message: 'All text fields are required' });
      }

      if (!req.file) {
        return res.status(400).json({ success: false, message: 'Resume file is required' });
      }

      const application = new Application({
        name,
        email,
        careerId,
        resumePath: req.file.path.replace(/\\/g, '/') // Ensure standard forward slashes
      });
      await application.save();

      res.status(201).json({ success: true, data: application });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
});

/**
 * @swagger
 * /api/careers/applications:
 *   get:
 *     summary: Retrieve all submitted job applications (Admin Only)
 *     tags: [Careers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of job applications
 */

// Get all applications (Admin)
router.get('/applications', protect, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('careerId', 'title department location')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
