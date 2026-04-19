import { connectDB } from '../../../lib/mongodb';
import Contact from '../../../lib/models/Contact';

export default async function handler(req, res) {
  const { id } = req.query;

  await connectDB();

  if (req.method === 'GET') {
    return handleGet(id, res);
  } else if (req.method === 'PUT') {
    return handlePut(id, req, res);
  } else if (req.method === 'DELETE') {
    return handleDelete(id, res);
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

async function handleGet(id, res) {
  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contact', error: error.message });
  }
}

async function handlePut(id, req, res) {
  try {
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const contact = await Contact.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.json({
      success: true,
      message: '✅ Contact updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating contact', error: error.message });
  }
}

async function handleDelete(id, res) {
  try {
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.json({ success: true, message: '✅ Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting contact', error: error.message });
  }
}
