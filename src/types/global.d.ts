interface Window {
  solana?: {
    isPhantom?: boolean;
    connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  };
}