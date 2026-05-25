import Link from 'next/link';
import { logout } from './actions';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-cream flex flex-col font-sans">
      <nav className="bg-surface border-b border-brand-border py-4 px-6 flex justify-between items-center">
        <Link href="/admin" className="font-display text-xl font-bold">Admin Dashboard</Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-saffron hover:text-white transition-colors">← Back to Website</Link>
          <form action={logout}>
            <button className="text-sm text-brand-text-dim hover:text-white transition-colors">Sign Out</button>
          </form>
        </div>
      </nav>
      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
