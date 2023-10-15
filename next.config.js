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
  }
}

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public", // swの出力ディレクトリ
    // runtimeCaching: []
  },
});

module.exports = nextConfig