import { Link } from 'react-router-dom'
import DarkModeToggle from '../components/DarkModeToggle'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="absolute top-6 right-6">
        <DarkModeToggle />
      </div>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Home</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Welcome to the app. Neat modern UI with dark mode.</p>
      <nav className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/signin"
          className="px-5 py-2.5 bg-linear-to-r from-indigo-600 to-violet-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all dark:from-indigo-500 dark:to-violet-500"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="px-5 py-2.5 bg-slate-700 dark:bg-slate-600 text-white font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-slate-500 transition-all border border-slate-600 dark:border-slate-500"
        >
          Sign Up
        </Link>
      </nav>
    </div>
  )
}
