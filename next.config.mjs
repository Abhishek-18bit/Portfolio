/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  }
};

export default nextConfig;
