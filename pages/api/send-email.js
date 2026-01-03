import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.spacemail.io",
      port: 465,
      secure: true,
      auth: {
        user: "hello@junkgopdx.com",
        pass: "Amazon19$" // Replace with your SpaceMail password
      }
    });

    const mailOptions = {
      from: `"JunkGo Contact Form" <hello@junkgopdx.com>`,
      to: "hello@junkgopdx.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ success: false, message: "Email failed to send" });
  }
}
