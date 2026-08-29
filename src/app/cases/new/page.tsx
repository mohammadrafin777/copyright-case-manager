'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export default function NewCasePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    caseNumber: '',
    clientName: '',
    type: '',
    status: 'pending',
    description: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to create case.');
        setLoading(false);
        return;
      }

      router.push('/cases');
      router.refresh();
    } catch {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="mb-6">
        <Link href="/cases" className="text-sm text-blue-600 hover:text-blue-700">
          &larr; Back to Cases
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900">Create New Case</h1>
        <p className="mt-1 text-sm text-gray-600">Fill in the details to create a new case</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border bg-white p-6 shadow-sm">
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <div className="space-y-2">
          <Label htmlFor="title">Case Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Smith v. Johnson"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="caseNumber">Case Number</Label>
            <Input
              id="caseNumber"
              name="caseNumber"
              placeholder="CV-2024-001"
              value={form.caseNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              name="clientName"
              placeholder="Robert Smith"
              value={form.clientName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Case Type</Label>
            <Select onValueChange={(value) => setForm({ ...form, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civil">Civil</SelectItem>
                <SelectItem value="criminal">Criminal</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select defaultValue="pending" onValueChange={(value) => setForm({ ...form, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Brief description of the case..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link href="/cases">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Case'}
          </Button>
        </div>
      </form>
    </div>
  );
              }
