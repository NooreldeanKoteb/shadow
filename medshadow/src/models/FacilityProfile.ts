import mongoose from 'mongoose';

const facilityProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  facilityName: {
    type: String,
    required: true,
  },
  facilityType: {
    type: String,
    enum: ['HOSPITAL', 'CLINIC', 'PRIVATE_PRACTICE', 'RESEARCH_CENTER', 'OTHER'],
    required: true,
  },
  specialties: [{
    type: String,
    required: true,
  }],
  description: {
    type: String,
    maxLength: 2000,
  },
  website: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'USA',
    },
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  verificationStatus: {
    type: String,
    enum: ['PENDING', 'VERIFIED', 'REJECTED'],
    default: 'PENDING',
  },
  verificationDocuments: [{
    type: String,
    url: String,
    uploadedAt: Date,
  }],
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },
  amenities: [{
    type: String,
  }],
  parkingAvailable: {
    type: Boolean,
    default: false,
  },
  accessibilityInfo: {
    type: String,
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
facilityProfileSchema.index({ location: '2dsphere' });

// Update the updatedAt timestamp before saving
facilityProfileSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.FacilityProfile || mongoose.model('FacilityProfile', facilityProfileSchema); 