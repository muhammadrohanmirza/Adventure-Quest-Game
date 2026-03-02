export interface GameState {
  level: number;
  health: number;
  potions: number;
  enemy: string;
  enemyHealth: number;
}

export interface GameMessage {
  type: "success" | "error" | "warning" | "info";
  text: string;
}

export interface GameActionResponse {
  success: boolean;
  gameState?: GameState;
  message?: string;
  error?: string;
  damageDealt?: number;
  damageTaken?: number;
  potionDropped?: boolean;
}

export interface ApiError {
  error: string;
}

export const ENEMIES = [
  "Goblin",
  "Orc",
  "Dragon",
  "Skeleton",
  "Dark Knight",
  "Demon",
  "Troll",
  "Witch",
  "Vampire",
  "Werewolf",
  "Warrior",
  "Zombie",
  "Assassin",
  "Hunter",
];

export const getRandomEnemy = (): string => {
  return ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
};

export const getEnemyHealthForLevel = (level: number): number => {
  return 30 + level * 15;
};

export const ENEMY_EMOJIS: Record<string, string> = {
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
