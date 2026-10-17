import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Parse remote patterns dynamically if STRAPI_API_URL is provided
const getStrapiRemotePattern = () => {
  const apiUrl = process.env.STRAPI_API_URL;
  if (!apiUrl) return null;

  try {
    const parsedUrl = new URL(apiUrl);
    return {
      protocol: (parsedUrl.protocol.replace(":", "") as "http" | "https"),
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || undefined,
      pathname: "/uploads/**",
    };
  } catch (error) {
    console.error("Invalid STRAPI_API_URL provided:", error);
    return null;
  }
};

const strapiPattern = getStrapiRemotePattern();

const nextConfig: NextConfig = {
  images: {
    // Only allow local IP fetching in local development
    dangerouslyAllowLocalIP: isDev,
    remotePatterns: [
      // Local development fallbacks
      ...(isDev
          ? [
            {
              protocol: "http" as const,
              hostname: "localhost",
              port: "1337",
              pathname: "/uploads/**",
            },
            {
              protocol: "http" as const,
              hostname: "127.0.0.1",
              port: "1337",
              pathname: "/uploads/**",
            },
          ]
          : []),
      // Production pattern parsed from env variable
      ...(strapiPattern ? [strapiPattern] : []),
    ],
  },
};

export default nextConfig;