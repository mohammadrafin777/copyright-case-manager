'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to create client.');
        setLoading(false);
        return;
      }

      router.push('/clients');
      router.refresh();
    } catch {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="mb-6">
        <Link href="/clients" className="text-sm text-blue-600 hover:text-blue-700">
          &larr; Back to Clients
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900">Add New Client</h1>
        <p className="mt-1 text-sm text-gray-600">Enter the client&apos;s contact information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border bg-white p-6 shadow-sm">
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="(555) 123-4567"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Acme Corp"
              value={form.company}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="123 Main St"
              value={form.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link href="/clients">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Add Client'}
          </Button>
        </div>
      </form>
    </div>
  );
        }
