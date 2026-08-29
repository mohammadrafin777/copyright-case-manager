'use client';

import { useState, useEffect } from 'react';
import { Upload, FileText, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface Document {
  id: string;
  name: string;
  caseTitle: string;
  type: string;
  size: string;
  uploadedAt: string;
}

const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'Complaint.pdf',
    caseTitle: 'Smith v. Johnson',
    type: 'Filing',
    size: '2.4 MB',
    uploadedAt: '2024-11-15'
  },
  {
    id: '2',
    name: 'Evidence-Exhibit-A.docx',
    caseTitle: 'Corporate Merger Review',
    type: 'Evidence',
    size: '1.1 MB',
    uploadedAt: '2024-11-18'
  },
  {
    id: '3',
    name: 'Motion-to-Dismiss.pdf',
    caseTitle: 'Tenant Dispute',
    type: 'Motion',
    size: '856 KB',
    uploadedAt: '2024-11-20'
  }
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // In production, fetch from API
    setDocuments(sampleDocuments);
  }, []);

  const filtered = documents.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.caseTitle.toLowerCase().includes(search.toLowerCase()) ||
      d.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
          <p className="mt-1 text-sm text-gray-600">Manage case files and legal documents</p>
        </div>
        <Link href="/documents/upload">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </Link>
      </div>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">Case</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">Type</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">Size</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">Uploaded</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <FileText className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                  No documents found.
                </td>
              </tr>
            ) : (
              filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-medium text-gray-900">
                      <FileText className="h-4 w-4 text-gray-400" />
                      {doc.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{doc.caseTitle}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{doc.size}</td>
                  <td className="px-6 py-4 text-gray-600">{doc.uploadedAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  }
