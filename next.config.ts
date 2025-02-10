import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig2 = {
  images: {
    domains: ["images.dog.ceo", "cdn2.thecatapi.com"],
  },
};

module.exports = nextConfig2;
