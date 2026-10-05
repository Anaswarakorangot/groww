import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#030303] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-[150px] sm:text-[200px] font-bold text-neutral-900 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🤖</div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Oops! Page not found
        </h2>
        <p className="text-neutral-400 mb-8 max-w-md mx-auto">
          Looks like this page got lost in the AI training data.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-semibold transition-all hover:scale-105"
          >
            Go Home
          </Link>
          <Link
            href="/board"
            className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl font-semibold transition-all"
          >
            View Leaderboard
          </Link>
        </div>
      </div>
    </main>
  );
}
