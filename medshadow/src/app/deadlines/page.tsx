'use client';
export const dynamic = "force-dynamic";

import { useState, useEffect, useRef, createRef } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaGoogle, FaCalendarAlt, FaFilter, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import type { Event as RBCEvent } from 'react-big-calendar';
import { toast } from 'react-hot-toast';
import DeadlineModal from '@/components/DeadlineModal';

const localizer = momentLocalizer(moment);

export interface Deadline {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'shadowing_application' | 'rotation_application' | 'interview' | 'start_date' | 'medical_school' | 'document_deadline' | 'other';
  category: 'shadowing' | 'rotation' | 'medical_school' | 'volunteering' | 'other';
  priority: 'high' | 'medium' | 'low';
  description?: string;
  location?: string;
  color?: string;
  requirements?: string[];
  relatedOpportunityId?: string;
  recurring: 'none' | 'daily' | 'weekly' | 'monthly' | 'custom' | 'none';
  customDays?: string[];
  completed?: boolean;
  notes?: string;
}

// Enhanced mock data with more relevant examples
const mockDeadlines: Deadline[] = [
  {
    id: '1',
    title: 'Surgery Rotation Application Due',
    start: new Date(2025, 3, 15),
    end: new Date(2025, 3, 15),
    type: 'rotation_application',
    category: 'rotation',
    priority: 'high',
    description: 'Submit all required documents for the surgery rotation',
    requirements: ['CV', 'Letter of Recommendation', 'Immunization Records'],
    color: '#FF6B6B',
    relatedOpportunityId: 'rot123',
    recurring: 'none',
    completed: false,
    notes: '',
  },
  {
    id: '2',
    title: 'Pediatrics Interview',
    start: new Date(2025, 3, 20, 14, 0),
    end: new Date(2025, 3, 20, 15, 0),
    type: 'interview',
    category: 'shadowing',
    priority: 'high',
    location: 'Children\'s Hospital - Room 302',
    description: 'Virtual interview with Dr. Smith for shadowing opportunity',
    color: '#4ECDC4',
    relatedOpportunityId: 'sha456',
    recurring: 'weekly',
    completed: false,
    notes: '',
  },
  {
    id: '3',
    title: 'Medical School Application Deadline',
    start: new Date(2025, 4, 1),
    end: new Date(2025, 4, 1),
    type: 'medical_school',
    category: 'medical_school',
    priority: 'high',
    description: 'AMCAS application submission deadline',
    requirements: ['Personal Statement', 'MCAT Scores', 'Transcripts'],
    color: '#A78BFA',
    recurring: 'monthly',
    completed: false,
    notes: '',
  },
  // Additional mock data for scrolling
  {
    id: '4',
    title: 'Volunteer Orientation',
    start: new Date(2025, 4, 5, 10, 0),
    end: new Date(2025, 4, 5, 12, 0),
    type: 'other',
    category: 'volunteering',
    priority: 'medium',
    location: 'Community Center',
    description: 'Mandatory orientation for new volunteers.',
    color: '#43AA8B',
    recurring: 'custom',
    customDays: ['Monday', 'Wednesday'],
    completed: false,
    notes: '',
  },
  {
    id: '5',
    title: 'Shadowing Application Opens',
    start: new Date(2025, 4, 10),
    end: new Date(2025, 4, 10),
    type: 'shadowing_application',
    category: 'shadowing',
    priority: 'low',
    description: 'Applications open for summer shadowing program.',
    color: '#FCA311',
    recurring: 'daily',
    completed: false,
    notes: '',
  },
  {
    id: '6',
    title: 'Document Submission Deadline',
    start: new Date(2025, 4, 12),
    end: new Date(2025, 4, 12),
    type: 'document_deadline',
    category: 'other',
    priority: 'medium',
    description: 'Submit all required documents for your application.',
    requirements: ['Immunization Records', 'Background Check'],
    color: '#A78BFA',
    recurring: 'none',
    completed: false,
    notes: '',
  },
  {
    id: '7',
    title: 'Rotation Start Date',
    start: new Date(2025, 4, 15),
    end: new Date(2025, 4, 15),
    type: 'start_date',
    category: 'rotation',
    priority: 'medium',
    description: 'First day of internal medicine rotation.',
    color: '#457B9D',
    recurring: 'none',
    completed: false,
    notes: '',
  },
  {
    id: '8',
    title: 'Volunteer Check-in',
    start: new Date(2025, 4, 18, 9, 0),
    end: new Date(2025, 4, 18, 10, 0),
    type: 'other',
    category: 'volunteering',
    priority: 'low',
    location: 'Hospital Lobby',
    description: 'Weekly volunteer check-in meeting.',
    color: '#4ECDC4',
    recurring: 'none',
    completed: false,
    notes: '',
  },
  {
    id: '9',
    title: 'Shadowing Feedback Due',
    start: new Date(2025, 4, 20),
    end: new Date(2025, 4, 20),
    type: 'other',
    category: 'shadowing',
    priority: 'medium',
    description: 'Submit feedback for completed shadowing experience.',
    color: '#43AA8B',
    recurring: 'none',
    completed: false,
    notes: '',
  },
  {
    id: '10',
    title: 'Rotation Evaluation',
    start: new Date(2025, 4, 25),
    end: new Date(2025, 4, 25),
    type: 'other',
    category: 'rotation',
    priority: 'low',
    description: 'Complete evaluation for your rotation.',
    color: '#FF6B6B',
    recurring: 'none',
    completed: false,
    notes: '',
  },
  {
    id: '11',
    title: 'Medical School Interview',
    start: new Date(2025, 4, 28, 13, 0),
    end: new Date(2025, 4, 28, 14, 0),
    type: 'interview',
    category: 'medical_school',
    priority: 'high',
    location: 'Zoom',
    description: 'Interview for medical school admission.',
    color: '#E76F51',
    recurring: 'none',
    completed: false,
    notes: '',
  },
];

