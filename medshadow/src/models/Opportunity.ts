import mongoose, { Schema } from 'mongoose';
import { Opportunity, opportunitySchema } from '../types/opportunity';

// Create schema with indexes
const schema = new Schema<Opportunity>(opportunitySchema);
schema.index({ facility: 1 });
schema.index({ 'location.coordinates': '2dsphere' });
schema.index({ type: 1 });
schema.index({ specialties: 1 });
schema.index({ status: 1 });
schema.index({ 'duration.startDate': 1 });
schema.index({ 'duration.endDate': 1 });

// Create model
export const OpportunityModel = mongoose.model<Opportunity>('Opportunity', schema); 