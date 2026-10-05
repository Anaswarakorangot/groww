'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getRepStats, getRegistrationsByRef } from '@/lib/store';
import Link from 'next/link';

export default function RepDashboard() {
  const params = useParams();
  const code = params.code as string;

  const [stats, setStats] = useState<ReturnType<typeof getRepStats> | null>(null);
  const [referrals, setReferrals] = useState<ReturnType<typeof getRegistrationsByRef>>([]);

  useEffect(() => {
    const updateStats = () => {
      setStats(getRepStats(code));
      setReferrals(getRegistrationsByRef(code));
    };

    updateStats();
    const interval = setInterval(updateStats, 30000);

    return () => clearInterval(interval);
  }, [code]);

  const shareLink = typeof window !== 'undefined' ? `${window.location.origin}?ref=${code}` : '';

  const tierColors = {
    bronze: 'text-orange-700 bg-orange-900/30 border-orange-700',
    silver: 'text-neutral-300 bg-neutral-700/30 border-neutral-500',
    gold: 'text-yellow-400 bg-yellow-900/30 border-yellow-600',
    platinum: 'text-teal-300 bg-teal-900/30 border-teal-500'
  };

  const tierEmoji = {
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    platinum: '💎'
  };

  if (!stats) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen px-4 py-8 md:py-16">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Rep Dashboard
          </h1>
          <p className="text-neutral-400">Code: <span className="font-mono text-orange-400">{code}</span></p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-center">
            <p className="text-4xl font-bold text-orange-500">{stats.verified}</p>
            <p className="text-sm text-neutral-400">Verified Students</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-center">
            <p className="text-4xl font-bold text-neutral-400">{stats.total}</p>
            <p className="text-sm text-neutral-400">Total Signups</p>
          </div>
        </div>

        {/* Tier Status */}
        <div className={`border rounded-2xl p-6 ${tierColors[stats.tier]}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-75">Current Tier</p>
              <p className="text-2xl font-bold flex items-center gap-2">
                {tierEmoji[stats.tier]} {stats.tier.charAt(0).toUpperCase() + stats.tier.slice(1)}
              </p>
            </div>
            {stats.reward && (
              <div className="text-right">
                <p className="text-xs opacity-75">Reward</p>
                <p className="font-medium">{stats.reward}</p>
              </div>
            )}
          </div>

          {stats.nextTierAt && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to next tier</span>
                <span>{stats.verified}/{stats.nextTierAt}</span>
              </div>
              <div className="h-3 bg-black/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/30 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.verified / stats.nextTierAt) * 100}%` }}
                />
              </div>
              <p className="text-xs mt-2 opacity-75">
                {stats.nextTierAt - stats.verified} more verified students to reach next tier
              </p>
            </div>
          )}
        </div>

        {/* Tier Rewards Info */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Tier Rewards</h3>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-xl ${stats.verified >= 10 ? 'bg-teal-500/10 border border-teal-500/30' : 'bg-neutral-800'}`}>
              <div className="flex items-center gap-3">
                <span>🥈</span>
                <span>Silver (10 verified)</span>
              </div>
              <span className="text-sm text-neutral-400">₹25 + Certificate</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-xl ${stats.verified >= 25 ? 'bg-teal-500/10 border border-teal-500/30' : 'bg-neutral-800'}`}>
              <div className="flex items-center gap-3">
                <span>🥇</span>
                <span>Gold (25 verified)</span>
              </div>
              <span className="text-sm text-neutral-400">LinkedIn Rec</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-xl ${stats.verified >= 50 ? 'bg-teal-500/10 border border-teal-500/30' : 'bg-neutral-800'}`}>
              <div className="flex items-center gap-3">
                <span>💎</span>
                <span>Platinum (50 verified)</span>
              </div>
              <span className="text-sm text-neutral-400">Top Rep Feature</span>
            </div>
          </div>
        </div>

        {/* Your Link */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <h3 className="font-semibold mb-3">Your Referral Link</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-sm font-mono"
            />
            <button
              onClick={() => navigator.clipboard.writeText(shareLink)}
              className="px-4 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Recent Referrals */}
        {referrals.length > 0 && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-800">
              <h3 className="font-semibold">Recent Signups</h3>
            </div>
            <div className="divide-y divide-neutral-800 max-h-64 overflow-y-auto">
              {referrals.slice(0, 10).map((reg, i) => (
                <div key={i} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{reg.name}</p>
                    <p className="text-sm text-neutral-500">{reg.college}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${reg.verified ? 'bg-teal-500/20 text-teal-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {reg.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Board */}
        <Link
          href="/board"
          className="block w-full py-3 border border-neutral-700 hover:border-teal-500 rounded-xl text-center transition-colors"
        >
          View Live Leaderboard →
        </Link>
      </div>
    </main>
  );
}
