# 🤖 Discord Bot Platform

A comprehensive Discord bot platform with advanced moderation, security features, and a modern web dashboard. Built with Next.js, Node.js, and Discord.js.

## ✨ Features

### 🛡️ Advanced Security
- **Anti-Raid Protection**: Advanced algorithms to detect and stop raids
- **Auto Moderation**: Intelligent spam detection and content filtering
- **Heat System**: Adaptive algorithm that adjusts to user behavior
- **Join Gate**: Monitor and filter new members
- **Verification System**: Custom captcha and verification options

### 📊 Comprehensive Dashboard
- **Modern UI**: Clean, responsive design with dark/light mode
- **Multi-Language Support**: Arabic, English, Spanish, French
- **Real-time Stats**: Live server analytics and member activity
- **Role Management**: Automated role assignment and permissions
- **Custom Commands**: Create and manage bot commands

### 🌍 Multi-Language Support
- **RTL Support**: Full right-to-left text support for Arabic
- **Dynamic Translation**: Real-time language switching
- **Localized Content**: All bot messages and dashboard content

### 🎮 FiveM Integration (Optional)
- **Real-time Sync**: Connect FiveM servers with Discord
- **Role Synchronization**: Auto-sync jobs and roles
- **Player Status**: Live player monitoring

### 💎 Premium Features
- **Advanced Analytics**: Detailed server insights
- **Custom Verification**: Customizable verification system
- **Backup & Restore**: Server backup functionality
- **Priority Support**: 24/7 premium support

## 🏗️ Project Structure

```
discord-bot-platform/
├── frontend/              # Next.js Frontend
│   ├── components/        # React components
│   ├── pages/            # Next.js pages
│   ├── styles/           # CSS styles
│   ├── public/           # Static assets
│   └── locales/          # Translation files
├── backend/              # Node.js API
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Express middleware
│   │   ├── config/       # Database & Redis config
│   │   └── utils/        # Utility functions
├── bot/                  # Discord Bot
│   ├── src/
│   │   ├── commands/     # Bot commands
│   │   ├── events/       # Discord events
│   │   ├── handlers/     # Command & event handlers
│   │   └── utils/        # Bot utilities
├── database/             # Database schemas
│   ├── migrations/       # Prisma migrations
│   └── seeds/           # Database seeds
└── docs/                # Documentation
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **Redis** (v6 or higher)
- **Discord Bot Token**
- **Discord Application** (OAuth2 configured)

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/discord-bot-platform.git
cd discord-bot-platform
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm run install:all

# Or install individually
cd frontend && npm install
cd ../backend && npm install
cd ../bot && npm install
```

### 3. Environment Setup

```bash
# Copy environment files
npm run setup:env

# Edit environment variables
nano .env
nano frontend/.env
nano backend/.env
nano bot/.env
```

### 4. Database Setup

```bash
# Navigate to backend
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

### 5. Start Development Servers

```bash
# Start all services
npm run dev

# Or start individually
npm run dev:frontend    # Frontend (http://localhost:3000)
npm run dev:backend     # Backend API (http://localhost:3001)
npm run dev:bot         # Discord Bot
```

## 🔧 Configuration

### Discord Application Setup

1. **Create Discord Application**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create new application
   - Note down Client ID and Client Secret

2. **Bot Configuration**
   - Go to Bot section
   - Create bot and copy token
   - Enable required intents:
     - Message Content Intent
     - Server Members Intent
     - Presence Intent

3. **OAuth2 Setup**
   - Add redirect URI: `http://localhost:3000/auth/callback`
   - Select required scopes: `identify`, `email`, `guilds`

### Environment Variables

#### Main Project (.env)
```env
NODE_ENV=development
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=http://localhost:3000/auth/callback
DATABASE_URL=postgresql://username:password@localhost:5432/discord_bot_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_super_secret_jwt_key_here
BOT_TOKEN=your_discord_bot_token
```

