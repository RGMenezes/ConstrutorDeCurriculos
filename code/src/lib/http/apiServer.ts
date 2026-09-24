import "server-only";
import axios from "axios";
import { headers } from "next/headers";
// Call once per request, only when HTTP is needed. Server Components prefer server/services.
export async function createApiServer() {
  const origin = process.env.AUTH_URL;
  if (!origin) throw new Error("Configure AUTH_URL.");
  const requestHeaders = await headers();
  return axios.create({ baseURL: `${new URL(origin).origin}/api`, timeout: 20000,
    maxRedirects: 0,
    headers: { "Content-Type": "application/json", Origin: new URL(origin).origin, Cookie: requestHeaders.get("cookie") ?? "" }
  });
}
