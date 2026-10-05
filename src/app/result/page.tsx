'use client';

import { useState, useEffect, Suspense, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getFromSession, getCollegeRank, getCollegeByName, verifyRegistration, saveToSession } from '@/lib/store';
import { Registration } from '@/types';
import Link from 'next/link';

function ResultContent() {
  const router = useRouter();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [joinCode, setJoinCode] = useState('');
  const [collegeRank, setCollegeRank] = useState(0);
  const [collegeData, setCollegeData] = useState<{ verifiedCount: number; goal: number } | null>(null);
  const [verified, setVerified] = useState(false);
  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reg = getFromSession<Registration>('registration');
    const code = getFromSession<string>('joinCode');

    if (!reg) {
      router.push('/');
      return;
    }

    setRegistration(reg);
    setJoinCode(code || 'XXXX');
    setCollegeRank(getCollegeRank(reg.college));

    const college = getCollegeByName(reg.college);
    if (college) {
      setCollegeData({ verifiedCount: college.verifiedCount, goal: college.goal });
    }
  }, [router]);

  const handleVerify = () => {
    if (registration) {
      verifyRegistration(registration.phone);
      setVerified(true);
      const college = getCollegeByName(registration.college);
      if (college) {
        setCollegeData({ verifiedCount: college.verifiedCount, goal: college.goal });
        setCollegeRank(getCollegeRank(registration.college));
      }
      saveToSession('verified', true);
    }
  };

  const generateRankCard = useCallback(() => {
    if (!canvasRef.current || !registration) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 400;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 600, 400);
    gradient.addColorStop(0, '#0f0f0f');
    gradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 400);

    // Orange accent bar at top
    const accentGradient = ctx.createLinearGradient(0, 0, 600, 0);
    accentGradient.addColorStop(0, '#f97316');
    accentGradient.addColorStop(1, '#14b8a6');
    ctx.fillStyle = accentGradient;
    ctx.fillRect(0, 0, 600, 6);

    // Border
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, 598, 398);

    // Title badge
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.roundRect(30, 30, 200, 32, 16);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px system-ui, sans-serif';
    ctx.fillText('🏆 COLLEGE BUILD-OFF', 50, 52);

    // Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px system-ui, sans-serif';
    ctx.fillText(registration.name.substring(0, 25), 30, 115);

    // College
    ctx.fillStyle = '#888';
    ctx.font = '18px system-ui, sans-serif';
    ctx.fillText(registration.college.substring(0, 40), 30, 145);

    // Large Rank
    ctx.fillStyle = '#14b8a6';
    ctx.font = 'bold 80px system-ui, sans-serif';
    ctx.fillText(`#${collegeRank}`, 30, 250);

    ctx.fillStyle = '#666';
    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText('COLLEGE RANK', 30, 275);

    // Project badge
    ctx.fillStyle = '#262626';
    ctx.beginPath();
    ctx.roundRect(30, 300, 540, 60, 12);
    ctx.fill();

    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText('BUILDING', 50, 325);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px system-ui, sans-serif';
    const projectTitle = registration.projectSuggestion?.title || 'AI Project';
    ctx.fillText(projectTitle, 50, 348);

    // Goal meter
    const progress = collegeData ? (collegeData.verifiedCount / collegeData.goal) : 0;
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.roundRect(350, 200, 220, 24, 12);
    ctx.fill();

    ctx.fillStyle = '#14b8a6';
    ctx.beginPath();
    ctx.roundRect(350, 200, 220 * Math.min(progress, 1), 24, 12);
    ctx.fill();

    ctx.fillStyle = '#888';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(`${collegeData?.verifiedCount || 0}/${collegeData?.goal || 20} verified`, 350, 245);

    // Convert to image URL
    const imageUrl = canvas.toDataURL('image/png');
    setCardImageUrl(imageUrl);
  }, [registration, collegeRank, collegeData]);

  const shareCard = async () => {
    if (!cardImageUrl) return;

    try {
      const response = await fetch(cardImageUrl);
      const blob = await response.blob();

      if (navigator.share && navigator.canShare) {
        const file = new File([blob], 'rank-card.png', { type: 'image/png' });
        const shareData = {
          title: 'College Build-Off',
          text: `I just registered for the AI Workshop! My college is ranked #${collegeRank}. Join me!`,
          files: [file]
        };

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      }

      // Fallback: download
      const a = document.createElement('a');
      a.href = cardImageUrl;
      a.download = 'my-rank-card.png';
      a.click();
    } catch (err) {
      console.error('Share failed:', err);
      // Fallback: download
      const a = document.createElement('a');
      a.href = cardImageUrl;
      a.download = 'my-rank-card.png';
      a.click();
    }
  };

  const whatsappLink = `https://wa.me/919999999999?text=JOIN%20${joinCode}`;

  if (!registration) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 md:py-16 bg-[#030303]">
      {/* Hidden canvas for generation */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="max-w-lg mx-auto space-y-6">
        {/* Success Header */}
        <div className="text-center animate-slide-up">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-500/30 to-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-500/30">
            <svg className="w-12 h-12 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">You&apos;re In! 🎉</h1>
          <p className="text-neutral-400 text-lg">Your spot is reserved</p>
        </div>

        {/* Your Build */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-2xl p-6 animate-slide-up backdrop-blur-sm" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-sm text-neutral-500 uppercase tracking-wider mb-3">Your Build</h3>
          <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-orange-400">
                  {registration.projectSuggestion?.title || 'AI Resume Screener'}
                </h4>
                <p className="text-sm text-neutral-400 mt-1">
                  {registration.projectSuggestion?.description || 'Build an AI chatbot that screens resumes against a job description'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* College Rank */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-2xl p-6 animate-slide-up backdrop-blur-sm" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg">{registration.college}</h3>
              <p className="text-sm text-neutral-500">College Rank</p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">#{collegeRank}</span>
            </div>
          </div>

          {/* Goal Meter */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Progress to Goal</span>
              <span className="text-teal-400 font-medium">{collegeData?.verifiedCount || 0}/{collegeData?.goal || 20} verified</span>
            </div>
            <div className="h-4 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${((collegeData?.verifiedCount || 0) / (collegeData?.goal || 20)) * 100}%` }}
              />
            </div>
            <p className="text-sm text-neutral-500">
              {collegeRank <= 10 ? '🔥 Your college is in the Top 10!' : `Help your college reach Top 10!`}
            </p>
          </div>
        </div>

        {/* WhatsApp Verification */}
        {!verified ? (
          <div className="bg-gradient-to-br from-green-500/10 to-teal-500/5 border border-green-500/20 rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-xl">📱</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Verify on WhatsApp</h3>
                <p className="text-sm text-neutral-400">Get your workshop link + free ATS template</p>
              </div>
            </div>

            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 mb-4 font-mono text-center text-xl">
              <span className="text-green-400">JOIN {joinCode}</span>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleVerify}
              className="block w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl font-semibold text-lg text-center transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20"
            >
              Get Workshop Link on WhatsApp →
            </a>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-green-500/10 to-teal-500/5 border border-green-500/30 rounded-2xl p-6 text-center animate-slide-up">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-green-400 mb-1">Verified!</h3>
            <p className="text-neutral-400">Check WhatsApp for your workshop link and ATS template</p>
          </div>
        )}

        {/* Rank Card */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="font-semibold text-lg mb-4">Share Your Rank Card</h3>

          {!cardImageUrl ? (
            <button
              onClick={generateRankCard}
              className="w-full py-4 border-2 border-dashed border-neutral-700 hover:border-orange-500/50 rounded-xl transition-all flex items-center justify-center gap-3 group"
            >
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium">Generate Rank Card</span>
            </button>
          ) : (
            <div className="space-y-4">
              <div className="bg-neutral-800 rounded-xl p-2 border border-neutral-700">
                <img src={cardImageUrl} alt="Rank Card" className="w-full rounded-lg" />
              </div>
              <button
                onClick={shareCard}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-semibold transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share to WhatsApp
              </button>
            </div>
          )}

          <p className="text-xs text-neutral-500 text-center mt-4">
            Help your college climb the leaderboard! 🚀
          </p>
        </div>

        {/* View Leaderboard */}
        <Link
          href="/board"
          className="block w-full py-4 bg-neutral-900 border border-neutral-800 hover:border-teal-500/50 rounded-xl text-center transition-all hover:bg-neutral-800 font-medium"
        >
          View Live Leaderboard →
        </Link>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
