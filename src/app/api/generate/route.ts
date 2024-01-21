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

function tokenApproximation(str: string): number {
  return str.length / 4;
}

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
      limiter: Ratelimit.slidingWindow(50, "1 d"),
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
        content: `Incorporate the following excerpts from the document: '${title}', which I've selected based on their relevance and importance, into a summary of the document. Please use as many details from the excerpts I provide as possible. Write the summary in rich Markdown format using h2, h3, lists, tables, bold, italics, etc. Each item in the excerpts should be mapped to a section in the summary. Your output is an h2 section for each chunk in the excerpts. You may use h3 for subsections. Don't create sections that are not in the excerpts.`,
        // TODO: Add richness "Each section has in bold its most important information."
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
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
