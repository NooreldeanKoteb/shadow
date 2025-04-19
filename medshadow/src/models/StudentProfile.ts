import mongoose from 'mongoose';
import { UserRole } from './User';

const studentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  educationLevel: {
    type: String,
    enum: ['HIGH_SCHOOL', 'UNDERGRADUATE', 'GRADUATE', 'POSTGRADUATE'],
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  interests: [{
    type: String,
  }],
  skills: [{
    type: String,
  }],
  bio: {
    type: String,
    maxLength: 1000,
  },
  resumeUrl: {
    type: String,
  },
  totalHours: {
    type: Number,
    default: 0,
  },
  verifiedHours: {
    type: Number,
    default: 0,
  },
  subscriptionStatus: {
    type: String,
    enum: ['FREE', 'PREMIUM', 'EXPIRED'],
    default: 'FREE',
  },
  subscriptionExpiry: {
    type: Date,
  },
  preferredLocations: [{
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    radius: {
      type: Number,
      default: 50, // Default 50 miles radius
    },
  }],
  specialties: [{
    type: String,
  }],
  availability: {
    weekdays: [{
      type: String,
      enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
    }],
    preferredHours: {
      start: String,
      end: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes for location-based queries
studentProfileSchema.index({ 'preferredLocations.coordinates': '2dsphere' });

// Update the updatedAt timestamp before saving
studentProfileSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.StudentProfile || mongoose.model('StudentProfile', studentProfileSchema); 