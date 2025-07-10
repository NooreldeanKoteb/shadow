import mongoose, { Schema } from 'mongoose';
import { Review, reviewSchema } from '../types/review';

// Create schema with indexes
const schema = new Schema<Review>(reviewSchema);
schema.index({ reviewer: 1 });
schema.index({ reviewee: 1 });
schema.index({ type: 1 });
schema.index({ rating: 1 });
schema.index({ verified: 1 });
schema.index({ createdAt: 1 });

// Create model
export const ReviewModel = mongoose.model<Review>('Review', schema); 