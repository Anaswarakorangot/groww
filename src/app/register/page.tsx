'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { tamilNaduColleges, branches, generateJoinCode } from '@/lib/mockData';
import { addRegistration, getFromSession, saveToSession, getProjectsForBranch } from '@/lib/store';
import { ATSResult, Branch } from '@/types';

function RegisterContent() {
  const router = useRouter();
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);
  const [refCode, setRefCode] = useState('ORGANIC');

  const [formData, setFormData] = useState({
    name: '',
    college: '',
    branch: '' as Branch | '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const savedAts = getFromSession<ATSResult>('atsResult');
    const savedRef = getFromSession<string>('refCode');

    if (savedAts) {
      setAtsResult(savedAts);
      setFormData(prev => ({
        ...prev,
        name: savedAts.extractedName || '',
        college: savedAts.extractedCollege || '',
        branch: savedAts.extractedBranch || ''
      }));
    }
    if (savedRef) {
      setRefCode(savedRef);
    }
  }, []);

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 && /^[6-9]/.test(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.college) newErrors.college = 'Select your college';
    if (!formData.branch) newErrors.branch = 'Select your branch';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Enter a valid 10-digit mobile number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    const projects = getProjectsForBranch(formData.branch as Branch);
    const joinCode = generateJoinCode();

    const registration = addRegistration({
      name: formData.name,
      phone: formData.phone.replace(/\D/g, ''),
      college: formData.college,
      branch: formData.branch as Branch,
      refCode,
      atsScore: atsResult?.score,
      gaps: atsResult?.gaps,
      projectSuggestion: projects[0],
      verified: false
    });

    saveToSession('registration', registration);
    saveToSession('joinCode', joinCode);

    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/result');
  };

  return (
    <main className="min-h-screen bg-[#030303] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-sm">
              AI
            </div>
            <span className="font-semibold hidden sm:block">Build-Off</span>
          </Link>
          <Link href="/board" className="text-neutral-400 hover:text-white transition-colors text-sm">
            Leaderboard
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
              <span className="text-3xl">🎯</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Almost there!
            </h1>
            <p className="text-neutral-400 text-lg">
              Register to build your first AI project
            </p>
          </div>

          {/* ATS Score Badge */}
          {atsResult && (
            <div className="bg-gradient-to-r from-orange-500/10 to-teal-500/10 border border-orange-500/20 rounded-xl p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <span className="font-bold text-orange-400">{atsResult.score}</span>
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Your ATS Score</p>
                  <p className="text-white font-medium">Resume analyzed</p>
                </div>
              </div>
              <span className="text-green-400 text-sm">✓</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-gradient-to-b from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-sm">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-neutral-300">
                Full Name
              </label>
              <div className={`relative transition-all ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-4 bg-neutral-800/50 border rounded-xl focus:outline-none transition-all ${
                    errors.name
                      ? 'border-red-500'
                      : focusedField === 'name'
                        ? 'border-orange-500 shadow-lg shadow-orange-500/10'
                        : 'border-neutral-700 hover:border-neutral-600'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* College */}
            <div>
              <label className="block text-sm font-medium mb-2 text-neutral-300">
                College
              </label>
              <div className={`relative transition-all ${focusedField === 'college' ? 'scale-[1.02]' : ''}`}>
                <select
                  value={formData.college}
                  onChange={e => setFormData({ ...formData, college: e.target.value })}
                  onFocus={() => setFocusedField('college')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-4 bg-neutral-800/50 border rounded-xl focus:outline-none transition-all appearance-none cursor-pointer ${
                    errors.college
                      ? 'border-red-500'
                      : focusedField === 'college'
                        ? 'border-orange-500 shadow-lg shadow-orange-500/10'
                        : 'border-neutral-700 hover:border-neutral-600'
                  }`}
                >
                  <option value="">Select your college</option>
                  {tamilNaduColleges.map(college => (
                    <option key={college.id} value={college.name}>
                      {college.name}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {errors.college && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.college}
                </p>
              )}
            </div>

            {/* Branch */}
            <div>
              <label className="block text-sm font-medium mb-2 text-neutral-300">
                Branch
              </label>
              <div className="grid grid-cols-3 gap-2">
                {branches.map(branch => (
                  <button
                    key={branch}
                    type="button"
                    onClick={() => setFormData({ ...formData, branch })}
                    className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                      formData.branch === branch
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                        : 'bg-neutral-800/50 border border-neutral-700 hover:border-neutral-600 text-neutral-300'
                    }`}
                  >
                    {branch}
                  </button>
                ))}
              </div>
              {errors.branch && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.branch}
                </p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-medium mb-2 text-neutral-300">
                WhatsApp Number
              </label>
              <div className={`flex transition-all ${focusedField === 'phone' ? 'scale-[1.02]' : ''}`}>
                <span className="px-4 py-4 bg-neutral-700/50 border border-neutral-600 border-r-0 rounded-l-xl text-neutral-400 font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className={`flex-1 px-4 py-4 bg-neutral-800/50 border rounded-r-xl focus:outline-none transition-all ${
                    errors.phone
                      ? 'border-red-500'
                      : focusedField === 'phone'
                        ? 'border-orange-500 shadow-lg shadow-orange-500/10'
                        : 'border-neutral-700 hover:border-neutral-600'
                  }`}
                  placeholder="9876543210"
                  maxLength={10}
                />
              </div>
              {errors.phone ? (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.phone}
                </p>
              ) : (
                <p className="text-neutral-500 text-xs mt-2 flex items-center gap-1">
                  <span className="text-green-400">📱</span>
                  You&apos;ll verify via WhatsApp to get your workshop link
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-neutral-700 disabled:to-neutral-700 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/20 disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Securing your spot...
                </>
              ) : (
                <>
                  Register & Get My Spot
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-center text-neutral-500 text-xs">
              By registering, you agree to receive workshop updates on WhatsApp
            </p>
          </form>

          {/* Benefits reminder */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Free workshop
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span> ATS template included
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Certificate
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
