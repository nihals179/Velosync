import dotenv from 'dotenv';
dotenv.config();
import AWS from 'aws-sdk';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const app = express();
const PORT = 4000;
const DATA_PATH = path.resolve('./dist/data/siteContent.json');

// Allow CORS only from the current server (replace with your actual domain or IP)
app.use(cors({
  origin: '*', // Update this to match your front-end server's URL and port
}));
// Increase body size limits to accommodate large SVGs or data-URI images from the admin UI.
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Configure AWS SES
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
});
const ses = new AWS.SES();
// Contact form endpoint

app.post('/api/contact', async (req, res) => {
  const { fullName, email, mobile, company, requirement } = req.body;
  if (!fullName || !email || !requirement) {
    return res.status(400).json({ error: 'Missing required fields' });
  }


  const emailBodyText =
    `New Contact Form Submission:\n\n` +
    `Full Name: ${fullName}\n` +
    `Email: ${email}\n` +
    `Mobile: ${mobile || '-'}\n` +
    `Company: ${company || '-'}\n` +
    `Requirement: ${requirement}`;

  const emailBodyHtml = `
    <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); padding: 32px;">
        <h2 style="color: #004d43; margin-bottom: 24px;">New Contact Form Submission</h2>
        <table style="width: 100%; font-size: 16px; color: #222;">
          <tr><td style="font-weight: bold; padding: 8px 0;">Full Name:</td><td>${fullName}</td></tr>
          <tr><td style="font-weight: bold; padding: 8px 0;">Email:</td><td>${email}</td></tr>
          <tr><td style="font-weight: bold; padding: 8px 0;">Mobile:</td><td>${mobile || '-'}</td></tr>
          <tr><td style="font-weight: bold; padding: 8px 0;">Company:</td><td>${company || '-'}</td></tr>
          <tr><td style="font-weight: bold; padding: 8px 0; vertical-align: top;">Requirement:</td><td>${requirement}</td></tr>
        </table>
        <div style="margin-top: 32px; color: #888; font-size: 13px;">This message was sent from the Velosynq website contact form.</div>
      </div>
    </div>
  `;

  const params = {
    Source: process.env.SES_FROM_EMAIL, // Must be a verified sender in SES
    Destination: {
      ToAddresses: [process.env.SES_TO_EMAIL],
      CcAddresses: [process.env.SES_FROM_EMAIL],
    },
    Message: {
      Subject: { Data: `Contact Form Submission from ${fullName}` },
      Body: {
        Text: { Data: emailBodyText },
        Html: { Data: emailBodyHtml },
      },
    },
    ReplyToAddresses: [email],
  };

  try {
    await ses.sendEmail(params).promise();
    res.json({ ok: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('SES sendEmail error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.get('/api/content', (req, res) => {
  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read content file', err);
      return res.status(500).json({ error: 'Failed to read content' });
    }
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (e) {
      console.error('Invalid JSON in content file', e);
      res.status(500).json({ error: 'Invalid content JSON' });
    }
  });
});

app.post('/api/content', (req, res) => {
  const content = req.body;
  if (!content || typeof content !== 'object') {
    return res.status(400).json({ error: 'Invalid content' });
  }
  fs.writeFile(DATA_PATH, JSON.stringify(content, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Failed to write content file', err);
      return res.status(500).json({ error: 'Failed to write content' });
    }
    res.json({ ok: true });
  });
});


// SSL certificate and key paths
const SSL_CERT_PATH = path.resolve('/home/ec2-user/fullchain.crt');
const SSL_KEY_PATH = path.resolve('/home/ec2-user/private_key_nopass.key');

const sslOptions = {
  key: fs.readFileSync(SSL_KEY_PATH),
  cert: fs.readFileSync(SSL_CERT_PATH),
};

https.createServer(sslOptions, app).listen(PORT, '0.0.0.0', () => {
  console.log(`HTTPS server running on port ${PORT}`);
});

