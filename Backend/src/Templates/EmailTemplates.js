// emailTemplates.js

// Helper to prevent HTML injection
const escapeHtml = (str) => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// ----------------------------------------------------------------------
// Contact message email template (polished, logo-based red theme)
// ----------------------------------------------------------------------
export const contactEmailTemplate = ({ name, email, message }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message) || '— No message content —';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KRS Lifeline – New Contact Message</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #edf2f7;
      font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.5;
      padding: 24px 16px;
    }
    .email-container {
      max-width: 580px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 35px -12px rgba(0,0,0,0.12);
      border: 1px solid #e9eef3;
    }
    .brand-header {
      background: #c90202;
      background-image: linear-gradient(135deg, #c90202 0%, #a80000 100%);
      padding: 28px 28px 22px;
      text-align: center;
      border-bottom: 4px solid rgba(255,215,0,0.25);
    }
    .logo-area {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .logo-icon {
      background: rgba(255,255,255,0.2);
      width: 48px;
      height: 48px;
      border-radius: 60px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: 700;
      color: white;
    }
    .brand-name {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.3px;
      color: white;
      text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    .tagline {
      font-size: 13px;
      color: rgba(255,255,255,0.85);
      background: rgba(0,0,0,0.15);
      display: inline-block;
      padding: 4px 12px;
      border-radius: 40px;
      margin-top: 12px;
    }
    .new-badge {
      background: #ffd966;
      color: #8b0000;
      font-size: 12px;
      font-weight: 700;
      border-radius: 60px;
      padding: 4px 12px;
      display: inline-block;
      margin-top: 14px;
      text-transform: uppercase;
    }
    .content-padding {
      padding: 32px 32px 28px;
    }
    .greeting {
      font-size: 22px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 12px;
    }
    .desc-text {
      color: #334155;
      font-size: 15px;
      border-left: 3px solid #c90202;
      padding-left: 14px;
      margin: 18px 0 24px;
      background: #fefaf5;
      border-radius: 0 12px 12px 0;
    }
    .info-card {
      background: #fefbf7;
      border-radius: 20px;
      border: 1px solid #f0e7dd;
      overflow: hidden;
      margin-bottom: 28px;
    }
    .info-row {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 20px;
      border-bottom: 1px solid #f0e2d4;
    }
    .info-row:last-child { border-bottom: none; }
    .info-icon { width: 38px; font-size: 22px; text-align: center; }
    .info-label {
      font-weight: 700;
      color: #2d2f31;
      width: 70px;
      font-size: 14px;
    }
    .info-value {
      color: #1e293b;
      font-weight: 500;
      flex: 1;
      font-size: 15px;
      word-break: break-word;
    }
    .message-section { margin: 24px 0 28px; }
    .message-label {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 16px;
      color: #c90202;
      margin-bottom: 12px;
    }
    .message-box {
      background: #fffdf9;
      border: 1px solid #f0e2d4;
      border-left: 6px solid #c90202;
      border-radius: 20px;
      padding: 20px 22px;
      color: #2d3e50;
      font-size: 15px;
      line-height: 1.55;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .btn-container { text-align: center; margin: 20px 0 10px; }
    .reply-btn {
      background: #c90202;
      color: white;
      text-decoration: none;
      font-weight: 600;
      padding: 14px 28px;
      border-radius: 50px;
      display: inline-block;
      font-size: 15px;
      box-shadow: 0 4px 8px rgba(201,2,2,0.2);
    }
    .footer-contact {
      background: #faf9fc;
      border-top: 1px solid #edeff2;
      padding: 24px 32px;
    }
    .contact-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 16px;
    }
    .contact-block { flex: 1; min-width: 130px; }
    .contact-title {
      font-weight: 700;
      color: #c90202;
      font-size: 13px;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .contact-detail {
      color: #2c3e50;
      font-size: 13px;
      line-height: 1.5;
    }
    .copyright {
      text-align: center;
      font-size: 12px;
      color: #7b8a9b;
      margin-top: 18px;
      border-top: 1px dashed #e2e8f0;
      padding-top: 18px;
    }
    @media (max-width: 560px) {
      .content-padding { padding: 24px 20px; }
      .footer-contact { padding: 20px 24px; }
      .info-row { flex-wrap: wrap; gap: 8px; }
      .info-label { width: auto; min-width: 60px; }
      .contact-row { flex-direction: column; gap: 14px; }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="brand-header">
      <div class="logo-area">
        <div class="logo-icon">❤️</div>
        <div class="brand-name">KRS LIFELINE</div>
      </div>
      <div class="tagline">Trust & Care · Emergency Support</div>
      <div class="new-badge">✨ New Contact Message ✨</div>
    </div>
    <div class="content-padding">
      <div class="greeting">Hello Admin 👋 <span style="background:#c9020210; padding:2px 8px; border-radius:30px;">+1</span></div>
      <div class="desc-text">A new inquiry has been submitted through the KRS Lifeline website contact form.</div>
      <div class="info-card">
        <div class="info-row">
          <div class="info-icon">👤</div>
          <div class="info-label">Full Name</div>
          <div class="info-value">${safeName || 'Not provided'}</div>
        </div>
        <div class="info-row">
          <div class="info-icon">📧</div>
          <div class="info-label">Email</div>
          <div class="info-value"><a href="mailto:${safeEmail}" style="color:#c90202; text-decoration:none; border-bottom:1px dashed #c90202;">${safeEmail}</a></div>
        </div>
      </div>
      <div class="message-section">
        <div class="message-label"><span>✍️</span> Customer Message</div>
        <div class="message-box">${safeMessage}</div>
      </div>
      <div class="btn-container">
        <a href="mailto:${safeEmail}?subject=Regarding your inquiry to KRS Lifeline&body=Hello ${safeName}%2C%0A%0AThank you for reaching out to KRS Lifeline.%0A%0A" class="reply-btn">📩 Reply to Customer</a>
      </div>
    </div>
    <div class="footer-contact">
      <div class="contact-row">
        <div class="contact-block"><div class="contact-title">📍 VISIT US</div><div class="contact-detail">331/12, 3rd Street Extension,<br> Gandhipuram, Coimbatore - 641012</div></div>
        <div class="contact-block"><div class="contact-title">📞 CALL US</div><div class="contact-detail">8190000668 | 9944589789</div></div>
        <div class="contact-block"><div class="contact-title">✉️ EMAIL</div><div class="contact-detail">krslifeline.info@gmail.com</div></div>
      </div>
      <div class="copyright">© ${new Date().getFullYear()} KRS Lifeline – Compassionate care & emergency support. All rights reserved.</div>
    </div>
  </div>
</body>
</html>`;
};

// ----------------------------------------------------------------------
// OTP email template (branded, clean and modern)
// ----------------------------------------------------------------------
export const otpTemplate = ({ otp }) => {
  const safeOtp = escapeHtml(otp);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KRS Lifeline – Your OTP Code</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #edf2f7;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      padding: 24px 16px;
    }
    .email-container {
      max-width: 520px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 35px -12px rgba(0,0,0,0.1);
      border: 1px solid #e9eef3;
      text-align: center;
    }
    .brand-header {
      background: #c90202;
      padding: 28px 20px;
      text-align: center;
    }
    .logo-icon {
      background: rgba(255,255,255,0.2);
      width: 54px;
      height: 54px;
      border-radius: 60px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin-bottom: 12px;
    }
    .brand-name {
      font-size: 24px;
      font-weight: 800;
      color: white;
      letter-spacing: -0.2px;
    }
    .content {
      padding: 36px 28px 32px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 16px;
    }
    .message {
      color: #475569;
      font-size: 15px;
      margin-bottom: 28px;
      line-height: 1.5;
    }
    .otp-box {
      background: #fefbf7;
      border-radius: 20px;
      padding: 24px 20px;
      border: 1px solid #f0e2d4;
      margin: 20px 0;
    }
    .otp-code {
      font-size: 42px;
      font-weight: 800;
      letter-spacing: 8px;
      color: #c90202;
      font-family: monospace;
      background: #fff;
      display: inline-block;
      padding: 12px 24px;
      border-radius: 60px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border: 1px solid #ffe0cc;
    }
    .expiry-note {
      font-size: 13px;
      color: #7b8a9b;
      margin-top: 16px;
    }
    .footer {
      background: #faf9fc;
      border-top: 1px solid #edeff2;
      padding: 20px;
      font-size: 12px;
      color: #7b8a9b;
    }
    @media (max-width: 480px) {
      .otp-code { font-size: 32px; letter-spacing: 4px; }
      .content { padding: 28px 20px; }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="brand-header">
      <div class="logo-icon">🔐</div>
      <div class="brand-name">KRS LIFELINE</div>
    </div>
    <div class="content">
      <div class="greeting">One‑Time Password</div>
      <div class="message">
        Use the following OTP to complete your verification.<br>
        <strong>Do not share this code with anyone.</strong>
      </div>
      <div class="otp-box">
        <div class="otp-code">${safeOtp}</div>
        <div class="expiry-note">⏱️ This OTP will expire in 10 minutes.</div>
      </div>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} KRS Lifeline – Trust & Care. All rights reserved.
    </div>
  </div>
</body>
</html>`;
};


export const newsletterTemplate = ({ email }) => {
  return `
  <div style="background:#f4f6f8;padding:30px 0;font-family:Arial,sans-serif">

    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #eee">

      <!-- HEADER -->
      <div style="background:#c90202;padding:20px;text-align:center;color:#fff">
        <h2 style="margin:0;font-size:22px">KRS Lifeline</h2>
        <p style="margin:5px 0 0;font-size:13px;opacity:0.9">New Newsletter Subscription</p>
      </div>

      <!-- BODY -->
      <div style="padding:25px">

        <h3 style="color:#333;margin-bottom:15px">New Subscriber 👇</h3>

        <p style="color:#555;font-size:14px;line-height:1.6">
          A new user has subscribed to your newsletter.
        </p>

        <div style="margin-top:20px;background:#f9f9f9;padding:15px;border-radius:8px">
          <p style="margin:8px 0"><b>Email:</b> ${email}</p>
        </div>

        <p style="margin-top:20px;font-size:12px;color:#888">
          You can use this email for marketing campaigns or updates.
        </p>

      </div>

      <!-- FOOTER -->
      <div style="background:#fafafa;text-align:center;padding:15px;font-size:12px;color:#888">
        © ${new Date().getFullYear()} KRS Lifeline | Newsletter System
      </div>

    </div>

  </div>
  `;
};