// MongoDB Database Schema for MedShadow

// User Model (Base for both Students and Facilities)
const UserSchema = {
  _id: ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed
  userType: { type: String, enum: ['student', 'facility', 'professional', 'admin'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date }
};

// Student Profile Model
const StudentProfileSchema = {
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicture: { type: String }, // URL to uploaded image
  educationLevel: { type: String, enum: ['high_school', 'undergraduate', 'graduate'] },
  school: { type: String },
  graduationYear: { type: Number },
  bio: { type: String },
  interests: [{ type: String }], // Array of medical specialties of interest
  location: {
    address: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    coordinates: {
      type: { type: String, default: 'Point' },
      coordinates: [Number] // [longitude, latitude]
    }
  },
  skills: [{ type: String }],
  documents: [{ // Resumes, certifications, etc.
    name: { type: String },
    fileUrl: { type: String },
    uploadDate: { type: Date, default: Date.now }
  }],
  // Subscription related fields
  subscription: {
    status: { type: String, enum: ['active', 'inactive', 'trial', 'expired'], default: 'inactive' },
    plan: { type: String, enum: ['basic', 'premium', 'none'], default: 'none' },
    startDate: { type: Date },
    endDate: { type: Date },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String }
  },
  savedOpportunities: [{ type: ObjectId, ref: 'Opportunity' }]
};

// Facility Profile Model
const FacilityProfileSchema = {
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  logo: { type: String }, // URL to uploaded logo
  facilityType: { type: String, enum: ['hospital', 'clinic', 'private_practice', 'research', 'other'] },
  specialties: [{ type: String }], // Array of medical specialties
  description: { type: String },
  website: { type: String },
  phone: { type: String },
  email: { type: String },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    coordinates: {
      type: { type: String, default: 'Point' },
      coordinates: [Number] // [longitude, latitude]
    }
  },
  verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  verificationDocument: { 
    documentUrl: { type: String },
    uploadDate: { type: Date }
  },
  contactPersons: [{
    name: { type: String },
    position: { type: String },
    email: { type: String },
    phone: { type: String }
  }]
};

