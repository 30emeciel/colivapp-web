/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
    serverActions: true,
  },
  webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    // Important: return the modified config
    //if (isServer)
      //config.experiments.topLevelAwait = true
    return config;
  },
}


module.exports = nextConfig
