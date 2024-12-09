/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // Ajoute cette ligne pour autoriser Unsplash
  },
};

export default nextConfig;
