import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, text, html }) {
  try {
    await resend.emails.send({
      from: "FUTO Marketplace <akpofurelev@gmail.com>",
      to,
      subject,
      text,
      html,
    });

    console.log("Resend: email sent to", to);
  } catch (error) {
    console.error("Resend error:", error);
    throw new Error("Email not sent");
  }
}
