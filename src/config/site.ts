import { env } from "@/env"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Web3 Crowdfund",
  description:
    "Web3 Crowdfund: Create tasks, complete work, and earn crypto rewards in a decentralized ecosystem.",
  url:
    env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "",
}
