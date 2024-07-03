import { getImage, getPodcasts } from "@/helper";

import content from "@/public/content/pages/home/index.json";
import Header from "@/components/Header";

export async function generateStaticParams() {
  const podcasts = await getPodcasts();
  const podcastsSlugs = podcasts.map((podcast) => ({
    slug: podcast.slug,
  }));

  return podcastsSlugs;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const podcasts = await getPodcasts();
  const podcast = podcasts.find((podcast) => podcast.slug === params.slug)!;

  return {
    title: `${podcast.title} - ${content.title}`,
    description: podcast.description,
  };
}

export default async function PodcastPage({
  params,
}: {
  params: { slug: string };
}) {
  const banner = await getImage(content.banner);
  const podcasts = await getPodcasts();
  const podcast = podcasts.find((podcast) => podcast.slug === params.slug)!;

  return (
    <section>
      <Header
        image={podcast.image}
        title={podcast.title}
        banner={banner}
        description={podcast.description}
      />
    </section>
  );
}
