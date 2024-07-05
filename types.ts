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
  audio: string;
  image: Image;
  episode: number;
  subtitle: string;
  duration: number;
  explicit: boolean;
  publication: Date;
  description: string;
  enclosure: {
    url: string;
    type: string;
    length: number;
  };
};

export type Links = {
  apple: string;
  podimo: string;
  spotify: string;
};
