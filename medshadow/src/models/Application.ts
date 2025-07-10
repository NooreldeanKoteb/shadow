import mongoose, { Schema } from 'mongoose';
import { Application, applicationSchema } from '../types/application';

// Create schema with indexes
const schema = new Schema<Application>(applicationSchema);
schema.index({ student: 1 });
schema.index({ opportunity: 1 });
schema.index({ status: 1 });
schema.index({ createdAt: 1 });

// Create model
export const ApplicationModel = mongoose.model<Application>('Application', schema); 