interface PotionBadgeProps {
  count: number;
}

export default function PotionBadge({ count }: PotionBadgeProps) {
  return (
    <div className="bg-gradient-to-br from-pink-900/40 to-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-pink-700/30 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        </div>
        <div>
          <p className="text-xs text-slate-400">Potions</p>
          <p className="text-xl font-bold text-pink-400">{count}</p>
        </div>
      </div>
    </div>
  );
}
