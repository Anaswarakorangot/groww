'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { mockATSScore, saveToSession } from '@/lib/store';
import { ATSResult } from '@/types';
import Link from 'next/link';

function CheckContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || 'ORGANIC';

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      }
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2500));

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
    <main className="min-h-screen bg-[#030303] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-[100px]" />
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
        <div className="max-w-xl mx-auto">
          {!showResult ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  <span className="text-sm text-orange-400">Free Resume Analysis</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  Is Your Resume{' '}
                  <span className="bg-gradient-to-r from-orange-400 to-teal-400 bg-clip-text text-transparent">
                    ATS-Ready?
                  </span>
                </h1>
                <p className="text-neutral-400 text-lg max-w-md mx-auto">
                  Upload your resume and get your ATS readiness score with personalized AI project suggestions
                </p>
              </div>

              {/* Upload Card */}
              <div className="bg-gradient-to-b from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all ${
                    dragActive
                      ? 'border-orange-500 bg-orange-500/5'
                      : file
                        ? 'border-teal-500/50 bg-teal-500/5'
                        : 'border-neutral-700 hover:border-neutral-600'
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  {file ? (
                    <div className="animate-slide-up">
                      <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-white font-semibold text-lg mb-1">{file.name}</p>
                      <p className="text-neutral-500 text-sm">Click or drop to change file</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-white font-semibold text-lg mb-1">Upload your resume</p>
                      <p className="text-neutral-500">PDF format • Click or drag and drop</p>
                    </>
                  )}
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={!file || loading}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-neutral-700 disabled:to-neutral-700 disabled:cursor-not-allowed rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/20 disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Analyzing your resume...
                    </>
                  ) : (
                    <>
                      Check My ATS Score
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-800"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-neutral-900 text-neutral-600 text-sm">or</span>
                  </div>
                </div>

                <button
                  onClick={handleSkip}
                  className="w-full py-3 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/50 rounded-xl text-neutral-400 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  No resume yet? Register directly
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Secure & Private
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Resume not stored
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Instant results
                </div>
              </div>
            </>
          ) : (
            /* ATS Results */
            <div className="space-y-6 animate-slide-up">
              {/* Score Card */}
              <div className="bg-gradient-to-b from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-3xl p-8 text-center">
                <p className="text-neutral-400 mb-4">Your ATS Readiness Score</p>
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="#262626" strokeWidth="10" fill="none" />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke={atsResult!.score >= 70 ? '#14b8a6' : atsResult!.score >= 50 ? '#f97316' : '#ef4444'}
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${(atsResult!.score / 100) * 440} 440`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold">{atsResult!.score}</span>
                    <span className="text-neutral-500 text-sm">out of 100</span>
                  </div>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                  atsResult!.score >= 70
                    ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                    : atsResult!.score >= 50
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {atsResult!.score >= 70 ? '✓ Good' : atsResult!.score >= 50 ? '⚠ Needs Work' : '✗ Needs Major Fixes'}
                </div>
                <p className="text-xs text-neutral-600 mt-4">
                  Score based on formatting, keywords, and structure
                </p>
              </div>

              {/* Gaps */}
              <div className="bg-gradient-to-b from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-red-400">⚠</span>
                  </div>
                  Top 3 Gaps to Fix
                </h3>
                <ul className="space-y-3">
                  {atsResult!.gaps.map((gap, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-neutral-800/50 rounded-xl">
                      <span className="w-6 h-6 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0 text-red-400 text-sm font-medium">
                        {i + 1}
                      </span>
                      <span className="text-neutral-300">{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project Suggestions */}
              <div className="bg-gradient-to-b from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-teal-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-teal-400">✨</span>
                  </div>
                  AI Projects That Fix Your Gaps
                </h3>
                <div className="space-y-4">
                  {atsResult!.projects.map((project, i) => (
                    <div
                      key={i}
                      className={`p-5 rounded-xl transition-all ${
                        i === 0
                          ? 'bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-2 border-orange-500/30 shadow-lg shadow-orange-500/5'
                          : 'bg-neutral-800/30 border border-neutral-700/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {i === 0 && (
                          <span className="px-2 py-1 bg-orange-500 text-xs rounded font-bold uppercase">
                            Build This
                          </span>
                        )}
                      </div>
                      <h4 className={`font-semibold text-lg mt-2 ${i === 0 ? 'text-orange-400' : 'text-white'}`}>
                        {project.title}
                      </h4>
                      <p className="text-sm text-neutral-400 mt-1 mb-3">{project.description}</p>
                      <div className="bg-black/30 rounded-lg p-3">
                        <p className="text-xs text-teal-400 flex items-start gap-2">
                          <span>📝</span>
                          <span>Resume bullet: &quot;{project.resumeBullet}&quot;</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={proceedToRegister}
                className="w-full py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-semibold text-xl transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/20 flex items-center justify-center gap-3"
              >
                Build Project #1 Free in 60 Minutes
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <p className="text-center text-neutral-500 text-sm">
                🎁 Register now and get a free ATS-optimized resume template
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function CheckPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CheckContent />
    </Suspense>
  );
}
