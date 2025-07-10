import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

export default function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className="bg-gray-50 dark:bg-dark-100 border-t border-gray-200 dark:border-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-discord-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold gradient-text">BotPlatform</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              {t('hero.description')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-discord-600 dark:hover:text-discord-400">
                  {t('nav.dashboard')}
                </Link>
              </li>
              <li>
                <Link href="/premium" className="text-gray-600 dark:text-gray-400 hover:text-discord-600 dark:hover:text-discord-400">
                  {t('nav.premium')}
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:text-discord-600 dark:hover:text-discord-400">
                  {t('nav.docs')}
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-600 dark:text-gray-400 hover:text-discord-600 dark:hover:text-discord-400">
                  {t('nav.support')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-discord-600 dark:hover:text-discord-400">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-discord-600 dark:hover:text-discord-400">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-discord-600 dark:hover:text-discord-400">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-200">
          <p className="text-center text-gray-600 dark:text-gray-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}