// Professional Profile Model
const ProfessionalProfileSchema = {
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', required: true },
  facilityId: { type: ObjectId, ref: 'FacilityProfile', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  title: { type: String, required: true }, // e.g., "Cardiologist", "Nurse Practitioner"
  department: { type: String },
  specialties: [{ type: String }],
  licenseNumber: { type: String },
  npiNumber: { type: String }, // National Provider Identifier
  bio: { type: String },
  education: [{
    institution: { type: String },
    degree: { type: String },
    field: { type: String },
    year: { type: Number }
  }],
  profilePicture: { type: String }, // URL to uploaded image
  email: { type: String },
  phone: { type: String },
  isActive: { type: Boolean, default: true },
  canVerifyHours: { type: Boolean, default: false }, // Whether this professional can verify student hours
  canPostOpportunities: { type: Boolean, default: false }, // Whether this professional can post opportunities
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

// Opportunity Model
const OpportunitySchema = {
  _id: ObjectId,
  facilityId: { type: ObjectId, ref: 'FacilityProfile', required: true },
  professionalId: { type: ObjectId, ref: 'ProfessionalProfile' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  specialtyArea: { type: String, required: true },
  opportunityType: { type: String, enum: ['shadowing', 'rotation', 'volunteering', 'internship'], required: true },
  isPaid: { type: Boolean, default: false },
  compensation: { type: String }, // Description of compensation if paid
  startDate: { type: Date },
  endDate: { type: Date },
  schedule: {
    daysOfWeek: [{ type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] }],
    startTime: { type: String }, // Format: "HH:MM"
    endTime: { type: String }, // Format: "HH:MM"
    totalHours: { type: Number },
    isFlexible: { type: Boolean, default: false }
  },
  requirements: {
    educationLevel: { type: String, enum: ['high_school', 'undergraduate', 'graduate', 'any'] },
    minimumAge: { type: Number },
    skills: [{ type: String }],
    documents: [{ type: String }], // Required documents like background check, vaccinations
    other: { type: String }
  },
  location: {
    address: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    coordinates: {
      type: { type: String, default: 'Point' },
      coordinates: [Number] // [longitude, latitude]
    },
    sameAsFacility: { type: Boolean, default: true }
  },
  applicationProcess: {
    deadline: { type: Date },
    instructions: { type: String },
    externalUrl: { type: String } // If application is handled outside the platform
  },
  status: { type: String, enum: ['draft', 'published', 'filled', 'closed'], default: 'published' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  spots: { type: Number, default: 1 }, // Number of available positions
  spotsFilled: { type: Number, default: 0 }
};

// Application Model
const ApplicationSchema = {
  _id: ObjectId,
  opportunityId: { type: ObjectId, ref: 'Opportunity', required: true },
  studentId: { type: ObjectId, ref: 'StudentProfile', required: true },
  status: { type: String, enum: ['pending', 'reviewing', 'accepted', 'rejected', 'withdrawn'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now },
  documents: [{
    name: { type: String },
    fileUrl: { type: String },
    uploadDate: { type: Date, default: Date.now }
  }],
  coverLetter: { type: String },
  notes: { type: String }, // Student's notes to the facility
  facilityNotes: { type: String }, // Private notes from the facility
  lastUpdated: { type: Date, default: Date.now }
};

// Hour Log Model
const HourLogSchema = {
  _id: ObjectId,
  studentId: { type: ObjectId, ref: 'StudentProfile', required: true },
  opportunityId: { type: ObjectId, ref: 'Opportunity', required: true },
  facilityId: { type: ObjectId, ref: 'FacilityProfile', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // Format: "HH:MM"
  endTime: { type: String, required: true }, // Format: "HH:MM"
  totalHours: { type: Number, required: true },
  activities: { type: String },
  specialty: { type: String },
  supervisorName: { type: String, required: true },
  supervisorTitle: { type: String },
  supervisorEmail: { type: String },
  verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  verifiedAt: { type: Date },
  verifiedBy: { type: ObjectId, ref: 'User' }, // Can be facility admin or professional
  verifyingProfessionalId: { type: ObjectId, ref: 'ProfessionalProfile' }, // Specific professional who verified
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

// Message Model (for communication between students and facilities)
const MessageSchema = {
  _id: ObjectId,
  conversationId: { type: ObjectId, ref: 'Conversation', required: true },
  senderId: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  attachments: [{
    name: { type: String },
    fileUrl: { type: String },
    uploadDate: { type: Date, default: Date.now }
  }],
  readBy: [{ type: ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
};

// Conversation Model
const ConversationSchema = {
  _id: ObjectId,
  participants: [{ type: ObjectId, ref: 'User', required: true }],
  subject: { type: String },
  applicationId: { type: ObjectId, ref: 'Application' }, // If conversation is related to an application
  opportunityId: { type: ObjectId, ref: 'Opportunity' }, // If conversation is related to an opportunity
  lastMessageAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
};

// Subscription Plan Model
const SubscriptionPlanSchema = {
  _id: ObjectId,
  name: { type: String, required: true }, // e.g., "Basic", "Premium"
  description: { type: String },
  price: { type: Number, required: true }, // Monthly price in cents
  features: [{ type: String }], // List of features included
  stripeProductId: { type: String },
  stripePriceId: { type: String },
  isActive: { type: Boolean, default: true }
};

// Indexes for efficient queries
// User indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ userType: 1 });

//indexes for professional profiles
db.professionalProfiles.createIndex({ userId: 1 }, { unique: true });
db.professionalProfiles.createIndex({ facilityId: 1 });
db.professionalProfiles.createIndex({ specialties: 1 });
db.professionalProfiles.createIndex({ "lastName": 1, "firstName": 1 });

// Location-based indexes
db.studentProfiles.createIndex({ "location.coordinates": "2dsphere" });
db.facilityProfiles.createIndex({ "location.coordinates": "2dsphere" });
db.opportunities.createIndex({ "location.coordinates": "2dsphere" });

// Opportunity search indexes
db.opportunities.createIndex({ facilityId: 1 });
db.opportunities.createIndex({ specialtyArea: 1 });
db.opportunities.createIndex({ opportunityType: 1 });
db.opportunities.createIndex({ isPaid: 1 });
db.opportunities.createIndex({ status: 1 });
db.opportunities.createIndex({ "location.city": 1, "location.state": 1 });

// Application indexes
db.applications.createIndex({ opportunityId: 1 });
db.applications.createIndex({ studentId: 1 });
db.applications.createIndex({ status: 1 });

// Hour log indexes
db.hourLogs.createIndex({ studentId: 1 });
db.hourLogs.createIndex({ facilityId: 1 });
db.hourLogs.createIndex({ opportunityId: 1 });
db.hourLogs.createIndex({ verificationStatus: 1 });
db.hourLogs.createIndex({ date: 1 });

// Message and conversation indexes
db.conversations.createIndex({ participants: 1 });
db.conversations.createIndex({ applicationId: 1 });
db.conversations.createIndex({ opportunityId: 1 });
db.messages.createIndex({ conversationId: 1 });
db.messages.createIndex({ senderId: 1 });
db.messages.createIndex({ createdAt: 1 });

