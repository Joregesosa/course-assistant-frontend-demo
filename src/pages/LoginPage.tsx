import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginHeader } from '../components/LoginHeader'
import { SessionUser } from '../types/chat.types'

export function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', contact_guid: '' })
  const [errors, setErrors] = useState({ name: false, contact_guid: false })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newErrors = {
      name: !form.name.trim(),
      contact_guid: !form.contact_guid.trim(),
    }
    setErrors(newErrors)
    if (newErrors.name || newErrors.contact_guid) return

    const session: SessionUser = {
      name: form.name.trim(),
      contact_guid: form.contact_guid.trim(),
    }
    sessionStorage.setItem('session', JSON.stringify(session))
    navigate('/chat')
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      <LoginHeader />

      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background accent shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md z-10">
          {/* Login Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-primary via-primary to-accent" />
            <div className="p-8 lg:p-10">
              <div className="flex justify-center mb-8">
                <div className="size-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary dark:text-slate-200">
                  <span className="material-symbols-outlined text-4xl">smart_toy</span>
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-slate-900 dark:text-slate-50 text-2xl lg:text-3xl font-bold mb-3 tracking-tight">
                  Welcome!
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  Please enter your{' '}
                  <span className="font-semibold text-primary dark:text-slate-300">
                    Contact GUID
                  </span>{' '}
                  to start your session with our assistant.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="full-name"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300 px-1"
                  >
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                        person
                      </span>
                    </div>
                    <input
                      id="full-name"
                      name="full-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className={`w-full pl-11 pr-4 py-4 rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium ${
                        errors.name
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[11px] text-red-500 px-1">Full name is required.</p>
                  )}
                </div>

                {/* Contact GUID */}
                <div className="space-y-2">
                  <label
                    htmlFor="guid"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300 px-1"
                  >
                    Contact GUID
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                        fingerprint
                      </span>
                    </div>
                    <input
                      id="guid"
                      name="guid"
                      type="text"
                      placeholder="Enter your unique ID"
                      value={form.contact_guid}
                      onChange={(e) => setForm((f) => ({ ...f, contact_guid: e.target.value }))}
                      className={`w-full pl-11 pr-4 py-4 rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium ${
                        errors.contact_guid
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.contact_guid ? (
                    <p className="text-[11px] text-red-500 px-1">Contact GUID is required.</p>
                  ) : (
                    <p className="text-[11px] text-slate-500 px-1">
                      Your GUID can be found in your student portal under profile settings.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-[#e6a619] text-primary font-bold py-4 px-6 rounded-lg transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <span>Start Chat</span>
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Need help?{' '}
                  <a href="#" className="text-primary dark:text-slate-300 font-bold hover:underline">
                    Contact Support
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className="mt-6 flex justify-center gap-6 text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <span className="size-1 rounded-full bg-slate-300 mt-1" />
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 px-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          © 2024 BYU-Pathway Worldwide. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-primary/60 dark:text-slate-400 font-bold text-xs">
          <span className="material-symbols-outlined text-sm">bolt</span>
          <span>POWERED BY COPILOT STUDIO</span>
        </div>
      </footer>
    </div>
  )
}
