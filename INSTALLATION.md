# 🚀 Installation Guide - Discord Bot Platform

This guide will help you set up the Discord Bot Platform on your local machine or server.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

### Required Software
- **Node.js** v18.0.0 or higher
- **npm** v8.0.0 or higher
- **PostgreSQL** v14.0 or higher
- **Redis** v6.0 or higher
- **Git** (latest version)

### Discord Setup
- Discord account
- Discord Server (for testing)
- Discord Developer Account

## 🔧 Step-by-Step Installation

### 1. Create Discord Application

1. **Go to Discord Developer Portal**
   ```
   https://discord.com/developers/applications
   ```

2. **Create New Application**
   - Click "New Application"
   - Enter your bot name
   - Click "Create"

3. **Get Application Credentials**
   - Copy `Application ID` (Client ID)
   - Go to OAuth2 → General
   - Copy `Client Secret`

4. **Create Bot User**
   - Go to "Bot" section
   - Click "Add Bot"
   - Copy `Bot Token`
   - Enable all Privileged Gateway Intents:
     - ✅ Presence Intent
     - ✅ Server Members Intent
     - ✅ Message Content Intent

5. **Setup OAuth2 Redirects**
   - Go to OAuth2 → General
   - Add redirect URL: `http://localhost:3000/api/auth/callback/discord`

### 2. Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/discord-bot-platform.git

# Navigate to project directory
cd discord-bot-platform

# Check if all directories exist
ls -la
```

### 3. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install bot dependencies
cd ../bot
npm install

# Return to root directory
cd ..
```

### 4. Database Setup

#### PostgreSQL Installation

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS (Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download and install from [PostgreSQL Official Site](https://www.postgresql.org/download/windows/)

#### Create Database

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE discord_bot_db;
CREATE USER bot_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE discord_bot_db TO bot_user;

# Exit PostgreSQL
\q
```

### 5. Redis Setup

#### Redis Installation

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

**macOS (Homebrew):**
```bash
brew install redis
brew services start redis
```

**Windows:**
Download from [Redis GitHub Releases](https://github.com/microsoftarchive/redis/releases)

#### Test Redis Connection

```bash
redis-cli ping
# Should return: PONG
```

### 6. Environment Configuration

#### Main Project Environment

```bash
# Copy environment template
cp .env.example .env

# Edit environment file
nano .env
```

**Configure .env:**
```env
# Discord Configuration
DISCORD_CLIENT_ID=your_application_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here
DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/callback/discord

# Database Configuration
DATABASE_URL=postgresql://bot_user:your_secure_password@localhost:5432/discord_bot_db
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your_super_long_random_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Bot Configuration
BOT_TOKEN=your_discord_bot_token_here
BOT_PREFIX=!
OWNER_ID=your_discord_user_id

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
BOT_API_URL=http://localhost:3002
```

#### Frontend Environment

```bash
# Copy frontend environment template
cp frontend/.env.example frontend/.env

# Edit frontend environment
nano frontend/.env
```

**Configure frontend/.env:**
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key_here

# Discord OAuth
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_application_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here

# API URLs
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

#### Backend Environment

```bash
# Copy backend environment template
cp backend/.env.example backend/.env

# Edit backend environment
nano backend/.env
```

**Configure backend/.env:**
```env
# Server Configuration
NODE_ENV=development
PORT=3001
HOST=localhost

# Database & Redis
DATABASE_URL=postgresql://bot_user:your_secure_password@localhost:5432/discord_bot_db
REDIS_URL=redis://localhost:6379

# Discord Configuration
DISCORD_CLIENT_ID=your_application_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here
DISCORD_BOT_TOKEN=your_discord_bot_token_here

# Security
JWT_SECRET=your_super_long_random_jwt_secret_key_here
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

# CORS
CORS_ORIGIN=http://localhost:3000
TRUST_PROXY=true

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Bot Environment

```bash
# Copy bot environment template
cp bot/.env.example bot/.env

# Edit bot environment
nano bot/.env
```

**Configure bot/.env:**
```env
# Discord Bot Configuration
DISCORD_TOKEN=your_discord_bot_token_here
PREFIX=!
OWNER_ID=your_discord_user_id

# Database
DATABASE_URL=postgresql://bot_user:your_secure_password@localhost:5432/discord_bot_db

# API Configuration
BACKEND_URL=http://localhost:3001
BOT_API_PORT=3002

# Environment
NODE_ENV=development
LOG_LEVEL=info
```

### 7. Database Migration

```bash
# Navigate to backend directory
cd backend

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with initial data (optional)
npx prisma db seed

# Return to root directory
cd ..
```

### 8. Start Development Servers

#### Option 1: Start All Services Together

```bash
# Start all services with concurrently
npm run dev
```

#### Option 2: Start Services Individually

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Bot:**
```bash
cd bot
npm run dev
```

### 9. Verify Installation

#### Check Service Health

1. **Frontend**: http://localhost:3000
   - Should display landing page
   - Language switching should work
   - Dark/light mode toggle should work

2. **Backend API**: http://localhost:3001/health
   - Should return JSON health status

3. **Bot Status**: Check your Discord server
   - Bot should appear online
   - Test with `!ping` command

#### Test Authentication

1. **Visit Frontend**: http://localhost:3000
2. **Click "Login with Discord"**
3. **Authorize Application**
4. **Check Dashboard Access**: http://localhost:3000/dashboard

### 10. Invite Bot to Server

1. **Generate Invite URL**:
   ```
   https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
   ```

2. **Replace `YOUR_CLIENT_ID`** with your actual Discord Application ID

3. **Visit URL and Add Bot** to your test server

4. **Test Bot Commands**:
   ```
   !ping
   !help
   !info
   ```

## 🛠️ Troubleshooting

### Common Issues

#### Database Connection Error
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check if database exists
sudo -u postgres psql -l

# Test connection
psql -h localhost -U bot_user -d discord_bot_db
```

#### Redis Connection Error
```bash
# Check Redis status
sudo systemctl status redis-server

# Test Redis connection
redis-cli ping
```

#### Bot Not Responding
- Verify bot token in environment files
- Check bot permissions in Discord server
- Ensure all intents are enabled
- Check console for error messages

#### Frontend Build Errors
```bash
# Clear Next.js cache
cd frontend
rm -rf .next
npm run build
```

#### Backend API Errors
```bash
# Check logs
cd backend
tail -f logs/combined.log
```

### Environment Variables Validation

Create a script to validate your environment:

```bash
# Create validation script
cat > validate-env.js << 'EOF'
const requiredEnvVars = [
  'DISCORD_CLIENT_ID',
  'DISCORD_CLIENT_SECRET',
  'BOT_TOKEN',
  'DATABASE_URL',
  'REDIS_URL',
  'JWT_SECRET'
];

console.log('🔍 Validating environment variables...\n');

let missingVars = [];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    missingVars.push(varName);
    console.log(`❌ ${varName}: Missing`);
  } else {
    console.log(`✅ ${varName}: Set`);
  }
});

