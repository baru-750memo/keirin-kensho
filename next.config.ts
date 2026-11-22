import type { NextConfig } from 'next';
const config: NextConfig = { reactStrictMode: true, env: { SITE_PUBLISHED: process.env.SITE_PUBLISHED ?? 'false' }, devIndicators: false, trailingSlash: true, images: { unoptimized: true } };
export default config;
