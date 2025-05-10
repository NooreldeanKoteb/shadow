import { Schema, model, models } from 'mongoose';
import { IUserBase, UserRole } from '@/types/user';
import bcrypt from 'bcryptjs';

export interface IUser extends IUserBase {
  password: string;
  emailVerified: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), required: true },
  emailVerified: { type: Boolean, default: false },
  education: {
    school: String,
    major: String,
    graduationYear: Number,
    gpa: Number
  },
  skills: [String],
  interests: [String],
  facilityInfo: {
    type: { type: String, enum: ['hospital', 'clinic', 'private practice', 'other'] },
    specialties: [String],
    location: {
      address: String,
      city: String,
      state: String,
      zipCode: String,
      coordinates: {
        lat: Number,
        lng: Number
      }
    },
    contact: {
      phone: String,
      website: String
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

export const User = models.User || model<IUser>('User', userSchema);
export { UserRole }; 