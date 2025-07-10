import { Document } from 'mongoose';

export interface Review extends Document {
  _id: string;
  reviewer: string;
  reviewee: string;
  type: 'student' | 'facility';
  rating: number;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  reported: boolean;
  reportReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
export const reviewSchema = {
  reviewer: {
    type: String,
    ref: 'User',
    required: true
  },
  reviewee: {
    type: String,
    refPath: 'type',
    required: true
  },
  type: {
    type: String,
    enum: ['student', 'facility'],
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  helpful: {
    type: Number,
    default: 0
  },
  reported: {
    type: Boolean,
    default: false
  },
  reportReason: {
    type: String
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