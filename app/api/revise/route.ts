import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT } from "@/lib/config";

export const dynamic = "force-dynamic";

interface ReviseRequest {
  post_id: number | string;
  platform: string;
  current_draft: string;
  feedback: string;
}

export async function POST(req: Request) {
  const body = (await req.json()) as ReviseRequest;

  const queueDir = path.join(REPO_ROOT, "content", "revise-queue");
  if (!fs.existsSync(queueDir)) fs.mkdirSync(queueDir, { recursive: true });

  const id = `revise-${Date.now()}-${body.post_id}`;
  const entry = {
    id,
    post_id: body.post_id,
    platform: body.platform,
    current_draft: body.current_draft,
    feedback: body.feedback,
    status: "queued",
    created_at: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(queueDir, `${id}.json`), JSON.stringify(entry, null, 2));

  return NextResponse.json({
    id,
    message:
      "Queued for /revise command. Run `/revise` in Claude Code to process pending revisions. Once processed, refresh this drawer.",
    revised_draft: null,
  });
}
