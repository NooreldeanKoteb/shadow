import mongoose, { Document, Schema } from 'mongoose';

export interface IOpportunity extends Document {
  title: string;
  description: string;
  type: 'shadowing' | 'rotation' | 'volunteering' | 'internship';
  specialty: string;
  duration: string;
  schedule: string;
  requirements: string[];
  isPaid: boolean;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  facility: mongoose.Types.ObjectId;
  status: 'active' | 'closed' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const opportunitySchema = new Schema<IOpportunity>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  type: {
    type: String,
    required: [true, 'Opportunity type is required'],
    enum: ['shadowing', 'rotation', 'volunteering', 'internship'],
  },
  specialty: {
    type: String,
    required: [true, 'Specialty is required'],
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
  },
  schedule: {
    type: String,
    required: [true, 'Schedule is required'],
  },
  requirements: [{
    type: String,
  }],
  isPaid: {
    type: Boolean,
    default: false,
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  facility: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active',
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

// Update the updatedAt timestamp before saving
opportunitySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Opportunity = mongoose.models.Opportunity || mongoose.model<IOpportunity>('Opportunity', opportunitySchema); 