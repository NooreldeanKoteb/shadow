import { Document, Types } from 'mongoose';
import { Location } from './location';

export interface Opportunity extends Document {
  _id: Types.ObjectId;
  facility: Types.ObjectId;
  title: string;
  description: string;
  type: 'shadowing' | 'rotation' | 'volunteering' | 'paid';
  specialties: string[];
  location: Location;
  duration: {
    startDate: string;
    endDate?: string;
    hoursPerWeek?: number;
    totalHours?: number;
  };
  requirements: {
    educationLevel?: string[];
    skills?: string[];
    certifications?: string[];
    minimumAge?: number;
    other?: string;
  };
  compensation?: {
    type: 'unpaid' | 'stipend' | 'salary';
    amount?: number;
    frequency?: 'hourly' | 'weekly' | 'monthly';
    benefits?: string[];
  };
  schedule: {
    days: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
    startTime: string;
    endTime: string;
    flexible?: boolean;
  };
  applicationDeadline?: string;
  spotsAvailable?: number;
  status: 'open' | 'closed' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
export const opportunitySchema = {
  _id: { type: Types.ObjectId, auto: true },
  facility: {
    type: Types.ObjectId,
    ref: 'FacilityProfile',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['shadowing', 'rotation', 'volunteering', 'paid'],
    required: true
  },
  specialties: [{
    type: String,
    required: true
  }],
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  duration: {
    startDate: { type: String, required: true },
    endDate: { type: String },
    hoursPerWeek: { type: Number },
    totalHours: { type: Number }
  },
  requirements: {
    educationLevel: [String],
    skills: [String],
    certifications: [String],
    minimumAge: { type: Number },
    other: { type: String }
  },
  compensation: {
    type: {
      type: String,
      enum: ['unpaid', 'stipend', 'salary']
    },
    amount: { type: Number },
    frequency: {
      type: String,
      enum: ['hourly', 'weekly', 'monthly']
    },
    benefits: [String]
  },
  schedule: {
    days: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      required: true
    }],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    flexible: { type: Boolean, default: false }
  },
  applicationDeadline: { type: String },
  spotsAvailable: { type: Number },
  status: {
    type: String,
    enum: ['open', 'closed', 'draft'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}; 