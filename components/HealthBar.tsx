"use client";

interface HealthBarProps {
  current: number;
  max: number;
  label?: string;
  color?: "red" | "green" | "blue";
}

export default function HealthBar({ current, max, label, color = "red" }: HealthBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  const colorClasses = {
    red: {
      bg: "from-red-500 via-orange-500 to-red-500",
      shadow: "shadow-red-500/50",
    },
    green: {
      bg: "from-green-500 via-emerald-500 to-green-500",
      shadow: "shadow-green-500/50",
    },
    blue: {
      bg: "from-blue-500 via-cyan-500 to-blue-500",
      shadow: "shadow-blue-500/50",
    },
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-300">{label}</span>
          <span className="text-sm font-bold text-white">
            {current}/{max}
          </span>
        </div>
      )}
      <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${colorClasses[color].bg} transition-all duration-500 ease-out rounded-full shadow-lg ${colorClasses[color].shadow}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
