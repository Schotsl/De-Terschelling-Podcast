export type Breadcrumb = {
  title: string;
  href: string;
};

export type Audio = {
  zone: string;
  size: number;
  duration: number;
};

export type Image = {
  src: string;
  alt: string;
  blur: string;
  width: number;
  height: number;
};

export type Podcast = {
  slug: string;
  type: "full" | "trailer" | "bonus";
  title: string;
  audio: Audio;
  image: Image;
  banner: Image;
  episode: number;
  spotify?: string;
  subtitle: string;
  explicit: boolean;
  publication: Date;
  description: string;
};

export type Links = {
  apple: string;
  podimo: string;
  spotify: string;
};
