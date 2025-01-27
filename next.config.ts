import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i9ozanmrsquybgxg.public.blob.vercel-storage.com',
                port: '',
            },
        ],
    },
    env: {
        NEXT_GOOGLE_API_KEY: process.env.NEXT_GOOGLE_API_KEY,
    }
};

export default nextConfig;
