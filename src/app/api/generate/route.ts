import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import { getToken } from "next-auth/jwt";
import { NextApiRequest } from "next";
import { type NextRequest } from "next/server";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  // Check if the OPENAI_API_KEY is set, if not return 400
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
    return new Response(
      "Missing OPENAI_API_KEY – make sure to add it to your .env file.",
      {
        status: 400,
      },
    );
  }

  const userToken = await getToken({ req: req as NextRequest });
  if (
    process.env.NODE_ENV != "development" &&
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN &&
    !userToken
  ) {
    const ip = req.headers.get("x-forwarded-for");
    const ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(10, "1 d"),
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(
      `plate_ratelimit_${ip}`,
    );

    if (!success) {
      return new Response("You have reached your request limit for the day.", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  }

  const { prompt, title } = (await req.json()) as {
    prompt: string;
    title: string;
  };

  if (typeof prompt != "string") {
    return new Response("Incorrect argument type", {
      status: 400,
    });
  }

  if (userToken) {
    const AUTHENTICATED_TOKEN_LENGTH = 800;
    if (prompt.length > 4 * AUTHENTICATED_TOKEN_LENGTH) {
      return new Response(
        `Outline exceeds the ${4 * AUTHENTICATED_TOKEN_LENGTH} chars limit`,
        {
          status: 400,
        },
      );
    }
  } else {
    const UNAUTHENTICATED_TOKEN_LENGTH = 300;
    if (prompt.length > 4 * UNAUTHENTICATED_TOKEN_LENGTH) {
      return new Response(
        `Outline exceeds the  ${
          4 * UNAUTHENTICATED_TOKEN_LENGTH
        } chars limit. Authenticate to increase the limit.`,
        {
          status: 400,
        },
      );
    }
  }

  if (!title) {
    return new Response("Missing title argument", {
      status: 400,
    });
  }

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Transform the excerpts from the INPUT document: '${title}', which I've selected based on their relevance and importance, into blocks of a new OUTPUT document.

        Rules:
        - Use as many details from the excerpts I provide as possible.
        - Print in markdown format using h2, h3, lists, tables, bold, italics, tables, etc.
        - Don't create sections that are not in the excerpts.

        Steps:
        1. Map each idea from the excerpts in the INPUT document to a section of the OUTPUT document with an h2 title. These are the only sections in the OUTPUT document.
        3. Create h3 for subsections if there are subtopics in the CHUNK.
        4. Bold the most important information in each section.
    `,
      },
      {
        role: "user",
        content: `Excerpts:
        ${prompt}
        `,
      },
    ],
    temperature: 0.2,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
