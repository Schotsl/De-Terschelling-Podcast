import { getPodcasts, getImage } from "@/helper";

import Image from "@/components/Image";
import content from "@/public/content/pages/home/index.json";

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
      <Image image={banner} sizes="100vw" />
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <Image image={image} sizes="100vw" />

      {podcasts.map((podcast) => (
        <a key={podcast.slug} href={`/podcast/${podcast.slug}`}>
          <Image image={podcast.image} sizes="100vw" />
          <h2>{podcast.title}</h2>
          <p>{podcast.description}</p>
        </a>
      ))}
    </main>
  );
}
