
import React, { useState } from 'react';
import { SparklesIcon, SunIcon, MoonIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, isDarkMode, toggleTheme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Normalize: Trim whitespace and convert username to lowercase to handle mobile auto-caps
    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Get credentials from environment variables (fallback to defaults for development)
    const adminUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin';
    const userUser = process.env.NEXT_PUBLIC_USER_USERNAME || 'user';
    const userPass = process.env.NEXT_PUBLIC_USER_PASSWORD || 'user';

    // Check credentials
    if (cleanUsername === adminUser.toLowerCase() && cleanPassword === adminPass) {
      onLogin('admin');
    } else if (cleanUsername === userUser.toLowerCase() && cleanPassword === userPass) {
      onLogin('user');
    } else if (cleanUsername === 'member' && cleanPassword === 'member') {
      onLogin('user');
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Theme Toggle (Top Right) */}
      <div className="absolute top-6 right-6">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all text-sm font-bold text-slate-600 dark:text-slate-300"
        >
          {isDarkMode ? <SunIcon className="h-4 w-4 text-amber-400" /> : <MoonIcon className="h-4 w-4 text-indigo-400" />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="w-full max-w-md p-8 m-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 dark:border-slate-700/50 animate-fade-in-up">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30 mb-4">
            <SparklesIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-indigo-400 dark:to-cyan-400 tracking-tight mb-2">
            PoseArchitect<span className="font-light text-slate-400 dark:text-slate-500">.AI</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Professional AI Concept Studio</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              placeholder="Enter username"
              autoCapitalize="none"
              autoCorrect="off"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect="off"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-500 text-sm text-center font-medium animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            Access Studio
            <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-600">
            Authorized personnel only.
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
