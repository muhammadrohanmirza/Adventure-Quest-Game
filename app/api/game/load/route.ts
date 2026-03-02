import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const gameProgress = await prisma.gameProgress.findUnique({
      where: { userId: session.user.id },
    });

    if (!gameProgress) {
      return NextResponse.json(
        { error: "Game progress not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      level: gameProgress.level,
      health: gameProgress.health,
      potions: gameProgress.potions,
      enemy: gameProgress.enemy,
      enemyHealth: gameProgress.enemyHealth,
    });
  } catch (error) {
    console.error("Game load error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
