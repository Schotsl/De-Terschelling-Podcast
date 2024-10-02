import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const token = process.env.CRON_API_SECRET!;

export async function POST() {
  // Get token from authorization header
  const headerList = headers();
  const headerAuth = headerList.get("Authorization");
  const headerToken = headerAuth?.split("Bearer ")[1];

  // Check if the token is valid
  if (headerToken !== token) {
    return new Response("Unauthorized", { status: 401 });
  }

  revalidatePath("/");

  return new Response("{}", { status: 200 });
}
