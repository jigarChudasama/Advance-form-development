import { Link } from 'react-router-dom'
import DarkModeToggle from '../../components/DarkModeToggle'
import { IconGoogle } from '../../components/Icon'

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all dark:bg-slate-800/50 dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-800 dark:focus:ring-indigo-400'

export default function SignIn() {
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-violet-600 via-indigo-600 to-blue-700 p-12 flex-col justify-center">
        <div >
          <h2 className="text-3xl font-bold text-white tracking-tight">Welcome back</h2>
          <p className="mt-3 text-white/80 text-lg max-w-sm">
            Sign in to continue to your account and pick up where you left off.
          </p>
        </div>
        <p className="text-white/60 text-sm">Secure sign in • Your data stays private</p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-4 lg:mb-8">
            <DarkModeToggle />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sign in</h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">Enter your credentials to access your account</p>

            <div className="mt-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm"
              >
                <IconGoogle className="w-5 h-5" />
                Continue with Google
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-600" />
              <span className="text-slate-400 text-sm font-medium">or continue with email</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-600" />
            </div>

            <form className="mt-6 space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={inputClass}
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 text-sm">
                <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500" />
                Remember me for 30 days
              </label>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 transition-all"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
