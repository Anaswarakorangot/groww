'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { getTotalVerified } from '@/lib/store';

function HomeContent() {
  const [totalRegistered, setTotalRegistered] = useState(127);

  useEffect(() => {
    setTotalRegistered(getTotalVerified() + 127);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute top-0 -left-40 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-teal-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-orange-600/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-lg">
              AI
            </div>
            <span className="font-semibold text-lg hidden sm:block">Build-Off</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/board" className="text-neutral-400 hover:text-white transition-colors text-sm">
              Leaderboard
            </Link>
            <Link href="/check" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium text-sm transition-all hover:scale-105">
              Register Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-teal-500/10 border border-orange-500/20 rounded-full mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-neutral-300">{totalRegistered} students registered</span>
            <span className="text-neutral-600">•</span>
            <span className="text-sm text-orange-400">Limited to 500 seats</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build Your First{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-teal-400 bg-clip-text text-transparent">
                AI Project
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 4 150 2 298 8" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316"/>
                    <stop offset="100%" stopColor="#14b8a6"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <br />
            <span className="text-neutral-400">in 60 Minutes</span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            Free hands-on workshop for final-year engineering students.
            No experience needed. Walk away with a <span className="text-white">working AI project</span> and
            a <span className="text-white">resume that stands out</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/check"
              className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 flex items-center justify-center gap-2"
            >
              Check Your Resume & Register
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/board"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
            >
              <span>🏆</span> View Leaderboard
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Free
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No Experience Needed
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Certificate Included
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Does This Sound Like You?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: '😰',
                title: 'Stuck in Tutorial Hell',
                desc: 'Watched 100 YouTube videos but never built anything real you can show'
              },
              {
                emoji: '📄',
                title: 'Empty Resume',
                desc: 'No AI/ML projects to talk about in interviews while everyone else has them'
              },
              {
                emoji: '⏰',
                title: 'Running Out of Time',
                desc: 'Placements are coming. Capstone is due. You need something NOW'
              }
            ].map((item, i) => (
              <div key={i} className="group p-6 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl hover:border-orange-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Build Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-orange-500/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm mb-4">
              Hands-On Workshop
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What You&apos;ll Build
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Choose a project based on your branch. Each one is designed to impress recruiters.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { branch: 'CSE / IT', project: 'AI Resume Screener', icon: '🤖', desc: 'Chatbot that matches resumes to job descriptions' },
              { branch: 'ECE', project: 'Sensor Fault Detector', icon: '📡', desc: 'ML model that detects anomalies in sensor data' },
              { branch: 'EEE', project: 'Load Forecasting', icon: '⚡', desc: 'Predict campus building energy consumption' },
              { branch: 'MECH', project: 'Predictive Maintenance', icon: '⚙️', desc: 'Predict machine failures from vibration data' },
              { branch: 'CIVIL', project: 'Crack Detection', icon: '🏗️', desc: 'Computer vision to find cracks in site photos' },
              { branch: 'All Branches', project: 'Your Choice', icon: '✨', desc: 'Get personalized suggestions based on your resume' },
            ].map((item, i) => (
              <div key={i} className="group p-5 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-teal-500/30 transition-all hover:bg-neutral-900">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="px-2 py-0.5 bg-neutral-800 rounded text-xs text-neutral-400">{item.branch}</span>
                </div>
                <h3 className="font-semibold mb-1">{item.project}</h3>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* College Competition Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm mb-4">
                🏆 College Competition
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Put Your College on the Map
              </h2>
              <p className="text-neutral-400 mb-6">
                30 Tamil Nadu colleges are competing for the top spot. Every registration counts toward your college&apos;s rank.
                Help your college win bragging rights!
              </p>
              <ul className="space-y-3">
                {[
                  'Live leaderboard updated in real-time',
                  'Top 3 colleges get featured shoutout',
                  'Share your rank card with friends',
                  'Compete for campus pride'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-300">
                    <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/board" className="inline-flex items-center gap-2 mt-6 text-teal-400 hover:text-teal-300 transition-colors">
                View Live Leaderboard
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Mini Leaderboard Preview */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Top Colleges</h3>
                <span className="text-xs text-neutral-500">Live</span>
              </div>
              <div className="space-y-3">
                {[
                  { rank: 1, name: 'Anna University', count: 18, emoji: '🥇' },
                  { rank: 2, name: 'PSG Tech', count: 15, emoji: '🥈' },
                  { rank: 3, name: 'SSN College', count: 14, emoji: '🥉' },
                  { rank: 4, name: 'TCE Madurai', count: 11, emoji: '' },
                  { rank: 5, name: 'Kongu Engineering', count: 10, emoji: '' },
                ].map((college) => (
                  <div key={college.rank} className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-xl">
                    <span className="w-8 text-center">
                      {college.emoji || `#${college.rank}`}
                    </span>
                    <span className="flex-1 truncate">{college.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
                          style={{ width: `${(college.count / 20) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-neutral-500 w-8">{college.count}/20</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-neutral-500 mt-4">
                Is your college here? Register to add your name!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Details */}
      <section className="py-20 px-4 bg-gradient-to-b from-teal-500/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Workshop Details
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📅', label: 'Date', value: 'This Weekend', sub: 'Saturday & Sunday' },
              { icon: '⏱️', label: 'Duration', value: '60 Minutes', sub: 'Fully hands-on' },
              { icon: '💰', label: 'Price', value: 'FREE', sub: 'No hidden costs' },
              { icon: '🎓', label: 'Certificate', value: 'Included', sub: 'Add to LinkedIn' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-xl font-bold text-white">{item.value}</p>
                <p className="text-sm text-neutral-400">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-orange-500/10 via-transparent to-teal-500/10 border border-orange-500/20 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="text-4xl mb-4 block">🎁</span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Free Bonuses When You Register
              </h2>
              <p className="text-neutral-400">Worth ₹2,000+ — Yours free</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '📝', title: 'ATS Resume Check', desc: 'Get your ATS score and see what\'s missing' },
                { icon: '📄', title: 'ATS Resume Template', desc: 'Optimized template that passes screening' },
                { icon: '💡', title: 'AI Project Ideas', desc: '3 personalized project suggestions for your branch' },
                { icon: '🏅', title: 'Completion Certificate', desc: 'Add to your resume and LinkedIn profile' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-black/20 rounded-xl">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Build Your First AI Project?
          </h2>
          <p className="text-neutral-400 mb-8 text-lg">
            Join {totalRegistered}+ students. Only {500 - totalRegistered} seats left.
          </p>

          <Link
            href="/check"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-semibold text-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
          >
            Get Started — It&apos;s Free
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <p className="text-neutral-500 text-sm mt-6">
            Takes 2 minutes · No payment required · Instant access
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <p>© 2024 College Build-Off. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/board" className="hover:text-white transition-colors">Leaderboard</Link>
            <Link href="/check" className="hover:text-white transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
