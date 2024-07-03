import { getImage, getPodcasts } from "@/helper";

import content from "@/public/content/pages/home/index.json";
import Banner from "@/components/Banner";

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
      <Banner
        image={podcast.image}
        title={podcast.title}
        banner={banner}
        description={podcast.description}
      />

      {/* <Image image={podcast.image} sizes="100vw" />
      <h2>{podcast.title}</h2>
      <p>{podcast.description}</p> */}
    </section>
  );
}
