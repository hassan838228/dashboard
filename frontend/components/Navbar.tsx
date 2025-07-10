import React, { useState, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'next-themes'
import { Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

export default function Navbar() {
  const { t } = useTranslation('common')
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const currentLanguage = languages.find(lang => lang.code === router.locale) || languages[0]

  const handleLanguageChange = (locale: string) => {
    router.push(router.asPath, router.asPath, { locale })
  }

  const navItems = [
    { name: t('nav.home'), href: '/', current: router.pathname === '/' },
    { name: t('nav.dashboard'), href: '/dashboard', current: router.pathname.startsWith('/dashboard') },
    { name: t('nav.premium'), href: '/premium', current: router.pathname === '/premium' },
    { name: t('nav.docs'), href: '/docs', current: router.pathname === '/docs' },
    { name: t('nav.support'), href: '/support', current: router.pathname === '/support' },
  ]

  return (
    <nav className="bg-white/80 dark:bg-dark-100/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-discord-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold gradient-text">BotPlatform</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.current
                    ? 'text-discord-600 bg-discord-50 dark:bg-discord-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-discord-600 dark:hover:text-discord-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-discord-600 dark:hover:text-discord-400">
                <span className="text-lg">{currentLanguage.flag}</span>
                <ChevronDownIcon className="w-4 h-4" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-dark-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {languages.map((language) => (
                      <Menu.Item key={language.code}>
                        {({ active }) => (
                          <button
                            onClick={() => handleLanguageChange(language.code)}
                            className={`${
                              active ? 'bg-gray-100 dark:bg-dark-200' : ''
                            } flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                          >
                            <span className="text-lg">{language.flag}</span>
                            <span>{language.name}</span>
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-discord-600 dark:hover:text-discord-400 transition-colors"
            >
              {theme === 'dark' ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>

            {/* Auth Buttons */}
            {session ? (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-discord-600 dark:hover:text-discord-400">
                  <img
                    src={session.user?.image || '/default-avatar.png'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDownIcon className="w-4 h-4" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-dark-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard"
                            className={`${
                              active ? 'bg-gray-100 dark:bg-dark-200' : ''
                            } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                          >
                            {t('nav.dashboard')}
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/premium"
                            className={`${
                              active ? 'bg-gray-100 dark:bg-dark-200' : ''
                            } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                          >
                            {t('nav.premium')}
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={`${
                              active ? 'bg-gray-100 dark:bg-dark-200' : ''
                            } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                          >
                            {t('nav.profile')}
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className={`${
                              active ? 'bg-gray-100 dark:bg-dark-200' : ''
                            } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                          >
                            {t('nav.logout')}
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => signIn('discord')}
                  className="btn-secondary text-sm"
                >
                  {t('nav.login')}
                </button>
                <Link
                  href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  {t('nav.addBot')}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-discord-600 dark:hover:text-discord-400"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  item.current
                    ? 'text-discord-600 bg-discord-50 dark:bg-discord-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-discord-600 dark:hover:text-discord-400'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!session && (
              <div className="pt-4 space-y-2">
                <button
                  onClick={() => signIn('discord')}
                  className="w-full btn-secondary text-sm"
                >
                  {t('nav.login')}
                </button>
                <Link
                  href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full btn-primary text-sm text-center"
                >
                  {t('nav.addBot')}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}