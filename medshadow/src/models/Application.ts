import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  student: mongoose.Types.ObjectId;
  opportunity: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  coverLetter?: string;
  resume?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  opportunity: {
    type: Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
applicationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Application = mongoose.models.Application || mongoose.model<IApplication>('Application', applicationSchema); 