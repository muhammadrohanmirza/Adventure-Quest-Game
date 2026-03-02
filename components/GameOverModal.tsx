"use client";

interface GameOverModalProps {
  onContinue: () => void;
  level: number;
  enemy: string;
}

export default function GameOverModal({ onContinue, level, enemy }: GameOverModalProps) {
  const handleClick = () => {
    onContinue();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-red-700/50 shadow-2xl">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/25 border-4 border-red-400/30">
            <span className="text-5xl">💀</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">Game Over</h2>
          <p className="text-red-400 text-lg mb-2">Defeated by {enemy}</p>
          <p className="text-slate-400 mb-2">You reached Level {level}</p>
          <p className="text-slate-500 text-sm mb-6">
            Don&apos;t give up! Every battle makes you stronger...
          </p>

          <button
            onClick={handleClick}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transform transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span className="text-2xl">🔄</span>
            Continue Adventure
          </button>

          <p className="text-xs text-slate-500 mt-4">
            ✨ You will be revived with full health and 3 potions
          </p>
        </div>
      </div>
    </div>
  );
}
