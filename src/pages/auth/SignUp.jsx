
import { Link } from 'react-router-dom'
import DarkModeToggle from '../../components/DarkModeToggle'
import { IconEye, IconEyeOff } from '../../components/Icon'
import { useState } from 'react'

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all dark:bg-slate-800/50 dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-800 dark:focus:ring-indigo-400'

const labelClass = 'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5'
const sectionTitle = 'text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3'

export default function SignUp() {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="w-full lg:w-1/2 flex flex-col items-center flex-1 min-w-0 overflow-y-auto scrollbar-hide py-8 px-4 sm:px-8">
        <div className="w-full max-w-xl flex justify-end mb-4">
          <DarkModeToggle />
        </div>
        <div className="w-full max-w-xl">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create account</h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">All HTML input types in one form</p>

            <form className="mt-8 space-y-8">
              <section>
                <h2 className={sectionTitle}>Basic info</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className={labelClass}>Full name</label>
                    <input
                      id="name"
                      name="name" type="text"
                      placeholder="Alex Johnson"
                      className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="password" className={labelClass}>Password</label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        className={inputClass + ' pr-12'}
                        placeholder="••••••••"
                        aria-describedby="password-toggle"
                      />
                      <button
                        id="password-toggle"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-slate-700 dark:text-slate-400"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <IconEyeOff className="w-5 h-5 text-slate-700" /> : <IconEye className="w-5 h-5 text-slate-700" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="age" className={labelClass}>Age</label>
                  <input
                    id="age"
                    name="age"
                    type="text"
                    placeholder="25"
                    className={inputClass} />
                </div>
              </section>

              <section>
                <h2 className={sectionTitle}>Contact</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="tel" className={labelClass}>Phone</label>
                    <input
                      id="tel"
                      name="tel"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="search" className={labelClass}>How did you find us? (search)</label>
                    <input
                      id="search"
                      name="search"
                      type="search"
                      placeholder="Search..."
                      className={inputClass} />
                  </div>
                </div>
              </section>

              <section>
                <h2 className={sectionTitle}>Date & time</h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="dob" className={labelClass}>Date of birth</label>
                    <input
                      id="dob"
                      name="dob"
                      type="date"
                      className={inputClass} />
                  </div>
                </div>
              </section>

              <section>
                <div className="space-y-3">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      I agree to the <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                </div>
              </section>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 transition-all"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/signin" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 flex-shrink-0 h-screen bg-linear-to-br from-indigo-600 via-violet-600 to-purple-700 p-12 flex-col justify-center">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Create account</h2>
          <p className="mt-3 text-white/80 text-lg max-w-sm">
            Create an account to get started.
          </p>
        </div>
        <p className="text-white/60 text-sm">Secure account creation • Your data stays private</p>
      </div>
    </div>
  )
}
