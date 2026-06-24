import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

let transporter = null;
const getTransporter = async () => {
  if (transporter) return transporter;
  try {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log(`✉️ Ethereal SMTP Mailer configured. User: ${testAccount.user}`);
    return transporter;
  } catch (error) {
    console.error('⚠️ Nodemailer Ethereal initialization failed:', error.message);
    return null;
  }
};

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Retrieve all contact form submissions (Admin Only)
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contact submissions
 *   post:
 *     summary: Submit a new contact form request
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact request submitted successfully
 */

// Get all contact submissions (Admin)
router.get('/', protect, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Submit contact request (Public)
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all details' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    // Trigger Ethereal Nodemailer dispatch
    let emailPreviewUrl = null;
    const mailer = await getTransporter();
    if (mailer) {
      try {
        const info = await mailer.sendMail({
          from: `"${name}" <${email}>`,
          to: 'admin@trialshopy.com',
          subject: 'TrialShopy Contact Request Submission',
          text: message,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #f59e0b;">New Inquiry Received</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 10px;">
                ${message}
              </div>
            </div>
          `
        });
        emailPreviewUrl = nodemailer.getTestMessageUrl(info);
        console.log(`✉️ Email Preview URL: ${emailPreviewUrl}`);
      } catch (mailErr) {
        console.error('Nodemailer transmission failure:', mailErr.message);
      }
    }

    res.status(201).json({
      success: true,
      data: contact,
      emailPreviewUrl: emailPreviewUrl || 'Local console transport logged successfully.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Resolve contact message status (Admin Only)
 *     tags: [Contacts]
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
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Resolved]
 *     responses:
 *       200:
 *         description: Contact request updated successfully
 */

// Update contact status (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact record not found' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
