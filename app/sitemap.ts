import type { MetadataRoute } from "next";
import { supabaseServer } from "./components/dbServer";

const BASE = "https://diksyonekreyol.org";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/alphabet`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/istwa`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const { data: words } = await supabaseServer
    .from("words")
    .select("word, created_at")
    .eq("approved", true)
    .order("word", { ascending: true });

  const wordPages: MetadataRoute.Sitemap = (words || []).map((w) => ({
    url: `${BASE}/mo/${encodeURIComponent(w.word)}`,
    lastModified: w.created_at ? new Date(w.created_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...wordPages];
}
