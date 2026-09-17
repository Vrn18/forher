interface DateNotificationPayload {
  date: string;
  activity: string;
  vibe: string;
  rule: string;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.NOTIFICATION_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    console.error("Date notification is not configured.");
    return Response.json({ error: "Email notification is not configured." }, { status: 503 });
  }

  let payload: DateNotificationPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (![payload.date, payload.activity, payload.vibe, payload.rule].every((value) => typeof value === "string" && value.trim())) {
    return Response.json({ error: "A date and all preferences are required." }, { status: 400 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      subject: `They picked ${payload.date} for your date ♡`,
      html: `
        <h2>You have a date planned ♡</h2>
        <p>They confirmed <strong>${escapeHtml(payload.date)}</strong>.</p>
        <ul>
          <li><strong>Setting:</strong> ${escapeHtml(payload.activity)}</li>
          <li><strong>Vibe:</strong> ${escapeHtml(payload.vibe)}</li>
          <li><strong>Promise:</strong> ${escapeHtml(payload.rule)}</li>
        </ul>
      `,
    }),
  });

  if (!response.ok) {
    console.error("Resend rejected the date notification:", await response.text());
    return Response.json({ error: "Email delivery failed." }, { status: 502 });
  }

  return Response.json({ sent: true });
}