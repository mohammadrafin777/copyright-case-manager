'use client';

import { useState, useEffect } from 'react';
import { Plus, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Hearing {
  id: string;
  date: string;
  time: string;
  title: string;
  courtroom: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const sampleHearings: Hearing[] = [
  {
    id: '1',
    date: '2024-12-10',
    time: '10:00 AM',
    title: 'Pre-trial Conference',
    courtroom: 'Courtroom 3',
    status: 'upcoming'
  },
  {
    id: '2',
    date: '2024-12-15',
    time: '2:00 PM',
    title: 'Motion Hearing',
    courtroom: 'Courtroom 1',
    status: 'upcoming'
  },
  {
    id: '3',
    date: '2024-11-20',
    time: '11:00 AM',
    title: 'Status Conference',
    courtroom: 'Courtroom 2',
    status: 'completed'
  }
];

const statusStyles: Record<string, string> = {
  upcoming: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700'
};

export default function HearingsPage() {
  const [hearings, setHearings] = useState<Hearing[]>([]);

  useEffect(() => {
    // In production, fetch from API
    setHearings(sampleHearings);
  }, []);

  const upcoming = hearings.filter((h) => h.status === 'upcoming');
  const past = hearings.filter((h) => h.status !== 'upcoming');

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Hearings</h1>
          <p className="mt-1 text-sm text-gray-600">Track your upcoming court hearings</p>
        </div>
        <Link href="/hearings/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Hearing
          </Button>
        </Link>
      </div>

      <h2 className="mb-4 text-lg font-semibold text-gray-900">Upcoming</h2>
      <div className="mb-8 space-y-3">
        {upcoming.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-white p-8 text-center text-gray-500">
            <CalendarDays className="mx-auto mb-2 h-8 w-8 text-gray-300" />
            No upcoming hearings.
          </div>
        ) : (
          upcoming.map((h) => (
            <div key={h.id} className="flex items-center justify-between rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-blue-50">
                  <span className="text-sm font-bold text-blue-600">
                    {new Date(h.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {new Date(h.date).getDate()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{h.title}</h3>
                  <p className="text-sm text-gray-600">
                    {h.time} &middot; {h.courtroom}
                  </p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[h.status]}`}>
                {h.status}
              </span>
            </div>
          ))
        )}
      </div>

      {past.length > 0 && (
        <>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Past</h2>
          <div className="space-y-3">
            {past.map((h) => (
              <div key={h.id} className="flex items-center justify-between rounded-lg border bg-white p-5 shadow-sm opacity-75">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-gray-50">
                    <span className="text-sm font-bold text-gray-600">
                      {new Date(h.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-sm font-bold text-gray-600">
                      {new Date(h.date).getDate()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{h.title}</h3>
                    <p className="text-sm text-gray-600">
                      {h.time} &middot; {h.courtroom}
                    </p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[h.status]}`}>
                  {h.status}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
      }
