import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon, 
  BoltIcon, 
  GlobeAltIcon,
  UsersIcon 
} from '@heroicons/react/24/outline'

export default function Hero() {
  const { t } = useTranslation('common')

  const floatingIcons = [
    { Icon: ShieldCheckIcon, delay: 0 },
    { Icon: BoltIcon, delay: 0.2 },
    { Icon: GlobeAltIcon, delay: 0.4 },
    { Icon: UsersIcon, delay: 0.6 },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-dark-50 dark:via-dark-100 dark:to-dark-200">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Floating Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingIcons.map(({ Icon, delay }, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: `${20 + index * 20}%`,
                  top: `${30 + (index % 2) * 40}%`,
                }}
                initial={{ y: 0, opacity: 0.3 }}
                animate={{ 
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay,
                }}
              >
                <Icon className="w-8 h-8 text-discord-500" />
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="gradient-text">{t('hero.title')}</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300">
                {t('hero.subtitle')}
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t('hero.addToDiscord')}
            </Link>
            <Link
              href="/dashboard"
              className="btn-secondary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300"
            >
              {t('hero.getStarted')}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { label: 'Servers', value: '10K+' },
              { label: 'Users', value: '500K+' },
              { label: 'Commands', value: '50+' },
              { label: 'Uptime', value: '99.9%' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-discord-600 dark:text-discord-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}