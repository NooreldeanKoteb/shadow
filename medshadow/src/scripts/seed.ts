import 'dotenv/config';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';
import { Opportunity } from '@/models/Opportunity';
import { Application } from '@/models/Application';

async function seed() {
  try {
    await connectToDatabase();
    console.log('Connected to database');

    // Clear existing data
    await User.deleteMany({});
    await Opportunity.deleteMany({});
    await Application.deleteMany({});
    console.log('Cleared existing data');

    // Create users

    const student = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'student',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      education: {
        school: 'University of Medical Sciences',
        degree: 'MD',
        graduationYear: 2025
      },
      interests: ['Cardiology', 'Emergency Medicine'],
      location: 'Cleveland, OH'
    });

    const facility = await User.create({
      name: 'Cleveland Clinic',
      email: 'cleveland@clinic.com',
      password: 'password123',
      role: 'facility',
      profileImage: 'https://logo.clearbit.com/clevelandclinic.org',
      specialties: ['Cardiology', 'Emergency Medicine', 'Neurology'],
      location: 'Cleveland, OH',
      description: 'Leading medical center providing world-class care'
    });

    console.log('Created users');

    // Create opportunities
    const opportunities = await Opportunity.create([
      {
        title: 'Cardiology Shadowing Program',
        facility: facility._id,
        specialty: 'Cardiology',
        location: {
          address: '9500 Euclid Ave',
          city: 'Cleveland',
          state: 'OH',
          zipCode: '44195',
          coordinates: { lat: 41.5036, lng: -81.6206 }
        },
        type: 'shadowing',
        duration: '4 weeks',
        schedule: 'Mon-Fri, 8am-4pm',
        description: 'Shadow cardiologists in various departments including interventional cardiology, electrophysiology, and heart failure.',
        requirements: [
          'Current medical student',
          'Basic understanding of cardiovascular system',
          'Professional attire required'
        ],
        isPaid: false,
        status: 'active',
        postedAt: new Date(),
        isNew: true
      },
      {
        title: 'Emergency Medicine Rotation',
        facility: facility._id,
        specialty: 'Emergency Medicine',
        location: {
          address: '9500 Euclid Ave',
          city: 'Cleveland',
          state: 'OH',
          zipCode: '44195',
          coordinates: { lat: 41.5036, lng: -81.6206 }
        },
        type: 'rotation',
        duration: '6 weeks',
        schedule: 'Mon-Sun, rotating shifts',
        description: 'Comprehensive emergency medicine rotation with exposure to trauma, critical care, and acute care.',
        requirements: [
          '3rd or 4th year medical student',
          'BLS certification',
          'Health insurance'
        ],
        isPaid: false,
        status: 'active',
        postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        isFeatured: true
      },
      {
        title: 'Neurology Research Internship',
        facility: facility._id,
        specialty: 'Neurology',
        location: {
          address: '9500 Euclid Ave',
          city: 'Cleveland',
          state: 'OH',
          zipCode: '44195',
          coordinates: { lat: 41.5036, lng: -81.6206 }
        },
        type: 'internship',
        duration: '12 weeks',
        schedule: 'Mon-Fri, 9am-5pm',
        description: 'Research-focused internship in neurology with opportunities to work on clinical trials and research projects.',
        requirements: [
          'Research experience preferred',
          'Strong academic background',
          'Commitment to full duration'
        ],
        isPaid: true,
        status: 'active',
        postedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
        isPopular: true
      },
      {
        title: 'Cardiology Shadowing Program 2',
        facility: facility._id,
        specialty: 'Cardiology',
        location: {
          address: '9500 Euclid Ave',
          city: 'Cleveland',
          state: 'OH',
          zipCode: '44195',
          coordinates: { lat: 41.5036, lng: -81.6206 }
        },
        type: 'shadowing',
        duration: '4 weeks',
        schedule: 'Mon-Fri, 8am-4pm',
        description: 'Shadow cardiologists in various departments including interventional cardiology, electrophysiology, and heart failure.',
        requirements: [
          'Current medical student',
          'Basic understanding of cardiovascular system',
          'Professional attire required'
        ],
        isPaid: false,
        status: 'active',
        postedAt: new Date(),
        isNew: true
      },
      {
        title: 'Cardiology Shadowing Program 3',
        facility: facility._id,
        specialty: 'Cardiology',
        location: {
          address: '9500 Euclid Ave',
          city: 'Cleveland',
          state: 'OH',
          zipCode: '44195',
          coordinates: { lat: 41.5036, lng: -81.6206 }
        },
        type: 'shadowing',
        duration: '4 weeks',
        schedule: 'Mon-Fri, 8am-4pm',
        description: 'Shadow cardiologists in various departments including interventional cardiology, electrophysiology, and heart failure.',
        requirements: [
          'Current medical student',
          'Basic understanding of cardiovascular system',
          'Professional attire required'
        ],
        isPaid: false,
        status: 'active',
        postedAt: new Date(),
        isNew: true
      },
      {
        title: 'Cardiology Shadowing Program 4',
        facility: facility._id,
        specialty: 'Cardiology',
        location: {
          address: '9500 Euclid Ave',
          city: 'Cleveland',
          state: 'OH',
          zipCode: '44195',
          coordinates: { lat: 41.5036, lng: -81.6206 }
        },
        type: 'shadowing',
        duration: '4 weeks',
        schedule: 'Mon-Fri, 8am-4pm',
        description: 'Shadow cardiologists in various departments including interventional cardiology, electrophysiology, and heart failure.',
        requirements: [
          'Current medical student',
          'Basic understanding of cardiovascular system',
          'Professional attire required'
        ],
        isPaid: false,
        status: 'active',
        postedAt: new Date(),
        isNew: true
      },
      {
        title: 'Cardiology Shadowing Program 5',
        facility: facility._id,
        specialty: 'Cardiology',
        location: {
          address: '9500 Euclid Ave',
          city: 'Cleveland',
          state: 'OH',
          zipCode: '44195',
          coordinates: { lat: 41.5036, lng: -81.6206 }
        },
        type: 'shadowing',
        duration: '4 weeks',
        schedule: 'Mon-Fri, 8am-4pm',
        description: 'Shadow cardiologists in various departments including interventional cardiology, electrophysiology, and heart failure.',
        requirements: [
          'Current medical student',
          'Basic understanding of cardiovascular system',
          'Professional attire required'
        ],
        isPaid: false,
        status: 'active',
        postedAt: new Date(),
        isNew: true
      },
      {
        title: 'Cardiology Shadowing Program 6',
        facility: facility._id,
        specialty: 'Cardiology',
        location: {
          address: '9500 Euclid Ave',
          city: 'Cleveland',
          state: 'OH',
          zipCode: '44195',
          coordinates: { lat: 41.5036, lng: -81.6206 }
        },
        type: 'shadowing',
        duration: '4 weeks',
        schedule: 'Mon-Fri, 8am-4pm',
        description: 'Shadow cardiologists in various departments including interventional cardiology, electrophysiology, and heart failure.',
        requirements: [
          'Current medical student',
          'Basic understanding of cardiovascular system',
          'Professional attire required'
        ],
        isPaid: false,
        status: 'active',
        postedAt: new Date(),
        isNew: true
      },
      {
        title: 'Cardiology Shadowing Program 7',
        facility: facility._id,
        specialty: 'Cardiology',
        location: {
          address: '9500 Euclid Ave',
          city: 'Cleveland',
          state: 'OH',
          zipCode: '44195',
          coordinates: { lat: 41.5036, lng: -81.6206 }
        },
        type: 'shadowing',
        duration: '4 weeks',
        schedule: 'Mon-Fri, 8am-4pm',
        description: 'Shadow cardiologists in various departments including interventional cardiology, electrophysiology, and heart failure.',
        requirements: [
          'Current medical student',
          'Basic understanding of cardiovascular system',
          'Professional attire required'
        ],
        isPaid: false,
        status: 'active',
        postedAt: new Date(),
        isNew: true
      },
      {
        title: 'Cardiology Shadowing Program 8',
        facility: facility._id,
        specialty: 'Cardiology',
        location: {
          address: '9500 Euclid Ave',
          city: 'Cleveland',
          state: 'OH',
          zipCode: '44195',
          coordinates: { lat: 41.5036, lng: -81.6206 }
        },
        type: 'shadowing',
        duration: '4 weeks',
        schedule: 'Mon-Fri, 8am-4pm',
        description: 'Shadow cardiologists in various departments including interventional cardiology, electrophysiology, and heart failure.',
        requirements: [
          'Current medical student',
          'Basic understanding of cardiovascular system',
          'Professional attire required'
        ],
        isPaid: false,
        status: 'active',
        postedAt: new Date(),
        isNew: true
      }
    ]);

    console.log('Created opportunities');

    // Create applications
    await Application.create({
      student: student._id,
      opportunity: opportunities[0]._id,
      status: 'pending',
      coverLetter: 'I am very interested in this opportunity to learn more about cardiology.',
      resume: 'https://example.com/resume.pdf',
      createdAt: new Date()
    });

    console.log('Created applications');

    // Save some opportunities for the student
    await User.findByIdAndUpdate(student._id, {
      $push: { savedOpportunities: opportunities[1]._id }
    });

    console.log('Saved opportunities for student');

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 