if (missingVars.length > 0) {
  console.log(`\n❌ Missing ${missingVars.length} required environment variables`);
  process.exit(1);
} else {
  console.log('\n✅ All required environment variables are set!');
}
EOF

# Run validation
node validate-env.js
```

## 🚀 Production Deployment

### Environment Setup

```bash
# Production environment variables
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://api.yourdomain.com

# Update Discord OAuth redirect
DISCORD_REDIRECT_URI=https://yourdomain.com/api/auth/callback/discord
```

### Build for Production

```bash
# Build frontend
cd frontend
npm run build

# Start production server
npm start
```

### Process Management

```bash
# Install PM2 for process management
npm install -g pm2

# Start services with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup
```

### SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot

# Generate SSL certificate
sudo certbot certonly --standalone -d yourdomain.com -d api.yourdomain.com

# Configure Nginx reverse proxy
sudo nano /etc/nginx/sites-available/discord-bot-platform
```

## 📊 Monitoring

### Log Files Locations

- **Frontend**: `frontend/.next/`
- **Backend**: `backend/logs/`
- **Bot**: `bot/logs/`

### Health Check Endpoints

- **Backend**: `GET /health`
- **Bot**: WebSocket connection status
- **Database**: Connection pool status
- **Redis**: Cache hit/miss rates

## 🆘 Getting Help

If you encounter issues during installation:

1. **Check the logs** for error messages
2. **Verify environment variables** are correctly set
3. **Ensure all prerequisites** are installed
4. **Check Discord API status** at https://discordstatus.com
5. **Review the troubleshooting section** above

### Support Channels

- **GitHub Issues**: Report bugs and issues
- **Discord Server**: Join our community for help
- **Email Support**: Contact technical support team

---

**🎉 Congratulations!** 

Your Discord Bot Platform should now be running successfully. You can access:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Documentation**: http://localhost:3000/docs
- **Dashboard**: http://localhost:3000/dashboard

Happy coding! 🚀