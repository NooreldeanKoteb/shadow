import Link from 'next/link';

export default function StatsQuickActions({ applicationsCount, savedCount }) {
  return (
    <div className="px-4 py-2 space-y-4">
      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
        <Link href="/applications" className="bg-white border rounded p-2 text-center shadow-sm hover:bg-blue-50 transition-colors cursor-pointer block">
          <div className="font-bold text-[#FCA311]">{applicationsCount}</div>
          <div>Applied</div>
        </Link>
        <Link href="/opportunities/saved" className="bg-white border rounded p-2 text-center shadow-sm hover:bg-blue-50 transition-colors cursor-pointer block">
          <div className="font-bold text-[#14213D]">{savedCount}</div>
          <div>Saved</div>
        </Link>
      </div>
    </div>
  );
} 