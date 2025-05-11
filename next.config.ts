import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "th.bing.com",
        port: "",
        pathname: "/th/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
        search: "",
      },
    ],
  },
  sassOptions: {
    implementation: "sass",
    prependData: `@use "@/styles/variable.scss" as *;`,
  },
};

export default nextConfig;
