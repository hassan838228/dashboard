import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Statistics() {
  const [counters, setCounters] = useState({
    servers: 0,
    users: 0,
    commands: 0,
    uptime: 0,
  })

  const finalValues = {
    servers: 10247,
    users: 524891,
    commands: 52,
    uptime: 99.9,
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounters({
        servers: Math.floor(finalValues.servers * progress),
        users: Math.floor(finalValues.users * progress),
        commands: Math.floor(finalValues.commands * progress),
        uptime: parseFloat((finalValues.uptime * progress).toFixed(1)),
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounters(finalValues)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      label: 'Active Servers',
      value: counters.servers.toLocaleString(),
      suffix: '+',
      icon: '🚀',
      color: 'from-blue-500 to-purple-500',
    },
    {
      label: 'Protected Users',
      value: counters.users.toLocaleString(),
      suffix: '+',
      icon: '👥',
      color: 'from-green-500 to-blue-500',
    },
    {
      label: 'Bot Commands',
      value: counters.commands.toString(),
      suffix: '+',
      icon: '⚡',
      color: 'from-yellow-500 to-red-500',
    },
    {
      label: 'Uptime',
      value: counters.uptime.toString(),
      suffix: '%',
      icon: '⏱️',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-dark-100 dark:to-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trusted by Thousands
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join the community of Discord server owners who trust our platform for their moderation needs
          </motion.p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-dark-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-200 group-hover:border-discord-300 dark:group-hover:border-discord-700">
                {/* Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>

                {/* Value */}
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}{stat.suffix}
                </div>

                {/* Label */}
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-discord-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 dark:text-gray-400">Real-time Protection</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 dark:text-gray-400">24/7 Monitoring</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 dark:text-gray-400">Global Coverage</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}