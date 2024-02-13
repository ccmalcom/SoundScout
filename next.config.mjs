/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.xx.fbcdn.net',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
            }
        ],
    },
};

export default nextConfig;
