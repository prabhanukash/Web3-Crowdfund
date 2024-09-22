'use client'
import React from 'react'
import { UserIcon, BriefcaseIcon, WalletIcon } from "lucide-react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const LandingPage: React.FC = () => {
const router = useRouter()

  const handleCreateTasks = () => {
    router.push('/user-dashboard')
  }

  const handleFindWork = () => {
    router.push('/worker-dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen">
     
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Decentralized Crowdfunding Through Tasks
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Create tasks, complete work, and earn crypto rewards in a decentralized ecosystem.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={handleCreateTasks}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Create Tasks
                </Button>
                <Button variant="outline" onClick={handleFindWork}>
                  <BriefcaseIcon className="mr-2 h-4 w-4" />
                  Find Work
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <UserIcon className="h-10 w-10 mb-2" />
                <h3 className="text-xl font-bold">Create Tasks</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Users create tasks and set crypto rewards for completion.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <BriefcaseIcon className="h-10 w-10 mb-2" />
                <h3 className="text-xl font-bold">Complete Work</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Workers browse and complete tasks to earn rewards.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <WalletIcon className="h-10 w-10 mb-2" />
                <h3 className="text-xl font-bold">Earn Crypto</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Automatically receive crypto rewards upon task completion and verification.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Web3 Crowdfund. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

export default LandingPage;