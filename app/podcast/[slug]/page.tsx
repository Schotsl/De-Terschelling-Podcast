import { getImage, getPodcasts } from "@/helper";

import Header from "@/components/Header";
import content from "@/public/content/pages/home/index.json";
import PodcastPagePlayer from "./Player";
import PodcastPageTranscript from "./Transcript";

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

  const title = `${podcast.title} - ${content.title}`;
  const description = podcast.description;

  const url = `${process.env.NEXT_PUBLIC_URL}/${podcast.banner.src}`;
  const alt = podcast.banner.alt;

  return {
    title,
    description,
    openGraph: {
      url,
      type: "website",
      title,
      locale: "nl_NL",
      siteName: title,
      images: [
        {
          url,
          alt,
          width: 1200,
          height: 630,
        },
      ],
      description,
    },

    twitter: {
      images: [
        {
          url,
          alt,
          width: 1200,
          height: 630,
        },
      ],
    },
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
    <main>
      <Header
        links={content.links}
        image={podcast.image}
        title={podcast.title}
        banner={banner}
        podcast={podcast}
        breadcrumbs={[
          { title: "Podcasts", href: "/#podcasts" },
          { title: podcast.title, href: `/podcast/${podcast.slug}` },
        ]}
        description={podcast.description}
      />

      <PodcastPagePlayer podcast={podcast} />

      {podcast.transcript && (
        <PodcastPageTranscript transcript={podcast.transcript} />
      )}
    </main>
  );
}
