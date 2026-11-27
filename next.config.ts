import type { NextConfig } from 'next';
const config: NextConfig = { reactStrictMode: true, env: { SITE_PUBLISHED: process.env.SITE_PUBLISHED ?? (process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV !== 'production' ? 'false' : 'true'), SITE_URL: process.env.SITE_URL ?? 'https://keirin-kensho.com', SITE_OPERATOR: process.env.SITE_OPERATOR ?? '競輪検証編集部', SITE_CONTACT: process.env.SITE_CONTACT ?? 'https://lin.ee/5OeYxSk' }, devIndicators: false, trailingSlash: true, images: { unoptimized: true } };
export default config;
