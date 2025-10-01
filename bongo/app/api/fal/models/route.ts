import { NextResponse } from "next/server";

// Curated list for MVP; later fetch from Fal.ai catalog if available.
const MODELS = [
  {
    id: "fal-ai/flux/dev",
    name: "FLUX Dev (Image)",
    endpoint: "https://fal.run/fal-ai/flux/dev",
    kind: "image",
  },
  {
    id: "fal-ai/flux/dev-inpaint",
    name: "FLUX Dev Inpaint",
    endpoint: "https://fal.run/fal-ai/flux/dev/inpaint",
    kind: "image",
  },
];

export async function GET() {
  return NextResponse.json({ models: MODELS });
}

