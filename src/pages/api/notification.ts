import admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require("../../service_key.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const { token, title, message, link } = req.body; // Use req.body in Pages Router

    if (!token || !title || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    if (typeof token !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid token format" });
    }

    const payload: admin.messaging.Message = {
      token,
      notification: {
        title,
        body: message,
      },
      ...(link && {
        webpush: {
          fcmOptions: {
            link,
          },
        },
      }),
    };

    await admin.messaging().send(payload);

    return res
      .status(200)
      .json({ success: true, message: "Notification sent!" });
  } catch (error: any) {
    console.error("Error sending notification:", error);
    return res
      .status(500)
      .json({
        success: false,
        error: error.message || "An unknown error occurred",
      });
  }
}
