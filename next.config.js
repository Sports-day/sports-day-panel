/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

const withPWA = require('next-pwa')({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: 'public',
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: "/offline",
  },
  workboxOptions: {
    disableDevLogs: true,
  },
})

module.exports = withPWA({
  pwa: {
    dest: "public", // swの出力ディレクトリ
    // runtimeCaching: []
  },
});

module.exports = nextConfig