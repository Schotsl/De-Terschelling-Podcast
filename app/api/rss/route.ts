import RSS from "rss";
import home from "@/public/content/pages/home/index.json";

import { getPodcasts } from "@/helper";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export async function GET() {
  const url = process.env.NEXT_PUBLIC_CDN!;

  // Fetch the podcasts from the local JSON files
  const podcasts = await getPodcasts();
  const categories = home.categories.map((text) => {
    return {
      "itunes:category": [{ _attr: { text } }],
    };
  });

  const coverImage = encodeURIComponent(home.image.src);
  const coverImageResized = `${url}/_next/image?url=${coverImage}&w=1920&q=75`;

  const feed = new RSS({
    feed_url: `${url}/api/rss`,
    site_url: url,

    title: home.title,
    language: "nld",
    copyright: `© 2024-${currentYear} Sjors van Holst`,
    description: home.description,

    custom_namespaces: {
      itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
      content: "http://purl.org/rss/1.0/modules/content/",
    },
    custom_elements: [
      {
        "itunes:title": home.title,
      },
      {
        // @ts-ignore
        "itunes:explicit": home.explicit === true,
      },
      {
        "itunes:author": "Sjors van Holst",
      },
      {
        "itunes:author": "Timo Steenmeijer",
      },
      {
        link: url,
      },
      {
        "itunes:type": "episodic",
      },
      {
        "itunes:image": {
          _attr: {
            href: coverImageResized,
          },
        },
      },
      ...categories,
    ],
  });

  podcasts.map((podcast) => {
    const episodeImage = encodeURIComponent(podcast.image.src);
    const episodeImageResized = `${url}/_next/image?url=${episodeImage}&w=1920&q=75`;

    feed.item({
      url: `${url}/podcast/${podcast.slug}`,
      date: podcast.publication,
      title: podcast.title,
      description: podcast.description,
      enclosure: podcast.enclosure,
      guid: podcast.slug,
      custom_elements: [
        { link: `${url}/podcast/${podcast.slug}` },
        { pubDate: podcast.publication },
        { "itunes:title": podcast.title },
        { "itunes:episode": podcast.episode },
        { "itunes:explicit": podcast.explicit },
        { "itunes:duration": podcast.duration },
        { "itunes:episodeType": podcast.type },
        {
          "itunes:image": {
            _attr: {
              href: episodeImageResized,
            },
          },
        },
      ],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
