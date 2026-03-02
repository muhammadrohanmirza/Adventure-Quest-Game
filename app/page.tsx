import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/game logo.png" alt="Adventure Quest Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold text-white">Adventure Quest</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-slate-300 hover:text-white font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo Display */}
          <div className="mb-8">
            <img 
              src="/game logo.png" 
              alt="Adventure Quest" 
              className="w-32 h-32 md:w-40 md:h-40 mx-auto object-contain drop-shadow-2xl"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-purple-300 text-sm font-medium">
              Adventure Awaits
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Embark on an
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Epic Adventure
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Battle fierce enemies, level up your character, and collect powerful
            potions in this thrilling text-based adventure game. Your journey
            begins now.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transform transition-all duration-200 hover:scale-105"
            >
              Start Your Adventure
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 text-white font-bold rounded-xl transition-all"
            >
              Continue Journey
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">⚔️</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Battle Enemies</h3>
              <p className="text-slate-400 text-sm">
                Fight against goblins, dragons, demons, and more fearsome creatures
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Level Up</h3>
              <p className="text-slate-400 text-sm">
                Grow stronger with each victory and face increasingly powerful foes
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🧪</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Collect Potions</h3>
              <p className="text-slate-400 text-sm">
                Gather healing potions to restore health and survive longer battles
              </p>
            </div>
          </div>

          {/* Game Preview */}
          <div className="mt-16 bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">Why Play Adventure Quest?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💾</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Persistent Progress</h4>
                  <p className="text-slate-400 text-sm">Your game saves automatically. Continue your adventure anytime!</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🔐</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Secure Account</h4>
                  <p className="text-slate-400 text-sm">Your progress is protected with secure authentication.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎮</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Easy to Play</h4>
                  <p className="text-slate-400 text-sm">Simple controls, deep gameplay. Perfect for quick sessions!</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📱</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Play Anywhere</h4>
                  <p className="text-slate-400 text-sm">Works on desktop, tablet, and mobile devices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-12 border-t border-slate-800">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/game logo.png" alt="Adventure Quest Logo" className="w-6 h-6 object-contain" />
            <span className="text-slate-300 font-semibold">Adventure Quest</span>
          </div>
          <p className="text-slate-400 text-sm">
            Adventure Quest © 2026 | Created by Muhammad Rohan Mirza ❤️ | Embark on your heroic journey! ⚔️🧪
          </p>
        </div>
      </footer>
    </div>
  );
}
