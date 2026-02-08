import { Link, useNavigate } from 'react-router-dom'
import DarkModeToggle from '../../components/DarkModeToggle'
import { IconEye, IconEyeOff } from '../../components/Icon'
import { useState } from 'react'
import { useMessage } from '../../hook/useMessage'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/constnt'
import { calculateAge } from '../../utils/helper'

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all dark:bg-slate-800/50 dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-800 dark:focus:ring-indigo-400'

const labelClass = 'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5'
const sectionTitle = 'text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3'

export default function SignUp() {

  const [showPassword, setShowPassword] = useState(false)
  const { messageSuccess } = useMessage()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    age: '',
    phone: '',
    search: '',
    dateOfBirth: '',
    termsAccepted: false
  })

  const [validation, setValidation] = useState({
    fullName: false,
    email: false,
    password: false,
    age: false,
    phone: false,
    dateOfBirth: false,
    ageDoNotMatch: false,
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
      ageDoNotMatch: false
    }))
  }

  const handleDateOfBirthChange = (event) => {
    const { value } = event.target

    if (value) {
      const calculatedAge = calculateAge(value)

      setFormData((prev) => ({
        ...prev,
        dateOfBirth: value,
        age: calculatedAge.toString()
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        dateOfBirth: value
      }))
    }

    setValidation((prev) => ({
      ...prev,
      dateOfBirth: false,
      age: false,
      ageDoNotMatch: false
    }))
  }

  const checkValidation = () => {
    const today = new Date()
    const dob = new Date(formData.dateOfBirth)

    if (!formData.fullName) {
      return setValidation((prev) => ({
        ...prev,
        fullName: true
      }))
    }
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
    if (!formData.age) {
      return setValidation((prev) => ({
        ...prev,
        age: true
      }))
    }
    if (!formData.phone) {
      return setValidation((prev) => ({
        ...prev,
        phone: true
      }))
    }
    if (!formData.dateOfBirth || dob > today) {
      return setValidation(prev => ({
        ...prev,
        dateOfBirth: true
      }))
    }

    const calculatedAge = calculateAge(formData.dateOfBirth)
    if (parseInt(formData.age) !== calculatedAge) {
      return setValidation(prev => ({
        ...prev,
        ageDoNotMatch: true
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

    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({
      email: formData.email.trim(),
      password: formData.password.trim()
    });

    localStorage.setItem("users", JSON.stringify(users));

    messageSuccess("Signup Successful");
    navigate("/sign-in");
  };

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="w-full lg:w-1/2 flex flex-col items-center flex-1 min-w-0 overflow-y-auto scrollbar-hide py-8 px-4 sm:px-8 overflow-auto ">
        <div className="w-full max-w-xl flex justify-end mb-4">
          <DarkModeToggle />
        </div>
        <div className="w-full max-w-xl over ">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create account</h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">All HTML input types in one form</p>

            <form className="mt-8 space-y-8" onSubmit={(e) => {
              e.preventDefault()
              checkValidation()
            }} >
              <section>
                <h2 className={sectionTitle}>Basic info</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 relative">
                    <label htmlFor="fullName" className={labelClass}>Full name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Alex Johnson"
                      className={inputClass}
                      value={formData.fullName}
                      onChange={handleInputChange}
                      autoComplete={false}
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
                    ${validation.fullName ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}
                  `}
                    >
                      {validation.fullName ? 'Please enter your full name' : ''}
                      <span className="absolute -top-1 left-4 w-2 h-2 bg-[#ffebeb] border-t border-l border-[#FF5C5C] transform rotate-45" />
                    </p>
                  </div>
                  <div className='relative' >
                    <label htmlFor="email" className={labelClass}>Email</label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="name@company.com"
                      className={inputClass}
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete={false}
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
                      {validation.email && !formData.email ? 'Please enter your email' : 'Please valid email'}
                      <span className="absolute -top-1 left-4 w-2 h-2 bg-[#ffebeb] border-t border-l border-[#FF5C5C] transform rotate-45" />
                    </p>
                  </div>
                  <div className='relative' >
                    <label htmlFor="password" className={labelClass}>Password</label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        className={inputClass + ' pr-12'}
                        placeholder="••••••••"
                        aria-describedby="password-toggle"
                        value={formData.password}
                        onChange={handleInputChange}
                        autoComplete={false}
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
                </div>
                <div className="mt-4 relative ">
                  <label htmlFor="age" className={labelClass}>Age</label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="25"
                    className={inputClass}
                    value={formData.age}
                    onChange={handleInputChange}
                    autoComplete={false}
                    min="1"
                    max="120"
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
                    ${validation.age ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}
                  `}
                  >
                    {validation.age && !formData.age ? 'Please enter your age' : ''}
                    <span className="absolute -top-1 left-4 w-2 h-2 bg-[#ffebeb] border-t border-l border-[#FF5C5C] transform rotate-45" />
                  </p>
                  <p
                    className={`
                    absolute top-full left-0 z-50 mt-2

                    bg-[#ffebeb] border border-[#FF5C5C] rounded shadow-lg

                    px-3 py-1.5
                    sm:text-xs text-[11px] text-[#FF5C5C] 

                    max-w-[250px]
                    w-fit

                    transition-all duration-300 ease-out transform
                    ${validation.ageDoNotMatch ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}
                  `}
                  >
                    {validation.ageDoNotMatch ? 'Age does not match with date of birth' : ''}
                    <span className="absolute -top-1 left-4 w-2 h-2 bg-[#ffebeb] border-t border-l border-[#FF5C5C] transform rotate-45" />
                  </p>
                </div>
              </section>

              <section>
                <h2 className={sectionTitle}>Contact</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className='relative' >
                    <label htmlFor="phone" className={labelClass}>Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="+1 234 567 8900"
                      className={inputClass}
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9+\s-]/g, '');
                        handleInputChange({ target: { name: 'phone', value } });
                      }}
                      autoComplete="off"
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
                    ${validation.phone ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}
                  `}
                    >
                      {validation.phone && !formData.phone ? 'Please enter your phone number ' : ''}
                      <span className="absolute -top-1 left-4 w-2 h-2 bg-[#ffebeb] border-t border-l border-[#FF5C5C] transform rotate-45" />
                    </p>
                  </div>
                  <div className='' >
                    <label htmlFor="search" className={labelClass}>How did you find us? (search)</label>
                    <input
                      id="search"
                      name="search"
                      type="search"
                      placeholder="Search..."
                      className={inputClass}
                      value={formData.search}
                      onChange={handleInputChange}
                      autoComplete={false}
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className={sectionTitle}>Date & time</h2>
                <div className="flex flex-col gap-4">
                  <div className='relative' >
                    <label htmlFor="dateOfBirth" className={labelClass}>Date of birth</label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      className={inputClass}
                      value={formData.dateOfBirth}
                      onChange={handleDateOfBirthChange}
                      max={new Date().toISOString().split('T')[0]}
                      autoComplete={false}
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
                    ${validation.dateOfBirth ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}
                  `}
                    >
                      {validation.dateOfBirth && !formData.dateOfBirth ? 'Please enter your date Of Birth' : ''}
                      <span className="absolute -top-1 left-4 w-2 h-2 bg-[#ffebeb] border-t border-l border-[#FF5C5C] transform rotate-45" />
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="space-y-3">
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
              <Link to="/sign-in" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
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