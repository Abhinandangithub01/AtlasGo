/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['a.storyblok.com', 'img2.storyblok.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
