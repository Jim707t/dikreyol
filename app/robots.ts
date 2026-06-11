import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/results", // search results are thin/duplicate; /mo pages are canonical
    },
    sitemap: "https://diksyonekreyol.org/sitemap.xml",
  };
}
