import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'net.inspireedge.flykika',
  appName: 'FlyKika',
  webDir: 'dist',
  server: {
    // Allow cleartext during local dev against a LAN device; tighten for release.
    androidScheme: 'https',
  },
}

export default config
