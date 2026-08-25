import Link from 'next/link';
import { Scale, Briefcase, FileText, CalendarClock } from 'lucide-react';

const features = [
  {
    icon: Scale,
    title: 'Case Tracking',
    description: 'Track every case from filing to resolution with real-time status updates.'
  },
  {
    icon: Briefcase,
    title: 'Client Management',
    description: 'Maintain a complete profile of every client with full case history.'
  },
  {
    icon: CalendarClock,
    title: 'Hearing Schedule',
    description: 'Never miss a hearing with organized scheduling and reminders.'
  },
  {
    icon: FileText,
    title: 'Document Repository',
    description: 'Store and organize all legal documents securely in one place.'
  }
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">LegalFlow</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-gradient-to-b from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Manage Your Legal Practice{' '}
                <span className="text-blue-600">Effortlessly</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                LegalFlow is a comprehensive case management platform that helps law firms
                organize cases, clients, hearings, and documents — all in one place.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/login"
                  className="rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Everything You Need</h2>
              <p className="mt-4 text-lg text-gray-600">
                Powerful tools to streamline your legal workflow
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-lg border p-6 text-center">
                  <feature.icon className="mx-auto h-8 w-8 text-blue-600" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} LegalFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
  }
