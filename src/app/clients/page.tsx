'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

const sampleClients: Client[] = [
  {
    id: '1',
    name: 'Robert Smith',
    email: 'robert.smith@example.com',
    phone: '(555) 123-4567',
    company: 'Smith Industries'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '(555) 987-6543',
    company: 'Garcia Legal'
  },
  {
    id: '3',
    name: 'James Chen',
    email: 'james.chen@example.com',
    phone: '(555) 555-0123',
    company: 'Chen & Associates'
  }
];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // In production, fetch from API
    setClients(sampleClients);
  }, []);

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your client relationships</p>
        </div>
        <Link href="/clients/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Client
          </Button>
        </Link>
      </div>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">
            <Users className="mx-auto mb-2 h-8 w-8 text-gray-300" />
            No clients found.
          </div>
        ) : (
          filtered.map((client) => (
            <div key={client.id} className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                {client.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <h3 className="font-semibold text-gray-900">{client.name}</h3>
              <p className="text-sm text-gray-600">{client.company}</p>
              <div className="mt-4 space-y-1 text-sm text-gray-600">
                <p>{client.email}</p>
                <p>{client.phone}</p>
              </div>
              <Link
                href={`/clients/${client.id}`}
                className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View Profile &rarr;
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
  }
