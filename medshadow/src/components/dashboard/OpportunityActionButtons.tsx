export default function OpportunityActionButtons() {
  return (
    <div className="flex gap-3 mt-14 mb-8 flex-wrap">
      <button className="bg-[#FCA311] hover:bg-[#FCA311]/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow flex-1">Apply Now</button>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow flex-1 flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" /></svg>
        Save
      </button>
    </div>
  );
} 