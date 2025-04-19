/**
 * MedShadow API Endpoints
 * 
 * This document outlines the REST API endpoints for the MedShadow platform.
 * All endpoints are prefixed with /api/v1
 */

// ===== Authentication =====
/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user (student or facility)
 * @access  Public
 * @body    { email, password, userType, etc. }
 */

/**
 * @route   POST /api/v1/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 * @body    { email, password }
 */

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current user
 * @access  Private
 */

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 * @body    { email }
 */

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Reset password
 * @access  Public
 * @body    { token, password }
 */

// ===== Student Profiles =====
/**
 * @route   POST /api/v1/profiles/student
 * @desc    Create or update student profile
 * @access  Private (Student)
 * @body    { firstName, lastName, educationLevel, etc. }
 */

/**
 * @route   GET /api/v1/profiles/student/:id
 * @desc    Get student profile by ID
 * @access  Private
 */

/**
 * @route   GET /api/v1/profiles/student
 * @desc    Get current user's student profile
 * @access  Private (Student)
 */

/**
 * @route   PUT /api/v1/profiles/student/documents
 * @desc    Upload document to student profile
 * @access  Private (Student)
 * @body    FormData with file
 */

// ===== Professional Profiles =====
/**
 * @route   POST /api/v1/profiles/professional
 * @desc    Create or update professional profile
 * @access  Private (Professional or Facility Admin)
 * @body    { firstName, lastName, title, facilityId, etc. }
 */

/**
 * @route   GET /api/v1/profiles/professional/:id
 * @desc    Get professional profile by ID
 * @access  Private
 */

/**
 * @route   GET /api/v1/profiles/professional
 * @desc    Get current user's professional profile
 * @access  Private (Professional)
 */

/**
 * @route   GET /api/v1/profiles/professional/facility/:facilityId
 * @desc    Get all professionals for a facility
 * @access  Private (Facility Admin)
 */

/**
 * @route   PUT /api/v1/profiles/professional/:id/permissions
 * @desc    Update professional permissions (verify hours, post opportunities)
 * @access  Private (Facility Admin)
 * @body    { canVerifyHours, canPostOpportunities }
 */

/**
 * @route   DELETE /api/v1/profiles/professional/:id
 * @desc    Remove professional from facility
 * @access  Private (Facility Admin)
 */

// ===== Professional Invitations =====
/**
 * @route   POST /api/v1/invitations/professional
 * @desc    Invite professional to join facility
 * @access  Private (Facility Admin)
 * @body    { email, firstName, lastName, title }
 */

/**
 * @route   GET /api/v1/invitations/professional
 * @desc    Get all pending professional invitations for facility
 * @access  Private (Facility Admin)
 */

/**
 * @route   POST /api/v1/invitations/professional/accept/:token
 * @desc    Accept professional invitation
 * @access  Public (with valid token)
 * @body    { password, etc. }
 */

// Updated Hour Logs endpoints
/**
 * @route   PUT /api/v1/hours/:id/verify
 * @desc    Verify hour log (updated to include professionals)
 * @access  Private (Facility Admin or Professional with permission)
 * @body    { verificationStatus }
 */

// Additional Opportunities endpoints
/**
 * @route   GET /api/v1/opportunities/professional
 * @desc    Get opportunities posted by current professional
 * @access  Private (Professional)
 */

/**
 * @route   POST /api/v1/opportunities
 * @desc    Create new opportunity (updated to allow professionals)
 * @access  Private (Facility or Professional with permission)
 * @body    { title, description, specialtyArea, etc. }
 */

// ===== Facility Profiles =====
/**
 * @route   POST /api/v1/profiles/facility
 * @desc    Create or update facility profile
 * @access  Private (Facility)
 * @body    { name, facilityType, specialties, etc. }
 */

/**
 * @route   GET /api/v1/profiles/facility/:id
 * @desc    Get facility profile by ID
 * @access  Private
 */

/**
 * @route   GET /api/v1/profiles/facility
 * @desc    Get current user's facility profile
 * @access  Private (Facility)
 */

/**
 * @route   POST /api/v1/profiles/facility/verification
 * @desc    Upload verification document
 * @access  Private (Facility)
 * @body    FormData with file
 */

// ===== Opportunities =====
/**
 * @route   POST /api/v1/opportunities
 * @desc    Create new opportunity
 * @access  Private (Facility)
 * @body    { title, description, specialtyArea, etc. }
 */

/**
 * @route   GET /api/v1/opportunities
 * @desc    Get all opportunities with filters
 * @access  Private
 * @query   { specialtyArea, isPaid, city, etc. }
 */

/**
 * @route   GET /api/v1/opportunities/nearby
 * @desc    Get opportunities near a location
 * @access  Private
 * @query   { lat, lng, radius, specialtyArea, etc. }
 */

/**
 * @route   GET /api/v1/opportunities/:id
 * @desc    Get opportunity by ID
 * @access  Private
 */

/**
 * @route   PUT /api/v1/opportunities/:id
 * @desc    Update opportunity
 * @access  Private (Facility owner)
 * @body    { title, description, specialtyArea, etc. }
 */

