/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/**" },
      { protocol: "https", hostname: "floriana-house.vercel.app", pathname: "/**" },
      { protocol: "https", hostname: "*.vercel.app", pathname: "/**" },
    ],
  },
};

export default nextConfig;
