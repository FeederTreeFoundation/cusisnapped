/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
  },
  publicRuntimeConfig: {
    apiUrl: `http${process.env.NEXT_PUBLIC_NODE_ENV === 'local' ? '' : 's'}://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;