import { Link } from 'react-router-dom'
import { useState } from 'react'
import DarkModeToggle from '../../components/DarkModeToggle'
import { IconGoogle, IconEye, IconEyeOff } from '../../components/Icon'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/constnt'
import { useMessage } from '../../hook/useMessage'

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all dark:bg-slate-800/50 dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-800 dark:focus:ring-indigo-400'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const { messageSuccess } = useMessage()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    termsAccepted: false
  })

  const [validation, setValidation] = useState({
    email: false,
    password: false,
    termsAccepted: false
  })

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setValidation((prev) => ({
      ...prev,
      [name]: false,
    }))
  }

  const checkValidation = () => {
    if (!formData.email || !EMAIL_REGEX.test(formData.email)) {
      return setValidation((prev) => ({
        ...prev,
        email: true
      }))
    }
    if (!formData.password || !PASSWORD_REGEX.test(formData.password)) {
      return setValidation((prev) => ({
        ...prev,
        password: true
      }))
    }
    if (!formData.termsAccepted) {
      return setValidation(prev => ({
        ...prev,
        termsAccepted: true
      }))
    }

    handleSubmit()
  }

  const handleSubmit = () => {
    // console.log('user logged in', formData)
    messageSuccess("sign in Successful")
  }

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

            <form className="mt-6 space-y-5" onSubmit={(e) => {
              e.preventDefault()
              checkValidation()
            }} >
              <div className='relative' >
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className={inputClass}
                  placeholder="name@company.com"
                  onChange={handleInputChange}
                />
                <p
                  className={`
                    absolute top-full left-0 z-50 mt-2

                    bg-[#ffebeb] border border-[#FF5C5C] rounded shadow-lg

                    px-3 py-1.5
                    sm:text-xs text-[11px] text-[#FF5C5C] 

                    max-w-[250px]
                    w-fit

                    transition-all duration-300 ease-out transform
                    ${validation.email ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}
                  `}
                >
                  {validation.email && !formData.email ? 'Please enter your email' : 'Please enter a valid email'}
                  <span className="absolute -top-1 left-4 w-2 h-2 bg-[#ffebeb] border-t border-l border-[#FF5C5C] transform rotate-45" />
                </p>
              </div>
              <div className='relative' >
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className={inputClass + ' pr-12'}
                    placeholder="••••••••"
                    aria-describedby="password-toggle"
                    onChange={handleInputChange}
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
                <p
                  className={`
                    absolute top-full left-0 z-50 mt-2

                    bg-[#ffebeb] border border-[#FF5C5C] rounded shadow-lg

                    px-3 py-1.5
                    sm:text-xs text-[11px] text-[#FF5C5C] 

                    max-w-[250px]
                    w-fit

                    transition-all duration-300 ease-out transform
                    ${validation.password ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}
                  `}
                >
                  {validation.password && !formData.password ? 'Please enter your password' : 'Please enter strong password'}
                  <span className="absolute -top-1 left-4 w-2 h-2 bg-[#ffebeb] border-t border-l border-[#FF5C5C] transform rotate-45" />
                </p>
              </div>
              <div className='relative' >
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  I agree to the <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</a>
                </span>
              </label>
              <p
                className={`
                    bg-[#ffebeb] border border-[#FF5C5C] rounded shadow-lg

                    px-3 py-1.5
                    sm:text-xs text-[11px] text-[#FF5C5C] 

                    max-w-[350px]
                    w-fit

                    transition-all duration-300 ease-out transform
                    ${validation.termsAccepted ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}
                  `}
              >
                {validation.termsAccepted ? 'You must accept the terms and conditions' : ''}
              </p>
              </div>
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
