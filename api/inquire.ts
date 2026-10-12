/** POST /api/inquire: receives the inquiry form. Logic lives in ./_lib/inquiry.ts. */
import { handleInquiry } from "./_lib/inquiry.js";

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid json" }, { status: 400 });
  }
  const { status, body: out } = await handleInquiry(body, process.env);
  return Response.json(out, { status });
}
