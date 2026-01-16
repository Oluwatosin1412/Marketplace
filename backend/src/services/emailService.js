import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const messageParts = [
      `To: ${to}`,
      "Content-Type: text/html; charset=utf-8",
      "MIME-Version: 1.0",
      `Subject: ${subject}`,
      "",
      html || text,
    ];

    const message = messageParts.join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
  } catch (err) {
    console.error("Gmail API error:", err);
    throw new Error("Email not sent");
  }
};




// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function sendEmail({ to, subject, text, html }) {
//   try {
//     await resend.emails.send({
//       from: "FUTO Marketplace <akpofurelev@gmail.com>",
//       to,
//       subject,
//       text,
//       html,
//     });

//     console.log("Resend: email sent to", to);
//   } catch (error) {
//     console.error("Resend error:", error);
//     throw new Error("Email not sent");
//   }
// }
