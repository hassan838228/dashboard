const redis = require('redis');
const { logger } = require('../utils/logger');

let client;

const connectRedis = async () => {
  try {
    if (!client) {
      client = redis.createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        retry_strategy: (options) => {
          if (options.error && options.error.code === 'ECONNREFUSED') {
            logger.error('Redis connection refused');
            return 5000;
          }
          if (options.total_retry_time > 1000 * 60 * 60) {
            logger.error('Redis retry time exhausted');
            return undefined;
          }
          if (options.attempt > 10) {
            logger.error('Redis max retry attempts reached');
            return undefined;
          }
          return Math.min(options.attempt * 100, 3000);
        }
      });

      client.on('error', (err) => {
        logger.error('Redis client error:', err);
      });

      client.on('connect', () => {
        logger.info('Connected to Redis');
      });

      client.on('ready', () => {
        logger.info('Redis client ready');
      });

      client.on('end', () => {
        logger.info('Redis connection ended');
      });

      await client.connect();
    }
    return client;
  } catch (error) {
    logger.error('Redis connection failed:', error);
    throw error;
  }
};

const disconnectRedis = async () => {
  if (client) {
    await client.disconnect();
    logger.info('Disconnected from Redis');
  }
};

const getRedis = () => {
  if (!client) {
    throw new Error('Redis not connected. Call connectRedis() first.');
  }
  return client;
};

// Cache helper functions
const cache = {
  async get(key) {
    try {
      const client = getRedis();
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  },

  async set(key, value, ttl = 3600) {
    try {
      const client = getRedis();
      await client.setEx(key, ttl, JSON.stringify(value));
      return true;
    } catch (error) {
      logger.error('Cache set error:', error);
      return false;
    }
  },

  async del(key) {
    try {
      const client = getRedis();
      await client.del(key);
      return true;
    } catch (error) {
      logger.error('Cache delete error:', error);
      return false;
    }
  },

  async exists(key) {
    try {
      const client = getRedis();
      const exists = await client.exists(key);
      return exists === 1;
    } catch (error) {
      logger.error('Cache exists error:', error);
      return false;
    }
  },

  async increment(key, value = 1) {
    try {
      const client = getRedis();
      return await client.incrBy(key, value);
    } catch (error) {
      logger.error('Cache increment error:', error);
      return 0;
    }
  },

  async expire(key, ttl) {
    try {
      const client = getRedis();
      await client.expire(key, ttl);
      return true;
    } catch (error) {
      logger.error('Cache expire error:', error);
      return false;
    }
  }
};

module.exports = {
  connectRedis,
  disconnectRedis,
  getRedis,
  cache,
};