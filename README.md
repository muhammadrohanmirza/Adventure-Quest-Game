# ⚔️ Adventure Quest

**Epic Text-Based Adventure Game Built with Next.js 14+**

---

## 🎮 Overview

Adventure Quest is a production-ready, authenticated web-based adventure game where players battle fierce enemies, level up their characters, and collect powerful potions. Built with modern web technologies, it features persistent game progress, secure authentication, and a beautiful responsive UI.

---

## ✨ Features

### 🔐 Authentication System
- **Secure Sign Up** - Email/password registration with bcrypt password hashing
- **Login/Logout** - Session management with NextAuth
- **Protected Routes** - Game dashboard only accessible to authenticated users
- **Delete Account** - Users can permanently delete their account and data

### 🎮 Game Mechanics
- **Turn-Based Combat** - Attack enemies and deal 10-50 damage per turn
- **Enemy Variety** - 14 different enemy types (Goblin, Dragon, Demon, Vampire, etc.)
- **Level Progression** - Level up by defeating enemies
- **Health System** - Manage your health with potions
- **Potion Drops** - 50% chance to receive potions after defeating enemies
- **Escape Mechanism** - 50% chance to run away from battle
- **Game Over & Continue** - Revive and continue your adventure

### 💾 Persistent Storage
- **PostgreSQL Database** - Reliable data storage with Neon
- **Prisma ORM** - Type-safe database operations
- **Auto-Save** - Game state saved after every action
- **Resume Anytime** - Continue your progress across sessions

### 🎨 User Interface
- **Modern Design** - Beautiful gradient backgrounds and glassmorphism effects
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Visual Feedback** - Health bars, damage indicators, and battle messages
- **Enemy Emojis** - Each enemy has a unique visual representation
- **Animated Elements** - Smooth transitions and loading states
- **Custom Favicon** - Branded logo in browser tab

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.1.6 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Authentication** | NextAuth v4 (Credentials Provider) |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma v7 |
| **Password Hashing** | bcryptjs |
| **Database Adapter** | @prisma/adapter-pg + pg |

---

## 📁 Project Structure

