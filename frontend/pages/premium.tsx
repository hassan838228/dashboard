import React, { useState } from 'react'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Layout from '@/components/Layout'

interface PricingPlan {
  name: string
  price: number
  yearlyPrice: number
  description: string
  features: {
    name: string
    included: boolean
    description?: string
  }[]
  popular?: boolean
  color: string
}

export default function Premium() {
  const { t } = useTranslation('common')
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  const plans: PricingPlan[] = [
    {
      name: 'Basic',
      price: 0,
      yearlyPrice: 0,
      description: 'Perfect for small communities',
      color: 'gray',
      features: [
        { name: 'Basic Moderation', included: true },
        { name: 'Welcome Messages', included: true },
        { name: 'Basic Logging', included: true },
        { name: 'Custom Commands (5)', included: true },
        { name: 'Anti-Spam', included: true },
        { name: 'Advanced Anti-Raid', included: false },
        { name: 'Premium Support', included: false },
        { name: 'Custom Verification', included: false },
        { name: 'Advanced Analytics', included: false },
        { name: 'Backup & Restore', included: false },
      ],
    },
    {
      name: 'Pro',
      price: 4.99,
      yearlyPrice: 49.99,
      description: 'Best for growing communities',
      color: 'blue',
      popular: true,
      features: [
        { name: 'All Basic Features', included: true },
        { name: 'Advanced Anti-Raid', included: true },
        { name: 'Custom Verification', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Custom Commands (25)', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Backup & Restore', included: false },
        { name: 'White-label Bot', included: false },
        { name: 'API Access', included: false },
        { name: 'Custom Integrations', included: false },
      ],
    },
    {
      name: 'Enterprise',
      price: 19.99,
      yearlyPrice: 199.99,
      description: 'For large communities and organizations',
      color: 'purple',
      features: [
        { name: 'All Pro Features', included: true },
        { name: 'Backup & Restore', included: true },
        { name: 'White-label Bot', included: true },
        { name: 'API Access', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'Unlimited Custom Commands', included: true },
        { name: '24/7 Priority Support', included: true },
        { name: 'Custom Features', included: true },
        { name: 'Dedicated Support Channel', included: true },
        { name: 'SLA Guarantee', included: true },
      ],
    },
  ]

  const getPrice = (plan: PricingPlan) => {
    return billing === 'monthly' ? plan.price : plan.yearlyPrice
  }

  const getSavings = (plan: PricingPlan) => {
    if (plan.price === 0) return 0
    const monthlyTotal = plan.price * 12
    const savings = monthlyTotal - plan.yearlyPrice
    return Math.round((savings / monthlyTotal) * 100)
  }

  return (
    <>
      <Head>
        <title>Premium Features - Discord Bot Platform</title>
        <meta name="description" content="Unlock advanced features for your Discord server with our premium plans" />
      </Head>
      
      <Layout>
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-6xl mb-6">👑</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Unlock Premium Power
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10">
                Take your Discord server to the next level with advanced security, automation, and premium support.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Billing Toggle */}
        <section className="py-12 bg-gray-50 dark:bg-dark-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-white dark:bg-dark-50 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-dark-200">
                <button
                  onClick={() => setBilling('monthly')}
                  className={`px-6 py-2 rounded-md font-medium transition-all ${
                    billing === 'monthly'
                      ? 'bg-discord-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling('yearly')}
                  className={`px-6 py-2 rounded-md font-medium transition-all ${
                    billing === 'yearly'
                      ? 'bg-discord-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Yearly
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Save up to 17%
                  </span>
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  className={`relative bg-white dark:bg-dark-50 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                    plan.popular
                      ? 'border-discord-500 ring-4 ring-discord-500/20'
                      : 'border-gray-200 dark:border-dark-200 hover:border-discord-300'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-discord-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {plan.description}
                      </p>
                      <div className="flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          ${getPrice(plan)}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 ml-2">
                          /{billing === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      {billing === 'yearly' && plan.price > 0 && (
                        <div className="mt-2">
                          <span className="text-green-600 text-sm font-medium">
                            Save {getSavings(plan)}% annually
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                            feature.included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {feature.included ? (
                              <CheckIcon className="w-3 h-3" />
                            ) : (
                              <XMarkIcon className="w-3 h-3" />
                            )}
                          </div>
                          <div className="ml-3">
                            <span className={`text-sm font-medium ${
                              feature.included ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {feature.name}
                            </span>
                            {feature.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {feature.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        plan.name === 'Basic'
                          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          : plan.popular
                          ? 'bg-discord-600 text-white hover:bg-discord-700 transform hover:scale-105'
                          : 'bg-gray-900 text-white hover:bg-gray-800 transform hover:scale-105'
                      }`}
                    >
                      {plan.name === 'Basic' ? 'Current Plan' : `Get ${plan.name}`}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-24 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-12">
                Have questions? We have answers.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                {[
                  {
                    question: 'Can I cancel anytime?',
                    answer: 'Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.',
                  },
                  {
                    question: 'Do you offer refunds?',
                    answer: 'We offer a 7-day money-back guarantee for all premium plans. Contact support for refund requests.',
                  },
                  {
                    question: 'Can I upgrade or downgrade my plan?',
                    answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.',
                  },
                  {
                    question: 'Is there a setup fee?',
                    answer: 'No, there are no setup fees or hidden costs. You only pay the monthly or yearly subscription fee.',
                  },
                ].map((faq, index) => (
                  <div key={index} className="bg-white dark:bg-dark-50 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-dark-200">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}