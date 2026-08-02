import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    MONGO_DB_URI: process.env.MONGO_DB_URI,
  },
  outputFileTracingRoot: path.resolve(process.cwd()),
  images: {    
    remotePatterns: [      
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
