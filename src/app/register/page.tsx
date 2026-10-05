'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
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

    // Get projects for this branch
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

    // Save to session for result page
    saveToSession('registration', registration);
    saveToSession('joinCode', joinCode);

    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/result');
  };

  return (
    <main className="min-h-screen px-4 py-8 md:py-16">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Almost there! 🎯
          </h1>
          <p className="text-neutral-400">
            Register to build your first AI project and compete for your college
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* College */}
          <div>
            <label className="block text-sm font-medium mb-2">College</label>
            <select
              value={formData.college}
              onChange={e => setFormData({ ...formData, college: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
            >
              <option value="">Select your college</option>
              {tamilNaduColleges.map(college => (
                <option key={college.id} value={college.name}>
                  {college.name}
                </option>
              ))}
            </select>
            {errors.college && <p className="text-red-400 text-sm mt-1">{errors.college}</p>}
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium mb-2">Branch</label>
            <select
              value={formData.branch}
              onChange={e => setFormData({ ...formData, branch: e.target.value as Branch })}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
            >
              <option value="">Select your branch</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            {errors.branch && <p className="text-red-400 text-sm mt-1">{errors.branch}</p>}
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
            <div className="flex">
              <span className="px-4 py-3 bg-neutral-700 border border-neutral-600 border-r-0 rounded-l-xl text-neutral-400">
                +91
              </span>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-r-xl focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="9876543210"
                maxLength={10}
              />
            </div>
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            <p className="text-neutral-500 text-xs mt-1">
              You&apos;ll verify via WhatsApp to get your workshop link
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-700 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Registering...
              </>
            ) : (
              'Register & Get My Spot'
            )}
          </button>

          <p className="text-center text-neutral-500 text-xs">
            By registering, you agree to receive workshop updates on WhatsApp
          </p>
        </form>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
