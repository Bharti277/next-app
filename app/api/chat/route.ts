import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { message } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    // const fakeResponse = `🤖 MockBot says: You typed "${message}"`;
    return NextResponse.json({
      response: completion.choices[0].message.content,
      // response: fakeResponse,
    });
  } catch (error) {
    console.log(error, "error in chat route");

    return NextResponse.json(
      {
        error: error.message || "Failed to process the request",
      },
      {
        status: 500,
      }
    );
  }
}
