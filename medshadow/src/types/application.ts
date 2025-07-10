import { Document, Types } from 'mongoose';

export interface Application extends Document {
  _id: Types.ObjectId;
  student: Types.ObjectId;
  opportunity: Types.ObjectId;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected' | 'onboarding';
  coverLetter?: string;
  resume?: string;
  notes?: string;
  nextSteps?: {
    type: 'document' | 'form' | 'task' | 'meeting';
    title: string;
    description: string;
    deadline?: string;
    completed?: boolean;
  }[];
  notifications?: {
    _id: Types.ObjectId;
    message: string;
    date: string;
    read: boolean;
    type: 'info' | 'success' | 'warning' | 'error';
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
export const applicationSchema = {
  _id: { type: Types.ObjectId, auto: true },
  student: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  opportunity: {
    type: Types.ObjectId,
    ref: 'Opportunity',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'accepted', 'rejected', 'onboarding'],
    default: 'pending'
  },
  coverLetter: {
    type: String,
    required: false
  },
  resume: {
    type: String,
    required: false
  },
  notes: {
    type: String,
    required: false
  },
  nextSteps: [{
    type: {
      type: String,
      enum: ['document', 'form', 'task', 'meeting'],
      required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: String },
    completed: { type: Boolean, default: false }
  }],
  notifications: [{
    _id: { type: Types.ObjectId, auto: true },
    message: { type: String, required: true },
    date: { type: String, required: true },
    read: { type: Boolean, default: false },
    type: {
      type: String,
      enum: ['info', 'success', 'warning', 'error'],
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}; 