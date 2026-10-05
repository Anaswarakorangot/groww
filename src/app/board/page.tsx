'use client';

import { useState, useEffect } from 'react';
import { getColleges, getTotalVerified } from '@/lib/store';
import { College } from '@/types';
import Link from 'next/link';

export default function BoardPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [totalVerified, setTotalVerified] = useState(0);
  const [lastUpdatedText, setLastUpdatedText] = useState('--:--:--');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateData = () => {
      setColleges(getColleges());
      setTotalVerified(getTotalVerified());
      setLastUpdatedText(new Date().toLocaleTimeString('en-US', { hour12: true }));
    };

    updateData();
    const interval = setInterval(updateData, 60000);

    return () => clearInterval(interval);
  }, []);

  const top10 = colleges.slice(0, 10);
  const openLeague = colleges.slice(10);

  const getMovementIcon = (rank: number) => {
    // Mock movement data
    const movements = [1, 0, -1, 2, 0, -1, 1, 0, 0, -2];
    const movement = movements[rank % 10];
    if (movement > 0) return <span className="text-green-400 text-sm">↑{movement}</span>;
    if (movement < 0) return <span className="text-red-400 text-sm">↓{Math.abs(movement)}</span>;
    return <span className="text-neutral-500 text-sm">-</span>;
  };

  return (
    <main className="min-h-screen px-4 py-8 md:py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            🏆 College Build-Off
          </h1>
          <p className="text-neutral-400 mb-4">Live Leaderboard</p>

          {/* Stats */}
          <div className="flex justify-center gap-6 mb-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-500">{totalVerified}</p>
              <p className="text-sm text-neutral-400">Verified Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-400">30</p>
              <p className="text-sm text-neutral-400">Colleges Competing</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-neutral-300">500</p>
              <p className="text-sm text-neutral-400">Seat Limit</p>
            </div>
          </div>

          <p className="text-xs text-neutral-500">
            Last updated: {lastUpdatedText} · Refreshes every 60s
          </p>
        </div>

        {/* Seat Progress */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Workshop Seats</span>
            <span className="text-orange-400">{totalVerified}/500 filled</span>
          </div>
          <div className="h-4 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
              style={{ width: `${(totalVerified / 500) * 100}%` }}
            />
          </div>
          {totalVerified >= 450 && (
            <p className="text-center text-orange-400 text-sm mt-2 animate-pulse">
              ⚠️ Only {500 - totalVerified} seats left!
            </p>
          )}
        </div>

        {/* Top 10 */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-orange-500/10 to-teal-500/10 px-4 py-3 border-b border-neutral-800">
            <h2 className="font-semibold flex items-center gap-2">
              <span>🏅</span> Top 10 Colleges
            </h2>
          </div>

          <div className="divide-y divide-neutral-800">
            {top10.map((college, index) => (
              <div
                key={college.id}
                className={`px-4 py-4 flex items-center gap-4 ${index < 3 ? 'bg-neutral-800/30' : ''}`}
              >
                {/* Rank */}
                <div className="w-10 text-center">
                  {index === 0 && <span className="text-2xl">🥇</span>}
                  {index === 1 && <span className="text-2xl">🥈</span>}
                  {index === 2 && <span className="text-2xl">🥉</span>}
                  {index > 2 && <span className="text-xl font-bold text-neutral-400">#{index + 1}</span>}
                </div>

                {/* College Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{college.shortName}</p>
                  <p className="text-sm text-neutral-500 truncate">{college.name}</p>
                </div>

                {/* Movement */}
                <div className="w-10 text-center">
                  {getMovementIcon(index)}
                </div>

                {/* Goal Meter */}
                <div className="w-32">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-teal-400">{college.verifiedCount}/{college.goal}</span>
                  </div>
                  <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        college.verifiedCount >= college.goal
                          ? 'bg-gradient-to-r from-teal-500 to-green-400'
                          : 'bg-teal-500'
                      }`}
                      style={{ width: `${Math.min((college.verifiedCount / college.goal) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open League */}
        {openLeague.length > 0 && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-800">
              <h2 className="font-semibold text-neutral-400">Open League</h2>
              <p className="text-xs text-neutral-500">Other participating colleges</p>
            </div>

            <div className="divide-y divide-neutral-800 max-h-64 overflow-y-auto">
              {openLeague.map((college, index) => (
                <div key={college.id} className="px-4 py-3 flex items-center gap-4">
                  <span className="text-neutral-500 w-8">#{index + 11}</span>
                  <span className="flex-1 truncate text-sm">{college.shortName}</span>
                  <span className="text-sm text-neutral-400">{college.verifiedCount}/{college.goal}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-xl font-semibold text-lg transition-colors"
          >
            Register & Represent Your College →
          </Link>
        </div>
      </div>
    </main>
  );
}
