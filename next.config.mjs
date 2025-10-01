/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['a.storyblok.com', 'images.unsplash.com', 'cdnjs.cloudflare.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  // Railway optimization
  output: 'standalone',
  // Reduce build time
  swcMinify: true,
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
