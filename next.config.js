/** @type {import('next').NextConfig} */

const subDirectory = process.env.SUB_DIRECTORY

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
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
  basePath: subDirectory ? subDirectory : "",
  publicRuntimeConfig: {
    basePath: subDirectory ? subDirectory : "",
  },
  assetPrefix: subDirectory ? subDirectory : "",
}

const withPWA = require('next-pwa')({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
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