```
game/
├── app/
│   ├── api/
│   │   ├── account/delete/route.ts      # Delete user account
│   │   ├── auth/[...nextauth]/route.ts  # NextAuth API handler
│   │   ├── game/
│   │   │   ├── load/route.ts            # Load game state
│   │   │   └── update/route.ts          # Update game state
│   │   └── signup/route.ts              # User signup
│   ├── dashboard/
│   │   └── page.tsx                     # Main game page (protected)
│   ├── login/
│   │   └── page.tsx                     # Login page
│   ├── signup/
│   │   └── page.tsx                     # Signup page
│   ├── globals.css                      # Global styles
│   ├── icon.png                         # Favicon (game logo)
│   ├── layout.tsx                       # Root layout
│   └── page.tsx                         # Landing page
├── components/
│   ├── ActionButton.tsx                 # Battle action buttons
│   ├── DeleteAccountModal.tsx           # Account deletion confirmation
│   ├── EnemyCard.tsx                    # Enemy display component
│   ├── GameOverModal.tsx                # Game over screen
│   ├── HealthBar.tsx                    # Health bar component
│   ├── LevelBadge.tsx                   # Level display badge
│   ├── PotionBadge.tsx                  # Potion count badge
│   ├── Providers.tsx                    # NextAuth SessionProvider
│   ├── VictoryModal.tsx                 # Victory celebration modal
│   └── index.ts                         # Component exports
├── lib/
│   ├── prisma.ts                        # Prisma client singleton
│   └── types.ts                         # TypeScript types & constants
├── prisma/
│   ├── migrations/                      # Database migrations
│   └── schema.prisma                    # Database schema
├── public/
│   └── game logo.png                    # Game logo asset
├── types/
│   └── next-auth.d.ts                   # NextAuth type extensions
├── auth.ts                              # NextAuth configuration
├── prisma.config.ts                     # Prisma 7 configuration
├── .env.example                         # Environment variables template
├── SETUP.md                             # Setup instructions
└── README.md                            # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Set up Neon Database:**
   - Go to [Neon](https://neon.tech)
   - Create a free account and new project
   - Copy the connection string
   - Paste it as `DATABASE_URL` in `.env`

4. **Run Prisma migrations:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎮 How to Play

### Getting Started
1. Visit the landing page
2. Click "Sign Up" to create an account
3. Enter your email and password (min 6 characters)
4. You'll be automatically logged in and taken to the game

### Battle System
- **⚔️ Attack** - Deal 10-50 damage to the enemy
  - Enemy will counter-attack for 10-50 damage
  - Defeating enemies grants a level up
  
- **🧪 Drink Potion** - Restore 30 HP
  - Requires available potions
  - Cannot use when health is full
  
- **🏃 Run Away** - Attempt to escape (50% success)
  - Success: Find a new enemy
  - Failure: Enemy attacks you

### Progression
- **Level Up** - Defeat enemies to gain levels
- **Enemy Scaling** - Higher levels = stronger enemies
- **Potion Drops** - 50% chance after each victory
- **Health Recovery** - Small heal on victory

### Game Over
- When your health reaches 0, you're defeated
- Click "Continue Adventure" to revive
- Revival restores full health and 3 potions
- Keep your current level

---

## 📊 Database Schema

### User Model
```prisma
model User {
  id           String        @id @default(cuid())
  email        String        @unique
  password     String        // Hashed with bcrypt
  createdAt    DateTime      @default(now())
  gameProgress GameProgress?
}
```

### GameProgress Model
```prisma
model GameProgress {
  id           String @id @default(cuid())
  level        Int    @default(1)
  health       Int    @default(100)
  potions      Int    @default(3)
  enemy        String
  enemyHealth  Int
  userId       String @unique
  user         User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 🔌 API Routes

### POST /api/signup
Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

### POST /api/auth/[...nextauth]
Handle authentication (login/logout).

### GET /api/game/load
Load current user's game state.

**Response (200):**
```json
{
  "level": 5,
  "health": 80,
  "potions": 2,
  "enemy": "Dragon",
  "enemyHealth": 105
}
```

### POST /api/game/update
Update game state based on action.

**Request:**
```json
{
  "action": "attack"
}
```

**Actions:** `attack`, `potion`, `run`, `continue`

**Response (200):**
```json
{
  "success": true,
  "gameState": { ... },
  "message": "You attacked Dragon for 35 damage!",
  "damageDealt": 35,
  "damageTaken": 20,
  "potionDropped": false
}
```

### DELETE /api/account/delete
Permanently delete user account.

**Response (200):**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

## 🎨 Enemy Types

| Enemy | Emoji | Base Health |
|-------|-------|-------------|
| Goblin | 👺 | 45 |
| Orc | 👹 | 50 |
| Dragon | 🐉 | 65 |
| Skeleton | 💀 | 45 |
| Dark Knight | 🖤 | 55 |
| Demon | 👿 | 60 |
| Troll | 🧌 | 50 |
| Witch | 🧙‍♀️ | 45 |
| Vampire | 🧛 | 55 |
| Werewolf | 🐺 | 50 |
| Warrior | ⚔️ | 50 |
| Zombie | 🧟 | 45 |
| Assassin | 🗡️ | 45 |
| Hunter | 🏹 | 45 |

*Health scales with player level: `30 + (level × 15)`*

---

## 🛡️ Security Features

- **Password Hashing** - bcrypt with 12 salt rounds
- **JWT Sessions** - Secure token-based authentication
- **Server-Side Validation** - All API routes validate requests
- **SQL Injection Prevention** - Prisma parameterized queries
- **Environment Variables** - Sensitive data in `.env`
- **Cascade Deletes** - Clean data removal on account deletion

---

## 📱 Responsive Design

The game is fully responsive and works on:
- 🖥️ Desktop (1920px+)
- 💻 Laptop (1024px - 1919px)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (320px - 767px)

---

## 🧪 Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Generate Prisma Client
npx prisma generate

# Create database migration
npx prisma migrate dev --name migration_name

# Deploy migrations to production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio
```

---

## 🚀 Production Deployment

### Environment Variables
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

### Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Migration
```bash
npx prisma migrate deploy
```

---

## 📝 License

MIT License - Feel free to use this project for learning or personal use.

---

## 👨‍💻 Author

**Muhammad Rohan Mirza**

Created with ❤️ using Next.js, TypeScript, Tailwind CSS, and Prisma.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js

---

## 🎯 Future Enhancements

- [ ] Multiple game modes
- [ ] Leaderboard system
- [ ] Achievement system
- [ ] Special items and equipment
- [ ] Boss battles
- [ ] Multiplayer features
- [ ] Sound effects and music
- [ ] Character customization

---

**Embark on your heroic journey! ⚔️🧪**
"# Adventure-Quest-Game" 
