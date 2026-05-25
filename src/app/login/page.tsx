import { login } from './actions'

export default async function LoginPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-md bg-surface border border-brand-border rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-cream">Admin Access</h1>
          <p className="text-muted text-sm mt-2">Sign in to manage reviews and offers.</p>
        </div>

        {searchParams?.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6 text-center">
            {searchParams.error}
          </div>
        )}

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-brand-text-dim mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-black border border-brand-border rounded-lg px-4 py-2 text-cream focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-text-dim mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full bg-black border border-brand-border rounded-lg px-4 py-2 text-cream focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button
            formAction={login}
            className="w-full bg-saffron hover:bg-saffron-light text-black font-bold py-3 px-4 rounded-lg transition-colors mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
