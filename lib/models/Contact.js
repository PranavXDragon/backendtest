import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Please provide a valid email'
      ]
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      minlength: [5, 'Message must be at least 5 characters'],
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: true,
    collection: 'contacts'
  }
);

contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });

export default mongoose.models.Contact || mongoose.model('Contact', contactSchema);
