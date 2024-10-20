import { podcastService } from "@/service/podcastService";
import { imageService } from "@/service/imageService";

import content from "@/public/content/pages/home/index.json";

import Header from "@/components/Header";
import Podcasts from "@/components/Podcasts";

export const revalidate = 3600;

export default async function Page() {
  const promiseImage = imageService.getImage(content.image);
  const promiseHeader = imageService.getImage(content.banner);
  const promiseBodcasts = podcastService.getPodcasts();

  const [image, banner, podcasts] = await Promise.all([
    promiseImage,
    promiseHeader,
    promiseBodcasts,
  ]);

  return (
    <main>
      <Header
        image={image}
        links={content.links}
        title={content.title}
        banner={banner}
        podcasts={podcasts}
        breadcrumbs={[{ title: "Podcasts", href: "/#podcasts" }]}
        description={content.description}
      />

      <Podcasts podcasts={podcasts} />
    </main>
  );
}
