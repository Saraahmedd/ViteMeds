/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/staff/:path*',
                destination: 'http://3.73.222.159:3000/staff/:path*',
            },
        ]
    },
};

module.exports = nextConfig
