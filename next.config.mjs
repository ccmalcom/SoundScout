/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'scontent-lga3-2.xx.fbcdn.net',
                port: '',
            },
        ],
    },
};

export default nextConfig;
