import mongoose, { Schema } from 'mongoose';
import { StudentProfile, FacilityProfile, studentProfileSchema, facilityProfileSchema } from '../types/profile';

// Create schemas with indexes
const studentSchema = new Schema<StudentProfile>(studentProfileSchema);
studentSchema.index({ userId: 1 });
studentSchema.index({ 'preferredLocations.coordinates': '2dsphere' });
studentSchema.index({ specialties: 1 });

const facilitySchema = new Schema<FacilityProfile>(facilityProfileSchema);
facilitySchema.index({ userId: 1 });
facilitySchema.index({ 'location.coordinates': '2dsphere' });
facilitySchema.index({ specialties: 1 });
facilitySchema.index({ facilityType: 1 });

// Create models
export const StudentProfileModel = mongoose.model<StudentProfile>('StudentProfile', studentSchema);
export const FacilityProfileModel = mongoose.model<FacilityProfile>('FacilityProfile', facilitySchema); 