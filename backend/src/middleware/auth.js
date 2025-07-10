const jwt = require('jsonwebtoken');
const { getDB } = require('../config/database');
const { cache } = require('../config/redis');
const { logger } = require('../utils/logger');

// Protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route',
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if token is blacklisted
      const isBlacklisted = await cache.exists(`blacklist:${token}`);
      if (isBlacklisted) {
        return res.status(401).json({
          success: false,
          error: 'Token has been revoked',
        });
      }

      // Check cache first
      let user = await cache.get(`user:${decoded.id}`);
      
      if (!user) {
        // Get user from database
        const db = getDB();
        user = await db.user.findUnique({
          where: { id: decoded.id },
          select: {
            id: true,
            discordId: true,
            username: true,
            email: true,
            avatar: true,
            isActive: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        if (!user) {
          return res.status(401).json({
            success: false,
            error: 'User not found',
          });
        }

        // Cache user for 15 minutes
        await cache.set(`user:${decoded.id}`, user, 900);
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          error: 'Account has been deactivated',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      logger.error('JWT verification error:', error);
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route',
      });
    }
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'User role is not authorized to access this route',
      });
    }

    next();
  };
};

// Check if user owns the server or has admin permissions
const checkServerPermissions = async (req, res, next) => {
  try {
    const serverId = req.params.serverId || req.body.serverId;
    const userId = req.user.id;

    if (!serverId) {
      return res.status(400).json({
        success: false,
        error: 'Server ID is required',
      });
    }

    // Check cache first
    const cacheKey = `server_permissions:${userId}:${serverId}`;
    let hasPermissions = await cache.get(cacheKey);

    if (hasPermissions === null) {
      const db = getDB();
      
      // Check if user has server in database
      const serverUser = await db.serverUser.findFirst({
        where: {
          userId: userId,
          serverId: serverId,
          OR: [
            { isOwner: true },
            { hasAdminPermissions: true },
          ],
        },
      });

      hasPermissions = !!serverUser;
      
      // Cache for 5 minutes
      await cache.set(cacheKey, hasPermissions, 300);
    }

    if (!hasPermissions) {
      return res.status(403).json({
        success: false,
        error: 'You do not have permission to access this server',
      });
    }

    req.serverId = serverId;
    next();
  } catch (error) {
    logger.error('Server permissions check error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

// Rate limiting for specific actions
const actionRateLimit = (action, maxAttempts = 5, windowMs = 900000) => {
  return async (req, res, next) => {
    try {
      const key = `rate_limit:${action}:${req.user.id}`;
      const attempts = await cache.increment(key);
      
      if (attempts === 1) {
        await cache.expire(key, Math.floor(windowMs / 1000));
      }
      
      if (attempts > maxAttempts) {
        return res.status(429).json({
          success: false,
          error: `Too many ${action} attempts. Try again later.`,
        });
      }
      
      next();
    } catch (error) {
      logger.error('Action rate limit error:', error);
      next();
    }
  };
};

module.exports = {
  protect,
  authorize,
  checkServerPermissions,
  actionRateLimit,
};