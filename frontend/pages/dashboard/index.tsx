import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useSession, getSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import Layout from '@/components/Layout'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import ServerSelector from '@/components/dashboard/ServerSelector'
import ServerOverview from '@/components/dashboard/ServerOverview'

interface Server {
  id: string
  name: string
  icon: string | null
  owner: boolean
  permissions: string
  features: string[]
  memberCount?: number
  hasBot?: boolean
}

export default function Dashboard() {
  const { t } = useTranslation('common')
  const { data: session } = useSession()
  const [servers, setServers] = useState<Server[]>([])
  const [selectedServer, setSelectedServer] = useState<Server | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetchUserServers()
    }
  }, [session])

  const fetchUserServers = async () => {
    try {
      const response = await fetch('/api/discord/guilds')
      const data = await response.json()
      
      if (data.success) {
        setServers(data.guilds)
        if (data.guilds.length > 0) {
          setSelectedServer(data.guilds[0])
        }
      }
    } catch (error) {
      console.error('Error fetching servers:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need to be logged in to access the dashboard.
            </p>
            <button className="btn-primary">
              Login with Discord
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="spinner"></div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>{t('dashboard.title')} - Discord Bot Platform</title>
        <meta name="description" content="Manage your Discord servers with advanced moderation tools" />
      </Head>
      
      <Layout>
        <DashboardLayout>
          <div className="space-y-6">
            {/* Server Selector */}
            <div className="bg-white dark:bg-dark-100 rounded-lg shadow-sm border border-gray-200 dark:border-dark-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('dashboard.selectServer')}
              </h2>
              <ServerSelector
                servers={servers}
                selectedServer={selectedServer}
                onServerSelect={setSelectedServer}
              />
            </div>

            {/* Server Overview */}
            {selectedServer && (
              <ServerOverview server={selectedServer} />
            )}

            {/* No Servers Message */}
            {servers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('dashboard.noServers')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Add the bot to your Discord server to get started.
                </p>
                <a
                  href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Add Bot to Discord
                </a>
              </div>
            )}
          </div>
        </DashboardLayout>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
      ...(await serverSideTranslations(context.locale ?? 'en', ['common'])),
    },
  }
}