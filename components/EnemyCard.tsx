"use client";

interface EnemyCardProps {
  name: string;
  health: number;
  maxHealth: number;
  level: number;
}

export default function EnemyCard({ name, health, maxHealth, level }: EnemyCardProps) {
  const healthPercentage = Math.max(0, Math.min(100, (health / maxHealth) * 100));

  const getEnemyEmoji = (enemyName: string): string => {
    const emojiMap: Record<string, string> = {
      "Goblin": "👺",
      "Orc": "👹",
      "Dragon": "🐉",
      "Skeleton": "💀",
      "Dark Knight": "🖤",
      "Demon": "👿",
      "Troll": "🧌",
      "Witch": "🧙‍♀️",
      "Vampire": "🧛",
      "Werewolf": "🐺",
      "Warrior": "⚔️",
      "Zombie": "🧟",
      "Assassin": "🗡️",
      "Hunter": "🏹",
    };
    return emojiMap[enemyName] || "👾";
  };

  return (
    <div className="bg-gradient-to-br from-red-900/40 to-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-red-700/30 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg border-4 border-red-400/30">
            <span className="text-3xl">{getEnemyEmoji(name)}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-slate-400">Level {level} Enemy</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-red-400">{health}</span>
          <span className="text-slate-500 text-sm">/{maxHealth} HP</span>
        </div>
      </div>

      <div className="w-full h-4 bg-slate-700/50 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500 transition-all duration-500 ease-out animate-pulse"
          style={{ width: `${healthPercentage}%` }}
        />
      </div>

      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-slate-400">Enemy Health</span>
        <span className="text-xs font-medium text-red-400">
          {healthPercentage.toFixed(0)}% remaining
        </span>
      </div>
    </div>
  );
}
