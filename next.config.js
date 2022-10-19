/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'https://images.unsplash.com',
      'images.unsplash.com',
      'scontent.famd1-3.fna.fbcdn.net',
      'upload.wikimedia.org',
      'reactjs-foodapp-redux.vercel.app',
      'play-lh.googleusercontent.com',
      'lh3.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig;
