'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
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
  const [showShareCard, setShowShareCard] = useState(false);
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
      // Update college data after verification
      const college = getCollegeByName(registration.college);
      if (college) {
        setCollegeData({ verifiedCount: college.verifiedCount, goal: college.goal });
        setCollegeRank(getCollegeRank(registration.college));
      }
      saveToSession('verified', true);
    }
  };

  const generateRankCard = () => {
    if (!canvasRef.current || !registration) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 600, 400);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(1, '#171717');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 400);

    // Border
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 580, 380);

    // Title
    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 24px system-ui';
    ctx.fillText('🏆 College Build-Off', 30, 50);

    // Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px system-ui';
    ctx.fillText(registration.name, 30, 110);

    // College
    ctx.fillStyle = '#a3a3a3';
    ctx.font = '20px system-ui';
    ctx.fillText(registration.college, 30, 145);

    // Rank
    ctx.fillStyle = '#14b8a6';
    ctx.font = 'bold 64px system-ui';
    ctx.fillText(`#${collegeRank}`, 30, 230);
    ctx.fillStyle = '#a3a3a3';
    ctx.font = '18px system-ui';
    ctx.fillText('College Rank', 30, 255);

    // Project
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px system-ui';
    ctx.fillText('Building:', 30, 300);
    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 18px system-ui';
    const projectTitle = registration.projectSuggestion?.title || 'AI Project';
    ctx.fillText(projectTitle, 30, 325);

    // Goal meter
    const progress = collegeData ? (collegeData.verifiedCount / collegeData.goal) * 100 : 0;
    ctx.fillStyle = '#262626';
    ctx.fillRect(30, 355, 540, 20);
    ctx.fillStyle = '#14b8a6';
    ctx.fillRect(30, 355, (540 * progress) / 100, 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px system-ui';
    ctx.fillText(`${collegeData?.verifiedCount || 0}/${collegeData?.goal || 20} verified`, 30, 385);

    setShowShareCard(true);
  };

  const shareCard = async () => {
    if (!canvasRef.current) return;

    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvasRef.current!.toBlob((b) => resolve(b!), 'image/png');
      });

      if (navigator.share) {
        const file = new File([blob], 'rank-card.png', { type: 'image/png' });
        await navigator.share({
          title: 'College Build-Off',
          text: `I just registered for the AI Workshop! My college is ranked #${collegeRank}. Join me!`,
          files: [file]
        });
      } else {
        // Fallback: download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'rank-card.png';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  const whatsappLink = `https://wa.me/919999999999?text=JOIN%20${joinCode}`;

  if (!registration) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen px-4 py-8 md:py-16">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Success Header */}
        <div className="text-center animate-slide-up">
          <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">You&apos;re In! 🎉</h1>
          <p className="text-neutral-400">Your spot is reserved</p>
        </div>

        {/* Your Build */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-sm text-neutral-400 mb-2">Your Build</h3>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
            <h4 className="font-semibold text-lg text-orange-400">
              {registration.projectSuggestion?.title || 'AI Resume Screener'}
            </h4>
            <p className="text-sm text-neutral-400 mt-1">
              {registration.projectSuggestion?.description || 'Build an AI chatbot that screens resumes against a job description'}
            </p>
          </div>
        </div>

        {/* College Rank */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">{registration.college}</h3>
              <p className="text-sm text-neutral-400">College Rank</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-bold text-teal-400">#{collegeRank}</span>
            </div>
          </div>

          {/* Goal Meter */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Progress to Goal</span>
              <span className="text-teal-400">{collegeData?.verifiedCount || 0}/{collegeData?.goal || 20} verified</span>
            </div>
            <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${((collegeData?.verifiedCount || 0) / (collegeData?.goal || 20)) * 100}%` }}
              />
            </div>
            <p className="text-xs text-neutral-500">
              {collegeRank <= 10 ? '🔥 Top 10!' : `${11 - collegeRank + 10} more to reach Top 10!`}
            </p>
          </div>
        </div>

        {/* WhatsApp Verification */}
        {!verified ? (
          <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <span className="text-green-400">📱</span> Verify on WhatsApp
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              Send the message below to get your workshop link + free ATS resume template
            </p>

            <div className="bg-neutral-800 rounded-xl p-4 mb-4 font-mono text-center">
              <span className="text-green-400">JOIN {joinCode}</span>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleVerify}
              className="block w-full py-4 bg-green-500 hover:bg-green-600 rounded-xl font-semibold text-lg text-center transition-colors"
            >
              Get Workshop Link on WhatsApp →
            </a>
          </div>
        ) : (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center animate-slide-up">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-semibold text-green-400 mb-1">Verified!</h3>
            <p className="text-sm text-neutral-400">Check WhatsApp for your workshop link and ATS template</p>
          </div>
        )}

        {/* Rank Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="font-semibold mb-4">Share Your Rank Card</h3>

          <canvas ref={canvasRef} className="hidden" />

          {!showShareCard ? (
            <button
              onClick={generateRankCard}
              className="w-full py-3 border border-neutral-700 hover:border-orange-500 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Generate Rank Card
            </button>
          ) : (
            <div className="space-y-3">
              <div className="bg-neutral-800 rounded-xl p-2">
                <canvas ref={canvasRef} className="w-full rounded-lg" />
              </div>
              <button
                onClick={shareCard}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share to WhatsApp
              </button>
            </div>
          )}

          <p className="text-xs text-neutral-500 text-center mt-3">
            Help your college climb the leaderboard!
          </p>
        </div>

        {/* View Leaderboard */}
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

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}
