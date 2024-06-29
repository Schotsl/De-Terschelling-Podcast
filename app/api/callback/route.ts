import { AuthorizationCode } from "simple-oauth2";
import { NextRequest, NextResponse } from "next/server";

const oauthConfig = {
  client: {
    id: process.env.OAUTH_CLIENT_ID!,
    secret: process.env.OAUTH_CLIENT_SECRET!,
  },
  auth: {
    tokenHost: "https://github.com",
    tokenPath: "/login/oauth/access_token",
    authorizePath: "/login/oauth/authorize",
  },
};

// I've based this code of but changed it to work with app router https://github.com/digitalinteraction/vercel-netlify-cms-github
export async function GET(req: NextRequest) {
  const host = req.headers.get("host");
  const code = req.nextUrl.searchParams.get("code")!;

  const authCode = new AuthorizationCode(oauthConfig);
  const authToken = await authCode.getToken({
    code,
    redirect_uri: `https://${host}/api/callback`,
  })!;

  const token = authToken.token.access_token;
  const parsed = JSON.stringify({ token, provider: "github" });
  const content = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Authorizing...</title></head><body><p id="message"></p><script>function sendMessage(message){document.getElementById("message").innerText=message;document.title=message}function receiveMessage(message){window.opener.postMessage('authorization:github:success:${parsed}',message.origin);window.removeEventListener("message",receiveMessage,false);sendMessage("Authorized, closing...");}sendMessage("Authorizing...");window.addEventListener("message",receiveMessage,false);window.opener.postMessage("authorizing:github","*");</script></body></html>`;

  return new NextResponse(content, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
