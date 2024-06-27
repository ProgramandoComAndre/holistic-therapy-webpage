/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    env: {
        AUTH_BASE_URL: process.env.NEXT_PUBLIC_AUTH_BASE_URL,
        THERAPISTS_BASE_URL: process.env.NEXT_PUBLIC_THERAPISTS_BASE_URL
    }
    
};

export default nextConfig;
