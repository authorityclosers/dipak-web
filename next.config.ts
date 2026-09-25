import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2048, 2560],
    imageSizes: [64, 96, 128, 192, 256, 384],
    qualities: [75, 85, 90, 92],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.dipakvishwakarma.com" }],
        destination: "https://dipakvishwakarma.com/:path*",
        permanent: true,
      },
      // Permanent 301: /blog → /articles (SEO juice passes through)
      {
        source: "/blog",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/articles/:slug",
        permanent: true,
      },
      // Permanent 308: /links → /connect (bio link aggregator alias)
      {
        source: "/links",
        destination: "/connect",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/optimized/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
