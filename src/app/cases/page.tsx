'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface Case {
  id: string;
  title: string;
  caseNumber: string;
  status: string;
  clientName: string;
  hearingDate?: string;
}

const sampleCases: Case[] = [
  {
    id: '1',
    title: 'Smith v. Johnson',
    caseNumber: 'CV-2024-001',
    status: 'active',
    clientName: 'Robert Smith',
    hearingDate: '2024-12-10'
  },
  {
    id: '2',
    title: 'Corporate Merger Review',
    caseNumber: 'CV-2024-002',
    status: 'pending',
    clientName: 'Acme Corp'
  },
  {
    id: '3',
    title: 'Tenant Dispute',
    caseNumber: 'CV-2024-003',
    status: 'closed',
    clientName: 'Maria Garcia'
  }
];

const statusStyles: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  closed: 'bg-gray-100 text-gray-700'
};

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // In production, fetch from API
    setCases(sampleCases);
  }, []);

  const filtered = cases.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.caseNumber.toLowerCase().includes(search.toLowerCase()) ||
    c.clientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Cases</h1>
          <p className="mt-1 text-sm text-gray-600">Manage all your legal cases</p>
        </div>
        <Link href="/cases/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </Link>
      </div>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search cases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500">Case</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">Case Number</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">Client</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">Next Hearing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <FolderOpen className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                  No cases found.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-blue-600">
                    <Link href={`/cases/${c.id}`}>{c.title}</Link>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{c.caseNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{c.clientName}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {c.hearingDate || <span className="text-gray-400">Not scheduled</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
            }
