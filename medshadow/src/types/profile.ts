import { Document, Types } from 'mongoose';

export interface BaseProfile extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  skills: string[];
  interests: string[];
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentProfile extends BaseProfile {
  educationLevel: 'HIGH_SCHOOL' | 'UNDERGRADUATE' | 'GRADUATE' | 'POSTGRADUATE';
  institution: string;
  graduationYear: number;
  resumeUrl?: string;
  totalHours: number;
  verifiedHours: number;
  subscriptionStatus: 'FREE' | 'PREMIUM' | 'EXPIRED';
  subscriptionExpiry?: Date;
  preferredLocations: {
    type: 'Point';
    coordinates: [number, number];
    radius: number;
  }[];
  specialties: string[];
  availability: {
    weekdays: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY')[];
    preferredHours: {
      start: string;
      end: string;
    };
  };
}

export interface FacilityProfile extends BaseProfile {
  facilityName: string;
  facilityType: 'HOSPITAL' | 'CLINIC' | 'PRIVATE_PRACTICE' | 'RESEARCH_CENTER' | 'OTHER';
  specialties: string[];
  description: string;
  website?: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verificationDocuments: {
    type: string;
    url: string;
    uploadedAt: Date;
  }[];
  operatingHours: {
    [key: string]: { open: string; close: string };
  };
  amenities: string[];
  parkingAvailable: boolean;
  accessibilityInfo?: string;
}

// Mongoose schemas
export const baseProfileSchema = {
  _id: { type: Types.ObjectId, auto: true },
  userId: { type: Types.ObjectId, required: true, ref: 'User' },
  skills: [{ type: String }],
  interests: [{ type: String }],
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

export const studentProfileSchema = {
  ...baseProfileSchema,
  educationLevel: {
    type: String,
    enum: ['HIGH_SCHOOL', 'UNDERGRADUATE', 'GRADUATE', 'POSTGRADUATE'] as const,
    required: true
  },
  institution: { type: String, required: true },
  graduationYear: { type: Number, required: true },
  resumeUrl: { type: String },
  totalHours: { type: Number, default: 0 },
  verifiedHours: { type: Number, default: 0 },
  subscriptionStatus: {
    type: String,
    enum: ['FREE', 'PREMIUM', 'EXPIRED'] as const,
    default: 'FREE' as const
  },
  subscriptionExpiry: { type: Date },
  preferredLocations: [{
    type: {
      type: String,
      enum: ['Point'] as const,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    radius: {
      type: Number,
      default: 50
    }
  }],
  specialties: [{ type: String }],
  availability: {
    weekdays: [{
      type: String,
      enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] as const
    }],
    preferredHours: {
      start: String,
      end: String
    }
  }
};

export const facilityProfileSchema = {
  ...baseProfileSchema,
  facilityName: { type: String, required: true },
  facilityType: {
    type: String,
    enum: ['HOSPITAL', 'CLINIC', 'PRIVATE_PRACTICE', 'RESEARCH_CENTER', 'OTHER'] as const,
    required: true
  },
  specialties: [{ type: String, required: true }],
  description: { type: String, maxLength: 2000 },
  website: { type: String },
  phone: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'USA' }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'] as const,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  verificationStatus: {
    type: String,
    enum: ['PENDING', 'VERIFIED', 'REJECTED'] as const,
    default: 'PENDING' as const
  },
  verificationDocuments: [{
    type: String,
    url: String,
    uploadedAt: Date
  }],
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  amenities: [{ type: String }],
  parkingAvailable: { type: Boolean, default: false },
  accessibilityInfo: { type: String }
}; 