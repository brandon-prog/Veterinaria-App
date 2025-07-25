import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'static.vecteezy.com'
      },
      {
        hostname: 'avatar.iran.liara.run'
      } 
    ]
  }
};

export default nextConfig;
