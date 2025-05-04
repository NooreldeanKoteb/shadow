export enum UserRole {
  STUDENT = 'student',
  FACILITY = 'facility'
}

export interface IUserBase {
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  education?: {
    school: string;
    major: string;
    graduationYear: number;
    gpa: number;
  };
  skills?: string[];
  interests?: string[];
  facilityInfo?: {
    type: 'hospital' | 'clinic' | 'private practice' | 'other';
    specialties: string[];
    location: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    contact: {
      phone: string;
      website: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
} 