import Link from "next/link"
import { WalletIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { ModeToggle } from "@/components/layouts/mode-toggle"
import { WalletConnect } from "@/components/web3/WalletConnect"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-2 flex items-center md:mr-6 md:space-x-2">
            <WalletIcon className="h-6 w-6 mr-2" />
            <span className="hidden font-bold md:inline-block">{siteConfig.name}</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <WalletConnect />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
