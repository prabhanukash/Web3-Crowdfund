'use client';

import { useState, useEffect } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import { Button } from "@/components/ui/button"

export function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  async function checkIfWalletIsConnected() {
    try {
      const { solana } = window

      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true })
          setWalletAddress(response.publicKey.toString())
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻')
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function connectWallet() {
    try {
      const { solana } = window

      if (solana) {
        const response = await solana.connect()
        setWalletAddress(response.publicKey.toString())
      }
    } catch (error) {
      console.error(error)
    }
  }

  function truncateAddress(address: string) {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <Button variant="outline" onClick={connectWallet}>
      {walletAddress ? truncateAddress(walletAddress) : "Connect Wallet"}
    </Button>
  )
}