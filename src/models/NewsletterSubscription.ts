import mongoose from 'mongoose';

const newsletterSubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscriptionDate: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const NewsletterSubscription = mongoose.models.NewsletterSubscription || 
  mongoose.model('NewsletterSubscription', newsletterSubscriptionSchema);

export default NewsletterSubscription; 