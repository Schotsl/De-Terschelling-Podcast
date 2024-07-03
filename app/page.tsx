import { getPodcasts, getImage } from "@/helper";

import Image from "@/components/Image";
import content from "@/public/content/pages/home/index.json";
import Banner from "@/components/Banner";

export default async function Page() {
  const promiseImage = getImage(content.image);
  const promiseBanner = getImage(content.banner);
  const promiseBodcasts = getPodcasts();

  const [image, banner, podcasts] = await Promise.all([
    promiseImage,
    promiseBanner,
    promiseBodcasts,
  ]);

  return (
    <main>
      <Banner
        image={image}
        title={content.title}
        banner={banner}
        description={content.description}
      />

      {/* {podcasts.map((podcast) => (
        <a key={podcast.slug} href={`/podcast/${podcast.slug}`}>
          <Image image={podcast.image} sizes="100vw" />
          <h2>{podcast.title}</h2>
          <p>{podcast.description}</p>
        </a>
      ))} */}
    </main>
  );
}
