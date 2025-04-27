import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface DeadlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (deadline: any) => void;
  initialData?: any;
  onDelete?: () => void;
}

const typeOptions = [
  { value: 'shadowing_application', label: 'Shadowing Application' },
  { value: 'rotation_application', label: 'Rotation Application' },
  { value: 'interview', label: 'Interview' },
  { value: 'start_date', label: 'Start Date' },
  { value: 'medical_school', label: 'Medical School' },
  { value: 'document_deadline', label: 'Document Deadline' },
  { value: 'other', label: 'Other' },
];

const categoryOptions = [
  { value: 'shadowing', label: 'Shadowing' },
  { value: 'rotation', label: 'Rotation' },
  { value: 'medical_school', label: 'Medical School' },
  { value: 'volunteering', label: 'Volunteering' },
  { value: 'other', label: 'Other' },
];

const priorityOptions = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const daysOfWeek = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export default function DeadlineModal({ isOpen, onClose, onSave, initialData, onDelete }: DeadlineModalProps) {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    start: initialData?.start ? new Date(initialData.start).toISOString().slice(0,16) : '',
    end: initialData?.end ? new Date(initialData.end).toISOString().slice(0,16) : '',
    type: initialData?.type || 'shadowing_application',
    category: initialData?.category || 'shadowing',
    priority: initialData?.priority || 'medium',
    description: initialData?.description || '',
    location: initialData?.location || '',
    requirements: initialData?.requirements ? initialData.requirements.join(', ') : '',
    recurring: initialData?.recurring || 'none',
    customDays: initialData?.customDays || [],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      title: initialData?.title || '',
      start: initialData?.start ? new Date(initialData.start).toISOString().slice(0,16) : '',
      end: initialData?.end ? new Date(initialData.end).toISOString().slice(0,16) : '',
      type: initialData?.type || 'shadowing_application',
      category: initialData?.category || 'shadowing',
      priority: initialData?.priority || 'medium',
      description: initialData?.description || '',
      location: initialData?.location || '',
      requirements: initialData?.requirements ? initialData.requirements.join(', ') : '',
      recurring: initialData?.recurring || 'none',
      customDays: initialData?.customDays || [],
    });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleDay = (day: string) => {
    setForm((prev) => {
      const days = prev.customDays.includes(day)
        ? prev.customDays.filter((d: string) => d !== day)
        : [...prev.customDays, day];
      return { ...prev, customDays: days };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const deadline = {
      ...form,
      start: new Date(form.start),
      end: new Date(form.end),
      requirements: form.requirements.split(',').map((r: string) => r.trim()).filter(Boolean),
    };
    await onSave(deadline);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#14213D]/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fadeIn border border-gray-100">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-[#E76F51] text-2xl focus:outline-none focus:ring-2 focus:ring-[#FCA311] rounded-full"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-[#14213D] tracking-tight">{initialData ? 'Edit Deadline' : 'Add Deadline'}</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="form-label font-semibold text-[#14213D]">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-input border-2 border-gray-400 focus:ring-2 focus:ring-[#FCA311] focus:border-[#FCA311]"
              required
              placeholder="e.g. Surgery Application Due"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="form-label font-semibold text-[#14213D]">Start</label>
              <input
                type="datetime-local"
                name="start"
                value={form.start}
                onChange={handleChange}
                className="form-input border-2 border-gray-400 focus:ring-2 focus:ring-[#FCA311] focus:border-[#FCA311]"
                required
              />
            </div>
            <div className="flex-1">
              <label className="form-label font-semibold text-[#14213D]">End</label>
              <input
                type="datetime-local"
                name="end"
                value={form.end}
                onChange={handleChange}
                className="form-input border-2 border-gray-400 focus:ring-2 focus:ring-[#FCA311] focus:border-[#FCA311]"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="form-label font-semibold text-[#14213D]">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="form-input border-2 border-gray-400 focus:ring-2 focus:ring-[#FCA311] focus:border-[#FCA311] cursor-pointer"
              >
                {typeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="form-label font-semibold text-[#14213D]">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-input border-2 border-gray-400 focus:ring-2 focus:ring-[#FCA311] focus:border-[#FCA311] cursor-pointer"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="form-label font-semibold text-[#14213D]">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="form-input border-2 border-gray-400 focus:ring-2 focus:ring-[#FCA311] focus:border-[#FCA311] cursor-pointer"
              >
                {priorityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="form-label font-semibold text-[#14213D]">Recurring</label>
              <select
                name="recurring"
                value={form.recurring}
                onChange={handleChange}
                className="form-input border-2 border-gray-400 focus:ring-2 focus:ring-[#FCA311] focus:border-[#FCA311] cursor-pointer"
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom (Certain Days Only)</option>
              </select>
            </div>
          </div>
          {form.recurring === 'custom' && (
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleToggleDay(day)}
                  className={`px-3 py-1 rounded-full border-2 text-sm font-semibold transition-colors ${form.customDays.includes(day)
                    ? 'bg-[#FCA311] text-white border-[#FCA311]'
                    : 'bg-white text-[#14213D] border-gray-300 hover:bg-gray-100'}`}
                  style={{ minWidth: 80 }}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
          <div>
            <label className="form-label font-semibold text-[#14213D]">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="form-input border-2 border-gray-400 focus:ring-2 focus:ring-[#FCA311] focus:border-[#FCA311]"
              placeholder="e.g. Cleveland Clinic, Zoom"
            />
          </div>
          <div>
            <label className="form-label font-semibold text-[#14213D]">Requirements <span className="text-xs text-gray-400 font-normal">(comma separated)</span></label>
            <input
              type="text"
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              className="form-input border-2 border-gray-400 focus:ring-2 focus:ring-[#FCA311] focus:border-[#FCA311]"
              placeholder="e.g. CV, Immunization, Reference Letter"
            />
          </div>
          <div>
            <label className="form-label font-semibold text-[#14213D]">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-input border-2 border-gray-400 focus:ring-2 focus:ring-[#FCA311] focus:border-[#FCA311]"
              rows={3}
              placeholder="Add any notes or details about this deadline..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 items-center">
            {onDelete && (
              <button
                type="button"
                className="border border-red-500 text-white bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-400 px-6 py-2 rounded-md font-semibold transition-colors mr-auto"
                onClick={onDelete}
                disabled={saving}
              >
                Delete
              </button>
            )}
            <button
              type="button"
              className="border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-[#FCA311] px-6 py-2 rounded-md font-semibold transition-colors"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary bg-[#FCA311] hover:bg-[#E76F51] text-white font-semibold px-6 focus:ring-2 focus:ring-[#FCA311]"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 