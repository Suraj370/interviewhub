import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: `${process.env.OPEN_API_KEY}`,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "I want you to act as an interviewer.  I will be the candidate and you will ask me question based on my desired role I am applying for. I want you to only reply as interviewer. Do not write conversations at once. I want you to only do interview with me. Ask me questions and wait for my answers. Do not write explanations for it. Ask me the questions one by one like an interviewer does and wait for my answers. ",
        },
        {
          ...body,
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Return the GPT-3 model's response
    return NextResponse.json({
      success: true,
      message: gptResponse.choices[0].message,
    });
  } catch (error) {
 
      return NextResponse.json({
        success: false,
        message: "You exceeded your current quota, please check your plan and billing details.",
    
    })
  }
}