/**
 * @route   DELETE /api/v1/opportunities/:id
 * @desc    Delete opportunity
 * @access  Private (Facility owner)
 */

/**
 * @route   GET /api/v1/opportunities/facility/:facilityId
 * @desc    Get opportunities by facility
 * @access  Private
 */

/**
 * @route   POST /api/v1/opportunities/:id/save
 * @desc    Save opportunity to student's saved list
 * @access  Private (Student)
 */

/**
 * @route   DELETE /api/v1/opportunities/:id/save
 * @desc    Remove opportunity from student's saved list
 * @access  Private (Student)
 */

// ===== Applications =====
/**
 * @route   POST /api/v1/applications
 * @desc    Submit application to opportunity
 * @access  Private (Student)
 * @body    { opportunityId, coverLetter, etc. }
 */

/**
 * @route   GET /api/v1/applications/student
 * @desc    Get all applications by current student
 * @access  Private (Student)
 */

/**
 * @route   GET /api/v1/applications/opportunity/:opportunityId
 * @desc    Get all applications for an opportunity
 * @access  Private (Facility owner)
 */

/**
 * @route   GET /api/v1/applications/:id
 * @desc    Get application by ID
 * @access  Private (Applicant or Facility owner)
 */

/**
 * @route   PUT /api/v1/applications/:id/status
 * @desc    Update application status
 * @access  Private (Facility owner)
 * @body    { status, facilityNotes }
 */

/**
 * @route   PUT /api/v1/applications/:id/withdraw
 * @desc    Withdraw application
 * @access  Private (Student)
 */

/**
 * @route   POST /api/v1/applications/:id/documents
 * @desc    Upload document to application
 * @access  Private (Student)
 * @body    FormData with file
 */

// ===== Hour Logs =====
/**
 * @route   POST /api/v1/hours
 * @desc    Create new hour log
 * @access  Private (Student)
 * @body    { opportunityId, date, startTime, endTime, etc. }
 */

/**
 * @route   GET /api/v1/hours/student
 * @desc    Get all hour logs for current student
 * @access  Private (Student)
 */

/**
 * @route   GET /api/v1/hours/facility
 * @desc    Get all hour logs for current facility
 * @access  Private (Facility)
 */

/**
 * @route   GET /api/v1/hours/:id
 * @desc    Get hour log by ID
 * @access  Private (Associated Student or Facility)
 */

/**
 * @route   PUT /api/v1/hours/:id/verify
 * @desc    Verify hour log
 * @access  Private (Facility)
 * @body    { verificationStatus }
 */

/**
 * @route   GET /api/v1/hours/summary/student
 * @desc    Get summary of hours for current student
 * @access  Private (Student)
 * @query   { startDate, endDate, specialty }
 */

/**
 * @route   GET /api/v1/hours/certificate
 * @desc    Generate certificate of completed hours
 * @access  Private (Student)
 * @query   { startDate, endDate, facilityId }
 */

// ===== Messaging =====
/**
 * @route   POST /api/v1/conversations
 * @desc    Create new conversation
 * @access  Private
 * @body    { participantId, subject, initialMessage }
 */

/**
 * @route   GET /api/v1/conversations
 * @desc    Get all conversations for current user
 * @access  Private
 */

/**
 * @route   GET /api/v1/conversations/:id
 * @desc    Get conversation by ID
 * @access  Private (Participant)
 */

/**
 * @route   POST /api/v1/messages
 * @desc    Send new message
 * @access  Private
 * @body    { conversationId, content, attachments }
 */

/**
 * @route   GET /api/v1/messages/conversation/:conversationId
 * @desc    Get all messages in a conversation
 * @access  Private (Participant)
 */

/**
 * @route   PUT /api/v1/messages/:id/read
 * @desc    Mark message as read
 * @access  Private (Recipient)
 */

// ===== Subscriptions =====
/**
 * @route   GET /api/v1/subscriptions/plans
 * @desc    Get all subscription plans
 * @access  Public
 */

/**
 * @route   POST /api/v1/subscriptions
 * @desc    Create new subscription
 * @access  Private (Student)
 * @body    { planId, paymentMethodId }
 */

/**
 * @route   GET /api/v1/subscriptions/current
 * @desc    Get current user's subscription
 * @access  Private (Student)
 */

/**
 * @route   PUT /api/v1/subscriptions/cancel
 * @desc    Cancel subscription
 * @access  Private (Student)
 */

/**
 * @route   POST /api/v1/subscriptions/payment-method
 * @desc    Update payment method
 * @access  Private (Student)
 * @body    { paymentMethodId }
 */

// ===== Search and Filters =====
/**
 * @route   GET /api/v1/search/specialties
 * @desc    Get all available specialties
 * @access  Public
 */

/**
 * @route   GET /api/v1/search/cities
 * @desc    Get cities with opportunities
 * @access  Public
 * @query   { state }
 */

/**
 * @route   GET /api/v1/search/map
 * @desc    Get opportunity map data
 * @access  Private
 * @query   { bounds, filters }
 */