#### Frontend (.env)
```env
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

#### Backend (.env)
```env
PORT=3001
DATABASE_URL=postgresql://username:password@localhost:5432/discord_bot_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_super_secret_jwt_key_here
DISCORD_BOT_TOKEN=your_discord_bot_token
CORS_ORIGIN=http://localhost:3000
```

#### Bot (.env)
```env
DISCORD_TOKEN=your_discord_bot_token
PREFIX=!
BACKEND_URL=http://localhost:3001
DATABASE_URL=postgresql://username:password@localhost:5432/discord_bot_db
```

## 📚 API Documentation

### Authentication Endpoints

```http
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me
```

### Discord Endpoints

```http
GET  /api/discord/guilds
GET  /api/discord/guild/:id
POST /api/discord/guild/:id/settings
GET  /api/discord/user
```

### Server Management

```http
GET    /api/servers
GET    /api/servers/:id
PUT    /api/servers/:id
DELETE /api/servers/:id
POST   /api/servers/:id/commands
GET    /api/servers/:id/logs
```

### Moderation

```http
POST /api/moderation/ban
POST /api/moderation/kick
POST /api/moderation/mute
POST /api/moderation/warn
GET  /api/moderation/actions
```

## 🤖 Bot Commands

### Moderation Commands

```
!ban @user [reason]           # Ban a user
!kick @user [reason]          # Kick a user
!mute @user [time] [reason]   # Mute a user
!warn @user [reason]          # Warn a user
!clear [amount]               # Clear messages
```

### Utility Commands

```
!help                         # Show help menu
!ping                         # Check bot latency
!info                         # Server information
!userinfo @user               # User information
!avatar @user                 # User avatar
```

### Custom Commands

```
!addcmd [name] [response]     # Add custom command
!delcmd [name]                # Delete custom command
!listcmds                     # List custom commands
!editcmd [name] [response]    # Edit custom command
```

### Settings Commands

```
!settings                     # View server settings
!prefix [new_prefix]          # Change bot prefix
!language [lang]              # Change bot language
!welcome [channel]            # Set welcome channel
!logs [channel]               # Set logs channel
```

## 🎨 Frontend Components

### Core Components

- **Layout**: Main layout wrapper with navigation
- **Navbar**: Navigation bar with auth and language switching
- **Footer**: Site footer with links
- **Hero**: Landing page hero section
- **Features**: Feature showcase grid
- **Statistics**: Animated statistics counters

### Dashboard Components

- **DashboardLayout**: Dashboard-specific layout
- **ServerSelector**: Server selection dropdown
- **ServerOverview**: Server statistics and overview
- **SettingsPanel**: Configuration panels
- **LogsViewer**: Real-time logs display

### Form Components

- **CommandEditor**: Custom command creation
- **RoleManager**: Role assignment interface
- **PermissionEditor**: Permission configuration
- **LanguageSelector**: Language switching component

## 🗄️ Database Schema

### Users Table
```sql
User {
  id          String   @id @default(cuid())
  discordId   String   @unique
  username    String
  email       String?
  avatar      String?
  isActive    Boolean  @default(true)
  role        Role     @default(USER)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Servers Table
```sql
Server {
  id            String    @id @default(cuid())
  discordId     String    @unique
  name          String
  icon          String?
  ownerId       String
  prefix        String    @default("!")
  language      String    @default("en")
  isActive      Boolean   @default(true)
  features      Json      @default("{}")
  settings      Json      @default("{}")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Commands Table
```sql
CustomCommand {
  id          String   @id @default(cuid())
  serverId    String
  name        String
  response    String
  isActive    Boolean  @default(true)
  usageCount  Int      @default(0)
  createdBy   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔐 Security Features

### Authentication
- JWT-based authentication
- Refresh token rotation
- Session management
- OAuth2 with Discord

### Authorization
- Role-based access control
- Server permission checks
- Rate limiting
- Action throttling

### Data Protection
- Input validation
- SQL injection prevention
- XSS protection
- CSRF tokens

### Bot Security
- Permission validation
- Command cooldowns
- Spam detection
- Anti-raid measures

## 🚀 Deployment

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Build backend (if needed)
cd ../backend
npm run build

# Start production servers
npm run start:frontend
npm run start:backend
npm run start:bot
```

### Docker Deployment

```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
  
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
  
  bot:
    build: ./bot
    environment:
      - NODE_ENV=production
  
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: discord_bot_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
  
  redis:
    image: redis:alpine
```

### Environment Setup

```bash
# Production environment
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://api.yourdomain.com
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://redis-host:6379
```

## 📊 Monitoring & Logging

### Application Logs
- Winston logging with file rotation
- Error tracking and alerts
- Performance monitoring
- User activity logging

### Bot Monitoring
- Command usage statistics
- Error rate monitoring
- Performance metrics
- Uptime tracking

### Dashboard Analytics
- User engagement metrics
- Feature usage statistics
- Performance monitoring
- Error tracking

## 🛠️ Development

### Code Standards
- ESLint configuration
- Prettier formatting
- TypeScript support
- Git hooks for quality

### Testing
```bash
# Run tests
npm test

# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test

# Bot tests
cd bot && npm test
```

### Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Documentation**: [docs.yourdomain.com](https://docs.yourdomain.com)
- **Discord Server**: [discord.gg/yourserver](https://discord.gg/yourserver)
- **Email Support**: support@yourdomain.com
- **GitHub Issues**: [github.com/yourusername/discord-bot-platform/issues](https://github.com/yourusername/discord-bot-platform/issues)

## 🎯 Roadmap

### Version 1.1
- [ ] Voice channel management
- [ ] Advanced automod filters
- [ ] Custom embed builder
- [ ] Ticket system

### Version 1.2
- [ ] Music bot integration
- [ ] Economy system
- [ ] Leveling system
- [ ] Custom badges

### Version 2.0
- [ ] Plugin system
- [ ] Advanced analytics
- [ ] AI-powered moderation
- [ ] Mobile app

---

**Made with ❤️ by the Discord Bot Platform Team**