import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });
    return new Response("Message sent successfully", { status: 200 });
  } catch (error) {}
}
