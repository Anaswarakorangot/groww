'use client';

import { useState, useEffect } from 'react';
import { getColleges, getTotalVerified } from '@/lib/store';
import { College } from '@/types';
import Link from 'next/link';

function SkeletonRow() {
  return (
    <div className="px-4 py-4 flex items-center gap-4 animate-pulse">
      <div className="w-10 h-8 bg-neutral-800 rounded" />
      <div className="flex-1">
        <div className="h-4 bg-neutral-800 rounded w-32 mb-2" />
        <div className="h-3 bg-neutral-800 rounded w-48" />
      </div>
      <div className="w-32 h-2 bg-neutral-800 rounded-full" />
    </div>
  );
}

export default function BoardPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [totalVerified, setTotalVerified] = useState(0);
  const [lastUpdatedText, setLastUpdatedText] = useState('--:--:--');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateData = () => {
      setColleges(getColleges());
      setTotalVerified(getTotalVerified());
      setLastUpdatedText(new Date().toLocaleTimeString('en-US', { hour12: true }));
      setLoading(false);
    };

    // Simulate initial load
    setTimeout(updateData, 500);
    const interval = setInterval(updateData, 60000);

    return () => clearInterval(interval);
  }, []);

  const top10 = colleges.slice(0, 10);
  const openLeague = colleges.slice(10);

  const getMovementIcon = (rank: number) => {
    const movements = [1, 0, -1, 2, 0, -1, 1, 0, 0, -2];
    const movement = movements[rank % 10];
    if (movement > 0) return <span className="text-green-400 text-sm font-medium">↑{movement}</span>;
    if (movement < 0) return <span className="text-red-400 text-sm font-medium">↓{Math.abs(movement)}</span>;
    return <span className="text-neutral-600 text-sm">—</span>;
  };

  return (
    <main className="min-h-screen bg-[#030303] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
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
          <Link href="/check" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium text-sm transition-all hover:scale-105">
            Register Now
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-sm text-teal-400">Live Leaderboard</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🏆 College Build-Off
            </h1>
            <p className="text-neutral-400 text-lg">Which college will dominate?</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-2xl p-5 text-center">
              <p className="text-3xl md:text-4xl font-bold text-orange-400">
                {loading ? '--' : totalVerified}
              </p>
              <p className="text-sm text-neutral-400 mt-1">Verified</p>
            </div>
            <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-500/20 rounded-2xl p-5 text-center">
              <p className="text-3xl md:text-4xl font-bold text-teal-400">30</p>
              <p className="text-sm text-neutral-400 mt-1">Colleges</p>
            </div>
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-2xl p-5 text-center">
              <p className="text-3xl md:text-4xl font-bold text-neutral-300">500</p>
              <p className="text-sm text-neutral-400 mt-1">Seat Cap</p>
            </div>
          </div>

          {/* Seat Progress */}
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-2xl p-5 mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">Workshop Seats</span>
              <span className="text-orange-400 font-semibold">{loading ? '--' : totalVerified}/500</span>
            </div>
            <div className="h-4 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-teal-400 rounded-full transition-all duration-1000"
                style={{ width: loading ? '0%' : `${(totalVerified / 500) * 100}%` }}
              />
            </div>
            {!loading && totalVerified >= 400 && (
              <p className="text-center text-orange-400 text-sm mt-3 animate-pulse font-medium">
                🔥 {500 - totalVerified} seats remaining — Register now!
              </p>
            )}
          </div>

          {/* Top 10 */}
          <div className="bg-gradient-to-b from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-orange-500/10 via-transparent to-teal-500/10 px-5 py-4 border-b border-neutral-800">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <span>🏅</span> Top 10 Colleges
              </h2>
            </div>

            <div className="divide-y divide-neutral-800/50">
              {loading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : (
                top10.map((college, index) => (
                  <div
                    key={college.id}
                    className={`px-5 py-4 flex items-center gap-4 transition-colors hover:bg-neutral-800/30 ${
                      index < 3 ? 'bg-gradient-to-r from-neutral-800/30 to-transparent' : ''
                    }`}
                  >
                    {/* Rank */}
                    <div className="w-12 text-center">
                      {index === 0 && <span className="text-3xl">🥇</span>}
                      {index === 1 && <span className="text-3xl">🥈</span>}
                      {index === 2 && <span className="text-3xl">🥉</span>}
                      {index > 2 && (
                        <span className="text-xl font-bold text-neutral-500">#{index + 1}</span>
                      )}
                    </div>

                    {/* College Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{college.shortName}</p>
                      <p className="text-sm text-neutral-500 truncate">{college.name}</p>
                    </div>

                    {/* Movement */}
                    <div className="w-12 text-center">
                      {getMovementIcon(index)}
                    </div>

                    {/* Goal Meter */}
                    <div className="w-36">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className={college.verifiedCount >= college.goal ? 'text-green-400 font-medium' : 'text-teal-400'}>
                          {college.verifiedCount}/{college.goal}
                        </span>
                        {college.verifiedCount >= college.goal && <span className="text-green-400">✓</span>}
                      </div>
                      <div className="h-2.5 bg-neutral-700/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            college.verifiedCount >= college.goal
                              ? 'bg-gradient-to-r from-green-500 to-teal-400'
                              : 'bg-gradient-to-r from-teal-500 to-teal-400'
                          }`}
                          style={{ width: `${Math.min((college.verifiedCount / college.goal) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Open League */}
          {!loading && openLeague.length > 0 && (
            <div className="bg-gradient-to-b from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden mb-8">
              <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-neutral-300">Open League</h2>
                  <p className="text-xs text-neutral-500">Other participating colleges</p>
                </div>
                <span className="text-xs text-neutral-500">{openLeague.length} colleges</span>
              </div>

              <div className="divide-y divide-neutral-800/50 max-h-72 overflow-y-auto">
                {openLeague.map((college, index) => (
                  <div key={college.id} className="px-5 py-3 flex items-center gap-4 hover:bg-neutral-800/20 transition-colors">
                    <span className="text-neutral-600 w-10 text-sm">#{index + 11}</span>
                    <span className="flex-1 truncate text-neutral-300">{college.shortName}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neutral-600 rounded-full"
                          style={{ width: `${(college.verifiedCount / college.goal) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-neutral-500 w-10">{college.verifiedCount}/{college.goal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Last Updated */}
          <p className="text-center text-xs text-neutral-600 mb-8">
            Last updated: {lastUpdatedText} · Auto-refreshes every 60s
          </p>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/check"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20"
            >
              Register & Represent Your College
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
