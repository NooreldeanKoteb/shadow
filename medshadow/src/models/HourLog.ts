import mongoose from 'mongoose';

const hourLogSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile',
    required: true,
  },
  facilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FacilityProfile',
    required: true,
  },
  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true,
  },
  supervisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  totalHours: {
    type: Number,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  activities: [{
    type: String,
    required: true,
  }],
  notes: {
    type: String,
    maxLength: 1000,
  },
  verificationStatus: {
    type: String,
    enum: ['PENDING', 'VERIFIED', 'REJECTED'],
    default: 'PENDING',
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  verifiedAt: {
    type: Date,
  },
  verificationNotes: {
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

// Create compound index for efficient querying
hourLogSchema.index({ studentId: 1, date: -1 });
hourLogSchema.index({ facilityId: 1, date: -1 });
hourLogSchema.index({ supervisorId: 1, date: -1 });

// Update the updatedAt timestamp before saving
hourLogSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.HourLog || mongoose.model('HourLog', hourLogSchema); 