import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth.config';
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  CalendarDays,
  FileText,
  LogOut,
  Scale
} from 'lucide-react';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Cases', href: '/cases', icon: FolderOpen },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Hearings', href: '/hearings', icon: CalendarDays },
  { name: 'Documents', href: '/documents', icon: FileText }
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-900 text-white">
        <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-6">
          <Scale className="h-6 w-6 text-blue-400" />
          <span className="text-lg font-bold">LegalFlow</span>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 p-4">
          <a
            href="/api/auth/signout"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        <header className="flex h-16 items-center justify-between border-b bg-white px-8">
          <h1 className="text-xl font-semibold text-gray-900">
            Welcome back, {session.user.name}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{session.user.email}</span>
          </div>
        </header>

        <div className="p-8">
          <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
          <p className="mt-2 text-gray-600">
            Here you&apos;ll be able to see an overview of your cases, upcoming hearings,
            and recent activity.
          </p>
        </div>
      </main>
    </div>
  );
    }
