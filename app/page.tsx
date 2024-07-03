import { getPodcasts, getImage } from "@/helper";

import Image from "@/components/Image";
import content from "@/public/content/pages/home/index.json";
import Header from "@/components/Header";
import Podcasts from "@/components/Podcasts";

export default async function Page() {
  const promiseImage = getImage(content.image);
  const promiseHeader = getImage(content.banner);
  const promiseBodcasts = getPodcasts();

  const [image, banner, podcasts] = await Promise.all([
    promiseImage,
    promiseHeader,
    promiseBodcasts,
  ]);

  return (
    <main>
      <Header
        image={image}
        title={content.title}
        banner={banner}
        description={content.description}
      />

      <Podcasts podcasts={podcasts} />
    </main>
  );
}
