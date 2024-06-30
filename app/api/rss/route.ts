import RSS from "rss";

// FS
import fs from "fs";
import mp3Duration from "mp3-duration";

// Load /public/content/podcast/audio/intro.mp3
const intro = fs.readFileSync("./public/content/podcast/audio/intro.mp3");

export async function GET() {
  console.log(await mp3Duration(intro));
  const feed = new RSS({
    title: "De Terschelling Podcast",
    generator: "Next",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    feed_url: "https://www.davegray.codes/feed.xml",
    site_url: "https://www.davegray.codes/",
    managingEditor: "dave@davegray.codes (Dave Gray)",
    webMaster: "dave@davegray.codes (Dave Gray)",
    copyright: `Copyright ${new Date().getFullYear().toString()}, Dave Gray`,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    ttl: 60,
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
