import React from 'react'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Statistics from '@/components/Statistics'
import CallToAction from '@/components/CallToAction'

export default function Home() {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('hero.title')} - Discord Bot Platform</title>
        <meta name="description" content={t('hero.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Layout>
        <Hero />
        <Features />
        <Statistics />
        <CallToAction />
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