export const dynamic = "force-static";

export async function GET() {
  return new Response(null, {
    status: 301,
    headers: {
      Location: "https://anchor.fm/s/fbadb6a4/podcast/rss",
    },
  });
}
