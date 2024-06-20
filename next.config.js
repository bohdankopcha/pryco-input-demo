/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/management-dashboard/analytics",
        destination: "/management-dashboard/analytics/overview",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
