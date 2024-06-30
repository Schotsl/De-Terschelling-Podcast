export type Image = {
  alt: string;
  src: string;
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