const deadlineTypeLabels = {
  shadowing_application: 'Shadowing Application',
  rotation_application: 'Rotation Application',
  interview: 'Interview',
  start_date: 'Start Date',
  medical_school: 'Medical School',
  document_deadline: 'Document Deadline',
  other: 'Other'
};

// Category color map
const categoryColors: Record<string, string> = {
  shadowing: '#43AA8B',
  rotation: '#457B9D',
  medical_school: '#A78BFA',
  volunteering: '#4ECDC4',
  other: '#FCA311',
};
// Priority dot color map
const priorityDotColors: Record<string, string> = {
  high: '#EF4444',    // red-500
  medium: '#FACC15',  // yellow-400
  low: '#22C55E',     // green-500
};

interface CalendarToolbarProps {
  label: string;
  onNavigate: (action: string) => void;
  onView: (view: string) => void;
  views: string[];
  view: string;
}

function CalendarToolbar({ label, onNavigate, onView, views, view }: CalendarToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-6 pl-2 w-full">
      {/* Left: Views */}
      <div className="flex gap-2">
        {views.map((v: string) => (
          <button
            key={v}
            className={`px-4 py-2 text-base rounded-md border font-medium transition-colors ${view === v ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            onClick={() => onView(v)}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>
      {/* Center: Label */}
      <div className="flex-1 flex justify-center">
        <span className="font-semibold text-lg text-[#14213D]">{label}</span>
      </div>
      {/* Right: Navigation */}
      <div className="flex gap-2">
        <button
          className="px-4 py-2 text-base bg-white border border-gray-300 rounded-md text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
          onClick={() => onNavigate('TODAY')}
        >
          Today
        </button>
        <button
          className="px-4 py-2 text-base bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => onNavigate('PREV')}
        >
          <FaChevronLeft />
        </button>
        <button
          className="px-4 py-2 text-base bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => onNavigate('NEXT')}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

// Custom event component for calendar
function CalendarEvent({ event, view }: { event: Deadline, view?: string }) {
  const bg = categoryColors[event.category] || '#FCA311';
  const dot = priorityDotColors[event.priority] || '#22C55E';
  return (
    <div
      className="flex flex-col px-3 py-2 rounded-md min-w-0"
      style={{ backgroundColor: bg, color: '#fff', border: 'none', boxShadow: 'none' }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="inline-block w-2.5 h-2.5 rounded-full mr-1 flex-shrink-0"
          style={{ backgroundColor: dot }}
        />
        <span className="font-semibold text-sm truncate min-w-0">{event.title}</span>
      </div>
      {view === 'month' && (
        <span className="text-xs font-medium mt-1 ml-4">
          {event.start instanceof Date
            ? event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : ''} - {event.end instanceof Date
              ? event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : ''}
        </span>
      )}
    </div>
  );
}

export default function DeadlinesPage() {
  const { data: session } = useSession();
  const [deadlines, setDeadlines] = useState<Deadline[]>(mockDeadlines);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [calendarView, setCalendarView] = useState<string>('month');
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [syncLoading, setSyncLoading] = useState(false);
  const [editDeadline, setEditDeadline] = useState<Deadline | null>(null);
  const [notesModal, setNotesModal] = useState<{ open: boolean; deadline: Deadline | null }>({ open: false, deadline: null });
  const [notesInput, setNotesInput] = useState('');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const listRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [userDropdownOpen]);

  // Scroll to highlighted item when it changes
  useEffect(() => {
    if (highlightedId && listRefs.current[highlightedId]) {
      listRefs.current[highlightedId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightedId]);

  const eventStyleGetter = (event: Deadline) => {
    return {
      style: {
        backgroundColor: 'transparent',
        color: 'inherit',
        border: 'none',
        boxShadow: 'none',
        padding: 0,
      }
    };
  };

  const filteredDeadlines = deadlines.filter(deadline => 
    (filterType === 'all' || deadline.type === filterType) &&
    (filterCategory === 'all' || deadline.category === filterCategory) &&
    (filterPriority === 'all' || deadline.priority === filterPriority)
  );

  const handleGoogleSync = async () => {
    setSyncLoading(true);
    try {
      const res = await fetch('/api/google-calendar/auth');
      const data = await res.json();
      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        toast.error('Failed to get Google Calendar auth URL.');
      }
    } catch (err) {
      toast.error('Google Calendar sync failed.');
    } finally {
      setSyncLoading(false);
    }
  };

  const handleAddDeadline = async (deadline: Deadline) => {
    setDeadlines((prev) => [
      { ...deadline, id: Date.now().toString() },
      ...prev,
    ]);
    setShowAddModal(false);
  };

  const handleComplete = (id: string) => {
    setDeadlines((prev) => prev.map(d => d.id === id ? { ...d, completed: !d.completed } : d));
  };

  const handleOpenNotes = (deadline: Deadline) => {
    setNotesInput(deadline.notes || '');
    setNotesModal({ open: true, deadline });
  };

  const handleSaveNotes = () => {
    if (notesModal.deadline) {
      setDeadlines((prev) => prev.map(d => d.id === notesModal.deadline!.id ? { ...d, notes: notesInput } : d));
    }
    setNotesModal({ open: false, deadline: null });
  };

  const handleEdit = (deadline: Deadline) => {
    setEditDeadline(deadline);
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    setDeadlines((prev) => prev.filter(d => d.id !== id));
    setShowAddModal(false);
    setEditDeadline(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <ToasterClient /> */}
      <DeadlineModal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); setEditDeadline(null); }}
        onSave={editDeadline ? (deadline => {
          setDeadlines(prev => prev.map(d => d.id === editDeadline.id ? { ...d, ...deadline } : d));
          setShowAddModal(false);
          setEditDeadline(null);
        }) : handleAddDeadline}
        initialData={editDeadline || undefined}
        onDelete={editDeadline ? () => handleDelete(editDeadline.id) : undefined}
      />
      {/* Fixed Header (copied from dashboard/profile) */}
      <header className="fixed top-0 left-0 right-0 z-[99999] bg-white border-b border-gray-200 flex items-center justify-between px-4 py-2 shadow-md">
        <div className="flex items-center space-x-3">
          <Image src="/images/logo-mayo.png" alt="MedShadow Logo" width={40} height={40} className="rounded" />
          <span className="font-bold text-lg text-[#14213D] tracking-tight">MedShadow</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/dashboard" className="text-[#14213D] hover:text-[#FCA311] font-medium">Dashboard</Link>
          <Link href="/applications" className="text-[#14213D] hover:text-[#FCA311] font-medium">Applications</Link>
          <Link href="/profiles/student/me" className="text-[#14213D] hover:text-[#FCA311] font-medium">Profile</Link>
          <Link href="/resources" className="text-[#14213D] hover:text-[#FCA311] font-medium">Resources</Link>
        </nav>
        <div className="flex items-center space-x-3 relative z-[99999]" ref={userDropdownRef}>
          <button className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#FCA311] shadow-sm focus:outline-none mr-4" onClick={() => setUserDropdownOpen((o) => !o)} aria-label="User menu">
            <Image src={session?.user?.image || '/images/default-avatar.jpg'} alt={session?.user?.name || 'User profile'} fill className="object-cover" />
          </button>
          {userDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 min-w-[10rem] bg-white border border-gray-200 rounded-lg shadow-lg z-[99999] p-2">
              <Link href="/profiles/student/me" className="block w-full text-left px-3 py-2 rounded hover:bg-blue-50">My Profile</Link>
              <Link href="/profiles/student/edit" className="block w-full text-left px-3 py-2 rounded hover:bg-blue-50">Edit Profile</Link>
              <button className="block w-full text-left px-3 py-2 rounded text-red-600 hover:underline hover:bg-red-50" onClick={() => {/* sign out logic here */}}>Sign Out</button>
            </div>
          )}
        </div>
        <button className="md:hidden ml-2 p-2" onClick={() => {/* TODO: mobile sidebar */}} aria-label="Open sidebar">
          <svg className="w-6 h-6 text-[#14213D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </header>

      {/* Main Content */}
      <div className="pt-20 px-2 md:px-6">
        <div className="w-full max-w-none mx-auto p-4 md:p-8">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <h1 className="text-3xl font-bold text-gray-900">Deadlines & Schedule</h1>
          </div>

          {/* Responsive flex layout: calendar left, list right */}
          <div className="flex flex-col md:flex-row gap-6 w-full h-[80vh]">
            {/* Calendar (left column, hidden on mobile) */}
            <div className="hidden md:block w-1/2 h-full">
              <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">
                <Calendar
                  localizer={localizer}
                  events={filteredDeadlines}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%' }}
                  eventPropGetter={eventStyleGetter}
                  views={['month', 'week', 'day']}
                  defaultView="month"
                  tooltipAccessor={(event: Deadline) => `${event.title}\n${event.description || ''}\n${event.location || ''}`}
                  className="custom-calendar"
                  view={calendarView}
                  date={calendarDate}
                  onView={setCalendarView}
                  onNavigate={setCalendarDate}
                  onSelectEvent={(event: Deadline) => {
                    setHighlightedId(event.id);
                  }}
                  components={{
                    toolbar: CalendarToolbar,
                    event: (props: { event: Deadline }) => <CalendarEvent {...props} view={calendarView} />,
                  }}
                />
              </div>
            </div>
            {/* List view (right column, full width on mobile) */}
            <div className="w-full md:w-1/2 h-full flex flex-col">
              {/* Controls above the list, left-aligned */}
              <div className="flex flex-wrap gap-4 mb-6 pt-4 items-center pl-2 justify-between">
                <div className="flex flex-wrap gap-4 items-center">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <FaPlus />
                    Add
                  </button>
                  <div className="relative">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="cursor-pointer appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 hover:bg-gray-50"
                    >
                      <option className="cursor-pointer" value="all">All Categories</option>
                      <option value="shadowing">Shadowing</option>
                      <option value="rotation">Rotation</option>
                      <option value="medical_school">Medical School</option>
                      <option value="volunteering">Volunteering</option>
                      <option value="other">Other</option>
                    </select>
                    <FaFilter className="absolute right-3 top-3 text-gray-400" />
                  </div>
                  <div className="relative">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="cursor-pointer appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 hover:bg-gray-50"
                    >
                      <option value="all">All Types</option>
                      {Object.entries(deadlineTypeLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <FaFilter className="absolute right-3 top-3 text-gray-400" />
                  </div>
                  <div className="relative">
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="cursor-pointer appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 hover:bg-gray-50"
                    >
                      <option value="all">All Priorities</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <FaFilter className="absolute right-3 top-3 text-gray-400" />
                  </div>
                  <button
                    onClick={handleGoogleSync}
                    className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-blue-50 text-blue-600 font-semibold transition-colors ${syncLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    disabled={syncLoading}
                  >
                    <FaGoogle />
                    {syncLoading ? 'Connecting...' : 'Sync Calendar'}
                  </button>
                </div>
                <div className="ml-auto text-gray-500 font-medium text-sm pr-2 md:pr-6">
                  {filteredDeadlines.length} item{filteredDeadlines.length === 1 ? '' : 's'}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow h-full overflow-y-auto flex flex-col">
                {filteredDeadlines.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">No deadlines found.</div>
                ) : (
                  filteredDeadlines
                    .sort((a, b) => a.start.getTime() - b.start.getTime())
                    .map((deadline, idx, arr) => {
                      // Attach a ref for each item
                      if (!listRefs.current[deadline.id]) {
                        listRefs.current[deadline.id] = null;
                      }
                      return (
                        <div
                          key={deadline.id}
                          ref={el => { listRefs.current[deadline.id] = el; }}
                          className={`p-6 hover:bg-gray-50 border-b border-b-gray-200 flex items-center ${deadline.completed ? 'bg-gray-100' : ''} ${highlightedId === deadline.id ? 'ring-2 ring-[#FCA311] ring-offset-2' : ''}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setCalendarDate(deadline.start);
                            setHighlightedId(deadline.id);
                          }}
                        >
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-semibold">{deadline.title}</h3>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      deadline.priority === 'high' ? 'bg-red-100 text-red-800' :
                                      deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-green-100 text-green-800'
                                    }`}
                                  >
                                    {deadline.priority.charAt(0).toUpperCase() + deadline.priority.slice(1)} Priority
                                  </span>
                                </div>
                                <p className="text-gray-600">{moment(deadline.start).format('MMMM D, YYYY h:mm A')}</p>
                                {deadline.description && (
                                  <p className="text-gray-500">{deadline.description}</p>
                                )}
                                {deadline.location && (
                                  <p className="text-gray-500 flex items-center gap-1">
                                    📍 {deadline.location}
                                  </p>
                                )}
                                {deadline.requirements && deadline.requirements.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-sm font-medium text-gray-700">Requirements:</p>
                                    <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                                      {deadline.requirements.map((req, index) => (
                                        <li key={index}>{req}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col items-end justify-between h-full min-h-[100px]">
                                <div className="flex flex-col items-end gap-2">
                                  <span
                                    className="px-3 py-1 rounded-full text-sm"
                                    style={{ backgroundColor: deadline.color + '20', color: deadline.color }}
                                  >
                                    {deadlineTypeLabels[deadline.type]}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {deadline.category.replace('_', ' ').charAt(0).toUpperCase() + deadline.category.slice(1)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mt-8">
                                  <button
                                    onClick={() => handleComplete(deadline.id)}
                                    className={`p-2 rounded-full border-2 bg-white hover:bg-green-50 transition-colors ${deadline.completed ? 'border-green-600' : 'border-green-500'}`}
                                    title={deadline.completed ? 'Mark as incomplete' : 'Mark as complete'}
                                  >
                                    <svg className={`w-5 h-5 transition-colors ${deadline.completed ? 'text-green-500' : 'text-gray-400'}`} fill="none" stroke={deadline.completed ? '#22C55E' : '#D1D5DB'} strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                  </button>
                                  <button
                                    onClick={() => handleOpenNotes(deadline)}
                                    className="p-2 rounded-full border-2 border-blue-400 bg-white hover:bg-blue-50"
                                    title={deadline.notes ? deadline.notes : 'Add notes'}
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="#2563EB" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
                                  </button>
                                  <button
                                    onClick={() => handleEdit(deadline)}
                                    className="p-2 rounded-full border-2 border-gray-400 bg-white hover:bg-gray-100"
                                    title="Edit"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6" /></svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {notesModal.open && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn border border-gray-100">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl focus:outline-none"
              onClick={() => setNotesModal({ open: false, deadline: null })}
              aria-label="Close notes"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-[#14213D]">Notes</h2>
            <textarea
              className="form-input border-2 border-gray-400 focus:ring-2 focus:ring-[#FCA311] focus:border-[#FCA311] w-full mb-4"
              rows={4}
              value={notesInput}
              onChange={e => setNotesInput(e.target.value)}
              placeholder="Add notes for this item..."
            />
            <div className="flex justify-end gap-2">
              <button
                className="border border-gray-300 text-[#14213D] bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-[#FCA311] px-6 rounded-md font-semibold transition-colors"
                onClick={() => setNotesModal({ open: false, deadline: null })}
              >
                Cancel
              </button>
              <button
                className="btn-primary bg-[#FCA311] hover:bg-[#E76F51] text-white font-semibold px-6 focus:ring-2 focus:ring-[#FCA311] rounded-md transition-colors"
                onClick={handleSaveNotes}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 