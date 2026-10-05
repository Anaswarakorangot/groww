'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { mockATSScore, saveToSession } from '@/lib/store';
import { ATSResult } from '@/types';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || 'ORGANIC';

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = mockATSScore(file || undefined);
    setAtsResult(result);
    saveToSession('atsResult', result);
    saveToSession('refCode', refCode);
    setShowResult(true);
    setLoading(false);
  };

  const handleSkip = () => {
    saveToSession('refCode', refCode);
    router.push('/register');
  };

  const proceedToRegister = () => {
    router.push('/register');
  };

  return (
    <main className="min-h-screen px-4 py-8 md:py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm mb-4">
            Free Workshop · 60 Minutes · Build Real AI
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Is Your Resume{' '}
            <span className="text-orange-500">ATS-Ready?</span>
          </h1>
          <p className="text-neutral-400 text-lg">
            Get your score in 60 seconds. See exactly what&apos;s missing.
          </p>
        </div>

        {!showResult ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8">
            <div className="border-2 border-dashed border-neutral-700 rounded-xl p-8 text-center hover:border-orange-500/50 transition-colors">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                {file ? (
                  <p className="text-white font-medium">{file.name}</p>
                ) : (
                  <>
                    <p className="text-white font-medium mb-1">Upload your resume (PDF)</p>
                    <p className="text-neutral-500 text-sm">Click or drag and drop</p>
                  </>
                )}
              </label>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="w-full mt-6 py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-700 disabled:cursor-not-allowed rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Check My ATS Score'
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-neutral-900 text-neutral-500">or</span>
              </div>
            </div>

            <button
              onClick={handleSkip}
              className="w-full py-3 border border-neutral-700 hover:border-neutral-600 rounded-xl text-neutral-400 hover:text-white transition-colors"
            >
              No resume yet? Skip to register →
            </button>

            <p className="text-center text-neutral-600 text-xs mt-4">
              Your resume is processed securely and not stored. We only save your score and suggestions.
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-slide-up">
            {/* Score Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center">
              <p className="text-neutral-400 mb-2">Your ATS Readiness Score</p>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#262626" strokeWidth="8" fill="none" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={atsResult!.score >= 70 ? '#14b8a6' : atsResult!.score >= 50 ? '#f97316' : '#ef4444'}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(atsResult!.score / 100) * 352} 352`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{atsResult!.score}</span>
                </div>
              </div>
              <p className="text-sm text-neutral-500">
                Score based on formatting, keywords, and structure. Not an official ATS rating.
              </p>
            </div>

            {/* Gaps */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="text-red-400">⚠</span> Top 3 Gaps to Fix
              </h3>
              <ul className="space-y-3">
                {atsResult!.gaps.map((gap, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-300">
                    <span className="text-red-400 mt-0.5">•</span>
                    {gap}
                  </li>
                ))}
              </ul>
            </div>

            {/* Project Suggestions */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="text-teal-400">✨</span> AI Projects That Fix Your Gaps
              </h3>
              <div className="space-y-4">
                {atsResult!.projects.map((project, i) => (
                  <div key={i} className={`p-4 rounded-xl ${i === 0 ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-neutral-800/50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {i === 0 && <span className="px-2 py-0.5 bg-orange-500 text-xs rounded font-medium">BUILD THIS</span>}
                      <h4 className="font-medium">{project.title}</h4>
                    </div>
                    <p className="text-sm text-neutral-400 mb-2">{project.description}</p>
                    <p className="text-xs text-teal-400">
                      📝 Resume bullet: &quot;{project.resumeBullet}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={proceedToRegister}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-xl font-semibold text-lg transition-colors animate-pulse-glow"
            >
              Build Project #1 Free in 60 Minutes →
            </button>

            <p className="text-center text-neutral-500 text-sm">
              Register now and get a free ATS-optimized resume template
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
