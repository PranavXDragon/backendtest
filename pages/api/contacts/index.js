import { connectDB } from '../../lib/mongodb';
import Contact from '../../lib/models/Contact';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    return handlePost(req, res);
  } else if (req.method === 'GET') {
    return handleGet(req, res);
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

async function handlePost(req, res) {
  try {
    const { name, email, message } = req.body;

    // Validation
    const errors = [];
    if (!name || name.length < 2 || name.length > 100) {
      errors.push({ field: 'name', message: 'Name must be between 2 and 100 characters' });
    }
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.push({ field: 'email', message: 'Please provide a valid email' });
    }
    if (!message || message.length < 5 || message.length > 1000) {
      errors.push({ field: 'message', message: 'Message must be between 5 and 1000 characters' });
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: '✅ Contact submitted successfully!',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      message: '❌ Error submitting contact',
      error: error.message
    });
  }
}

async function handleGet(req, res) {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
}
