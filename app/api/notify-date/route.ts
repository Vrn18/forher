interface DateNotificationPayload {
  date: string;
  activity: string;
  vibe: string;
  rule: string;
}

export async function POST(request: Request) {
  const recipient = process.env.NOTIFICATION_EMAIL;

  if (!recipient) {
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

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://forher-qzcq.onrender.com",
      Referer: "https://forher-qzcq.onrender.com/",
    },
    body: JSON.stringify({
      _subject: `They picked ${payload.date} for your date ♡`,
      date: payload.date,
      setting: payload.activity,
      vibe: payload.vibe,
      promise: payload.rule,
      _template: "table",
      _captcha: "false",
    }),
  });

  if (!response.ok) {
    console.error("FormSubmit rejected the date notification:", await response.text());
    return Response.json({ error: "Email delivery failed." }, { status: 502 });
  }

  return Response.json({ sent: true });
}