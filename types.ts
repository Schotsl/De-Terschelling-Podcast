export type Breadcrumb = {
  title: string;
  href: string;
};

export type Image = {
  src: string;
  alt: string;
  blur: string;
  width: number;
  height: number;
};

export type Publishing = {
  spotify?: string;
  status: "published" | "archived";
};

export type Audio = {
  zone: string;
  size: number;
  duration: number;
};

export type Podcast = {
  slug: string;
  type: "full" | "trailer" | "bonus";
  title: string;
  audio: Audio;
  image: Image;
  banner: Image;
  episode: number;
  subtitle: string;
  explicit: boolean;
  publishing: Publishing;
  publication: Date;
  description: string;
};

export type Links = {
  apple: string;
  podimo: string;
  spotify: string;
};
