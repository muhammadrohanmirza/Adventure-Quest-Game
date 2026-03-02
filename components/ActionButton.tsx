"use client";

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
  variant?: "primary" | "secondary" | "danger" | "success";
  disabled?: boolean;
  loading?: boolean;
}

export default function ActionButton({
  onClick,
  icon,
  label,
  description,
  variant = "primary",
  disabled = false,
  loading = false,
}: ActionButtonProps) {
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-purple-500/30 shadow-purple-500/25",
    secondary:
      "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 border-slate-500/30 shadow-slate-500/25",
    danger:
      "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 border-red-500/30 shadow-red-500/25",
    success:
      "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-green-500/30 shadow-green-500/25",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative group w-full p-4 rounded-xl border shadow-lg
        ${variantClasses[variant]}
        transform transition-all duration-200 
        hover:scale-[1.02] hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none
        focus:outline-none focus:ring-2 focus:ring-purple-500/50
      `}
    >
      {loading && (
        <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
          {icon}
        </div>
        <div className="text-left">
          <h4 className="font-semibold text-white">{label}</h4>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
    </button>
  );
}
