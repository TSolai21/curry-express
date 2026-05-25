import Link from 'next/link';
import { logout } from './actions';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-cream flex flex-col font-sans">
      <Toaster position="top-right" toastOptions={{ style: { background: '#1c1c1c', color: '#fef3c7', border: '1px solid #333' } }} />
      <style dangerouslySetInnerHTML={{__html: `
        button, a, input[type="file"], input[type="submit"], select, [role="button"] {
          cursor: pointer !important;
        }
        button:disabled, input:disabled, select:disabled {
          cursor: not-allowed !important;
        }
      `}} />
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
