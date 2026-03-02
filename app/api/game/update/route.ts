import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getEnemyHealthForLevel, getRandomEnemy } from "@/lib/types";

const ATTACK_DAMAGE_MIN = 10;
const ATTACK_DAMAGE_MAX = 50;
const ENEMY_ATTACK_MIN = 10;
const ENEMY_ATTACK_MAX = 50;
const POTION_HEAL = 30;
const POTION_DROP_CHANCE = 50;

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action } = body;

    const gameProgress = await prisma.gameProgress.findUnique({
      where: { userId: session.user.id },
    });

    if (!gameProgress) {
      return NextResponse.json(
        { error: "Game progress not found" },
        { status: 404 }
      );
    }

    let { level, health, potions, enemy, enemyHealth } = gameProgress;
    let message = "";
    let damageDealt = 0;
    let damageTaken = 0;
    let potionDropped = false;

    switch (action) {
      case "attack": {
        damageDealt = Math.floor(Math.random() * (ATTACK_DAMAGE_MAX - ATTACK_DAMAGE_MIN + 1)) + ATTACK_DAMAGE_MIN;
        const newEnemyHealth = enemyHealth - damageDealt;

        if (newEnemyHealth <= 0) {
          // Enemy defeated
          level += 1;
          potionDropped = Math.random() * 100 < POTION_DROP_CHANCE;
          if (potionDropped) {
            potions += 1;
          }
          enemy = getRandomEnemy();
          enemyHealth = getEnemyHealthForLevel(level);
          health = Math.min(100, health + 10); // Small heal on victory
          message = `Victory! Defeated ${enemy} and reached Level ${level}!${potionDropped ? " Found a potion!" : ""}`;
        } else {
          // Enemy fights back
          damageTaken = Math.floor(Math.random() * (ENEMY_ATTACK_MAX - ENEMY_ATTACK_MIN + 1)) + ENEMY_ATTACK_MIN;
          health = Math.max(0, health - damageTaken);
          enemyHealth = newEnemyHealth;
          message = `You dealt ${damageDealt} damage! ${enemy} counter-attacked for ${damageTaken} damage.`;
        }
        break;
      }

      case "potion": {
        if (potions > 0 && health < 100) {
          potions -= 1;
          health = Math.min(100, health + POTION_HEAL);
          message = `Drank potion! Recovered ${POTION_HEAL} HP.`;
        } else {
          message = health >= 100 ? "Health is already full!" : "No potions left!";
        }
        break;
      }

      case "run": {
        const escapeChance = Math.random();
        if (escapeChance > 0.5) {
          enemy = getRandomEnemy();
          enemyHealth = getEnemyHealthForLevel(level);
          message = "Escaped successfully! A new enemy appeared!";
        } else {
          damageTaken = Math.floor(Math.random() * (ENEMY_ATTACK_MAX - ENEMY_ATTACK_MIN + 1)) + ENEMY_ATTACK_MIN;
          health = Math.max(0, health - damageTaken);
          message = `Escape failed! ${enemy} attacked for ${damageTaken} damage.`;
        }
        break;
      }

      case "continue": {
        if (health <= 0) {
          health = 100;
          potions = 3;
          enemy = getRandomEnemy();
          enemyHealth = getEnemyHealthForLevel(level);
          message = "Revived! Your adventure continues!";
        }
        break;
      }

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    const updatedProgress = await prisma.gameProgress.update({
      where: { userId: session.user.id },
      data: {
        level,
        health,
        potions,
        enemy,
        enemyHealth,
      },
    });

    return NextResponse.json({
      success: true,
      gameState: {
        level: updatedProgress.level,
        health: updatedProgress.health,
        potions: updatedProgress.potions,
        enemy: updatedProgress.enemy,
        enemyHealth: updatedProgress.enemyHealth,
      },
      message,
      damageDealt,
      damageTaken,
      potionDropped,
    });
  } catch (error) {
    console.error("Game update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
