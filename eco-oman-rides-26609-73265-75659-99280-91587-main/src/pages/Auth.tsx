import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/backend';
import { getRouteForRole } from '@/lib/roleRoutes';

const auth = {
  signInWithGoogle: async () => {
    return await supabase.auth.signInWithOAuth({ provider: 'google' });
  },
  signInWithEmail: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  signUpWithEmail: async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        email,
        name,
        wallet_balance: 0,
        eco_credits: 0,
        total_rides: 0,
        rating: 5.0
      });
    }
    return { data, error };
  }
};

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await auth.signInWithEmail(email, password);
        if (error) throw error;
      } else {
        const { error } = await auth.signUpWithEmail(email, password, name);
        if (error) throw error;
      }
      const role = localStorage.getItem('userRole');
      const target = getRouteForRole(role);
      navigate(target);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
    const { error } = await auth.signInWithGoogle();
    if (error) throw error;
    const role = localStorage.getItem('userRole');
    const target = getRouteForRole(role);
    navigate(target);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1810] via-[#0d1f15] to-[#0a0f1a] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-emerald-500/20 relative overflow-hidden">
          {/* Card glow effect */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              ECpool360
            </h1>
            <p className="text-slate-400 mb-8 text-center text-lg">
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl py-3 font-semibold disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
            >
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-slate-900/70 text-slate-400">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-4 w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-slate-700/50 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              type="button"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
