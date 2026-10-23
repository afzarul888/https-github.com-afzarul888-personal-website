import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL = "https://afzaruln8n.duckdns.org/webhook/aefd208c-ed9e-43b2-a953-6351d61d2d97/chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Prepare standard n8n chat payload structure
    const payload = {
      chatInput: message,
      message: message,
      action: "sendMessage",
      sessionId: sessionId || "session-" + Math.random().toString(36).substring(2, 9),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout for AI response

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get("content-type") || "";
    let replyText = "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      if (typeof data === "string") {
        replyText = data;
      } else if (data) {
        replyText =
          data.output ||
          data.text ||
          data.message ||
          data.response ||
          data.reply ||
          (Array.isArray(data) && data[0]?.output) ||
          (Array.isArray(data) && data[0]?.text) ||
          JSON.stringify(data);
      }
    } else {
      replyText = await response.text();
    }

    if (!replyText || replyText.trim() === "") {
      replyText = "Thank you for your message! Our DevOps automation workflow processed your request.";
    }

    return NextResponse.json({
      success: true,
      response: replyText,
      sessionId: payload.sessionId,
    });
  } catch (error: unknown) {
    console.error("Live chat webhook error:", error);
    const errMessage = error instanceof Error ? error.message : "Failed to connect to chat assistant";
    return NextResponse.json(
      {
        error: errMessage.includes("aborted")
          ? "Request timed out waiting for the AI response. Please try again."
          : "Unable to connect to live chat webhook at this moment.",
      },
      { status: 500 }
    );
  }
}
