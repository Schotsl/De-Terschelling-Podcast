import { getPodcasts } from "@/helper";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const podcasts = await getPodcasts();

  const pages: MetadataRoute.Sitemap = [
    {
      url: `${process.env.NEXT_PUBLIC_URL}/`,
      priority: 1.0,
      lastModified: new Date(),
      changeFrequency: "weekly",
    },
    ...podcasts.map((podcast) => ({
      url: `${process.env.NEXT_PUBLIC_URL}/podcast/${podcast.slug}`,
      priority: 1,
      lastModified: podcast.updated,
      changeFrequency: "monthly" as "monthly",
    })),
  ];

  return pages;
}
