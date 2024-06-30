import RSS from "rss";

// FS
import fs from "fs";
import { getPodcasts } from "@/helper";

import home from "@/public/content/pages/home/index.json";
// Load /public/content/podcast/audio/intro.mp3
// const intro = fs.readFileSync("./public/content/podcast/audio/intro.mp3");

const firstCategory = home.categories[0].category;
const secondCategory = home.categories[1].category;

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export async function GET() {
  const podcasts = await getPodcasts();
  console.log(podcasts[0].image.src);

  const feed = new RSS({
    feed_url: "https://de-terschelling-podcast.nl/api/rss",
    site_url: "https://de-terschelling-podcast.nl",

    title: home.title,
    language: "nld",
    copyright: `© ${currentYear} Sjors van Holst`,
    description: home.description,

    custom_namespaces: {
      itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
    },
    custom_elements: [
      {
        "itunes:title": home.title,
      },
      {
        "itunes:image": `https://de-terschelling-podcast.nl${home.image.src}w=1400`,
      },
      {
        "itunes:category": [{ _attr: { text: firstCategory } }],
      },
      {
        "itunes:category": [{ _attr: { text: secondCategory } }],
      },
      // {
      //   "itunes:explicit": home.explicit === "true"
      // }
      // Sjors van Holst and Timo Steenmeijer
      {
        "itunes:author": "Sjors van Holst",
      },
      {
        "itunes:author": "Timo Steenmeijer",
      },
      {
        link: "https://de-terschelling-podcast.nl",
      },
      {
        "itunes:type": "episodic",
      },
    ],
  });

  // const allPosts = await getPostsMeta();

  // if (allPosts) {
  //   allPosts.map((post) => {
  //     feed.item({
  //       title: post.title,
  //       description: post.description,
  //       url: `https://www.davegray.codes/posts/${post.id}`,
  //       categories: post.tags || [],
  //       author: "Dave Gray",
  //       date: post.date,
  //     });
  //   });
  // }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
