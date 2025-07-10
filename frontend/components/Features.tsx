import React from 'react'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  BoltIcon,
  DocumentTextIcon,
  CommandLineIcon,
  UsersIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

export default function Features() {
  const { t } = useTranslation('common')

  const features = [
    {
      icon: ShieldCheckIcon,
      title: t('features.antiRaid.title'),
      description: t('features.antiRaid.description'),
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      icon: BoltIcon,
      title: t('features.autoMod.title'),
      description: t('features.autoMod.description'),
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      icon: DocumentTextIcon,
      title: t('features.logging.title'),
      description: t('features.logging.description'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: CommandLineIcon,
      title: t('features.customCommands.title'),
      description: t('features.customCommands.description'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      icon: UsersIcon,
      title: t('features.roleManagement.title'),
      description: t('features.roleManagement.description'),
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: GlobeAltIcon,
      title: t('features.multiLanguage.title'),
      description: t('features.multiLanguage.description'),
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
  ]

  return (
    <section className="py-24 bg-white dark:bg-dark-50">
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
            {t('features.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('features.subtitle')}
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-dark-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-200 group-hover:border-discord-300 dark:group-hover:border-discord-700 h-full">
                {/* Icon */}
                <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-discord-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Ready to enhance your Discord server?
          </p>
          <button className="btn-primary text-lg px-8 py-4">
            Explore All Features
          </button>
        </motion.div>
      </div>
    </section>
  )
}