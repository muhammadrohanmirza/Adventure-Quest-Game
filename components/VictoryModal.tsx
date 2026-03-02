"use client";

interface VictoryModalProps {
  level: number;
  enemy: string;
  onClose: () => void;
}

export default function VictoryModal({ level, enemy, onClose }: VictoryModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-yellow-700/50 shadow-2xl">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/25 border-4 border-yellow-400/30 animate-pulse">
            <span className="text-5xl">🏆</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">Victory!</h2>
          <p className="text-yellow-400 text-lg mb-2">You defeated {enemy}!</p>
          <p className="text-slate-400 mb-2">Current Level: {level}</p>
          <p className="text-slate-500 text-sm mb-6">
            🎉 A new enemy approaches! Prepare for the next battle!
          </p>

          <button
            onClick={onClose}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-green-500/25 transform transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span className="text-2xl">⚔️</span>
            Continue Fighting
          </button>

          <p className="text-xs text-slate-500 mt-4">
            💡 Tip: Defeated enemies have a 50% chance to drop health potions!
          </p>
        </div>
      </div>
    </div>
  );
}
