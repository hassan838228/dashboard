import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'

export default function CallToAction() {
  const { t } = useTranslation('common')

  return (
    <section className="py-24 bg-gradient-to-br from-discord-600 via-purple-600 to-blue-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to <span className="text-yellow-300">Secure</span> Your Server?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10">
            Join thousands of Discord communities that trust our platform for advanced moderation and security.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-discord-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🚀 Add Bot to Discord
            </Link>
            <Link
              href="/dashboard"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-discord-600 px-8 py-4 rounded-lg font-semibold text-lg transform hover:scale-105 transition-all duration-300"
            >
              📊 Open Dashboard
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Servers Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500K+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Users Secured</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Support</div>
            </div>
          </div>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-3xl mb-4">🛡️</div>
            <h3 className="text-lg font-semibold text-white mb-2">Advanced Security</h3>
            <p className="text-white/80">Protect against raids, spam, and malicious attacks</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-white/80">Instant response times with smart automation</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-3xl mb-4">🌍</div>
            <h3 className="text-lg font-semibold text-white mb-2">Multi-Language</h3>
            <p className="text-white/80">Support for Arabic, English, Spanish, and French</p>
          </div>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          className="mt-12 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white/90 text-sm font-medium">Trusted & Verified Bot</span>
        </motion.div>
      </div>
    </section>
  )
}