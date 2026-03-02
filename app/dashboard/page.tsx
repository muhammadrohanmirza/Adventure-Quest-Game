"use client";

import { useEffect, useState, useCallback } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  HealthBar,
  ActionButton,
  PotionBadge,
  LevelBadge,
  GameOverModal,
  VictoryModal,
  DeleteAccountModal,
} from "@/components";
import { GameState, GameMessage, getEnemyHealthForLevel } from "@/lib/types";

const MAX_HEALTH = 100;
const ATTACK_DAMAGE_MIN = 10;
const ATTACK_DAMAGE_MAX = 50;
const ENEMY_ATTACK_MIN = 10;
const ENEMY_ATTACK_MAX = 50;
const POTION_HEAL = 30;
const POTION_DROP_CHANCE = 50;

export default function DashboardPage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<GameMessage | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const loadGame = useCallback(async () => {
    try {
      const response = await fetch("/api/game/load");
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error("Failed to load game");
      }
      const data = await response.json();
      setGameState(data);
      if (data.health <= 0) {
        setShowGameOver(true);
      }
    } catch (error) {
      console.error("Error loading game:", error);
      setMessage({ type: "error", text: "Failed to load game. Please try again." });
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  const handleAction = useCallback(
    async (action: string) => {
      if (!gameState || actionLoading) return;

      setActionLoading(action);
      setMessage(null);

      try {
        const response = await fetch("/api/game/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        });

        if (!response.ok) {
          throw new Error("Action failed");
        }

        const data = await response.json();
        const newState = data.gameState;

        setGameState(newState);

        // Display message from server
        if (data.message) {
          setMessage({ type: "info", text: data.message });
        }

        // Show victory modal when enemy is defeated
        if (action === "attack" && data.damageDealt > 0 && newState.enemyHealth === getEnemyHealthForLevel(newState.level)) {
          setShowVictory(true);
        }

        // Show game over modal when health reaches 0
        if (newState.health <= 0 && action !== "continue") {
          setShowGameOver(true);
        }

        // Hide game over modal when continuing
        if (action === "continue" && newState.health > 0) {
          setShowGameOver(false);
        }
      } catch (error) {
        console.error("Action error:", error);
        setMessage({ type: "error", text: "Action failed. Please try again." });
      } finally {
        setActionLoading(null);
      }
    },
    [gameState, actionLoading]
  );

  const handleContinue = useCallback(() => {
    setShowGameOver(false);
    handleAction("continue");
  }, [handleAction]);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/account/delete", {
        method: "DELETE",
      });

      if (response.ok) {
        await signOut({ redirect: true, callbackUrl: "/" });
      } else {
        setMessage({ type: "error", text: "Failed to delete account" });
      }
    } catch (error) {
      console.error("Delete account error:", error);
      setMessage({ type: "error", text: "Failed to delete account" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">⚔️</span>
            </div>
          </div>
          <p className="text-white text-lg font-medium">Loading your adventure...</p>
          <p className="text-slate-400 text-sm mt-2">Prepare for battle!</p>
        </div>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Failed to load game</p>
          <button
            onClick={loadGame}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105"
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  const getEnemyMaxHealth = (level: number) => 30 + level * 15;

  // Get enemy emoji
  const getEnemyEmoji = (enemy: string): string => {
    const emojiMap: Record<string, string> = {
      "Goblin": "👺",
      "Orc": "👹",
      "Dragon": "🐉",
      "Skeleton": "💀",
      "Dark Knight": "👤",
      "Demon": "👿",
      "Troll": "🎭",
      "Witch": "🧙‍♀️",
      "Vampire": "🧛",
      "Werewolf": "🐺",
      "Warrior": "⚔️",
      "Zombie": "🧟",
      "Assassin": "🗡️",
      "Hunter": "🏹",
    };
    return emojiMap[enemy] || "👾";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/game logo.png" alt="Adventure Quest Logo" className="w-10 h-10 object-contain" />
            <div>
              <span className="text-xl font-bold text-white block">Adventure Quest</span>
              <span className="text-xs text-slate-400">Battle & Conquer</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteAccount(true)}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-400 hover:text-red-300 rounded-lg transition-all text-sm flex items-center gap-2"
              title="Delete Account"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="hidden sm:inline">Delete Account</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 text-slate-300 hover:text-white rounded-lg transition-all text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="relative container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <LevelBadge level={gameState.level} />
            <PotionBadge count={gameState.potions} />
            <div className="bg-gradient-to-br from-blue-900/40 to-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-blue-700/30 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-lg">🛡️</span>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Attack</p>
                  <p className="text-lg font-bold text-blue-400">{ATTACK_DAMAGE_MIN}-{ATTACK_DAMAGE_MAX}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-900/40 to-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-orange-700/30 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Enemy DMG</p>
                  <p className="text-lg font-bold text-orange-400">{ENEMY_ATTACK_MIN}-{ENEMY_ATTACK_MAX}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Battle Arena */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-700/50 shadow-2xl mb-8">
            {/* Battle Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">⚔️ Battle Arena ⚔️</span>
              </h2>
              <p className="text-slate-400 text-sm">Defeat enemies to level up!</p>
            </div>

            {/* Player vs Enemy Display */}
            <div className="grid md:grid-cols-3 gap-6 items-center mb-8">
              {/* Player */}
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-green-900/30 to-slate-800/30 rounded-2xl p-4 border border-green-700/30">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25 mb-3 border-4 border-green-400/30">
                      <span className="text-5xl md:text-6xl">🧙‍♂️</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Hero</h3>
                    <p className="text-xs text-slate-400 mb-3">Level {gameState.level}</p>
                    <HealthBar current={gameState.health} max={MAX_HEALTH} color="green" />
                  </div>
                </div>
              </div>

              {/* VS */}
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/25 animate-pulse">
                    <span className="text-3xl font-black text-white italic">VS</span>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>

              {/* Enemy */}
              <div className="order-3">
                <div className="bg-gradient-to-br from-red-900/30 to-slate-800/30 rounded-2xl p-4 border border-red-700/30">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/25 mb-3 border-4 border-red-400/30">
                      <span className="text-5xl md:text-6xl">{getEnemyEmoji(gameState.enemy)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{gameState.enemy}</h3>
                    <p className="text-xs text-slate-400 mb-3">Level {gameState.level}</p>
                    <HealthBar current={gameState.enemyHealth} max={getEnemyMaxHealth(gameState.level)} color="red" />
                  </div>
                </div>
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`rounded-xl p-4 text-center mb-6 ${
                message.type === "success" ? "bg-green-500/20 border border-green-500/50" :
                message.type === "error" ? "bg-red-500/20 border border-red-500/50" :
                message.type === "warning" ? "bg-yellow-500/20 border border-yellow-500/50" :
                "bg-blue-500/20 border border-blue-500/50"
              }`}>
                <p className={`text-sm md:text-base ${
                  message.type === "success" ? "text-green-300" :
                  message.type === "error" ? "text-red-300" :
                  message.type === "warning" ? "text-yellow-300" :
                  "text-blue-300"
                }`}>{message.text}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ActionButton
              onClick={() => handleAction("attack")}
              disabled={!!actionLoading || gameState.health <= 0}
              icon={<span className="text-2xl">⚔️</span>}
              label="Attack"
              description={`Deal ${ATTACK_DAMAGE_MIN}-${ATTACK_DAMAGE_MAX} DMG`}
              variant="danger"
              loading={actionLoading === "attack"}
            />

            <ActionButton
              onClick={() => handleAction("potion")}
              disabled={
                !!actionLoading ||
                gameState.potions <= 0 ||
                gameState.health >= 100 ||
                gameState.health <= 0
              }
              icon={<span className="text-2xl">🧪</span>}
              label="Drink Potion"
              description={`+${POTION_HEAL} HP (${gameState.potions} left)`}
              variant="success"
              loading={actionLoading === "potion"}
            />

            <ActionButton
              onClick={() => handleAction("run")}
              disabled={!!actionLoading || gameState.health <= 0}
              icon={<span className="text-2xl">🏃</span>}
              label="Run Away"
              description="50% escape chance"
              variant="secondary"
              loading={actionLoading === "run"}
            />

            <div className="bg-gradient-to-br from-purple-900/40 to-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-purple-700/30 shadow-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-1">Next Level</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl">⬆️</span>
                  <span className="text-2xl font-bold text-purple-400">{gameState.level + 1}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">💡</span> Battle Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚔️</span>
                <div>
                  <p className="text-white font-medium text-sm">Attack Strategy</p>
                  <p className="text-slate-400 text-xs">Deal 10-50 damage, but expect counter-attacks!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🧪</span>
                <div>
                  <p className="text-white font-medium text-sm">Potion Management</p>
                  <p className="text-slate-400 text-xs">50% chance to drop potions. Use wisely!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏃</span>
                <div>
                  <p className="text-white font-medium text-sm">Escape Option</p>
                  <p className="text-slate-400 text-xs">50% chance to escape and find a new enemy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Game Over Modal */}
      {showGameOver && (
        <GameOverModal
          level={gameState.level}
          enemy={gameState.enemy}
          onContinue={handleContinue}
        />
      )}

      {/* Victory Modal */}
      {showVictory && (
        <VictoryModal
          level={gameState.level}
          enemy={gameState.enemy}
          onClose={() => setShowVictory(false)}
        />
      )}

      {/* Delete Account Modal */}
      {showDeleteAccount && (
        <DeleteAccountModal
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteAccount(false)}
        />
      )}
    </div>
  );
}
