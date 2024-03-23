import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

const endpoint = 'https://api.switch-bot.com';

export async function callSwitchbotAPI (method: 'GET' | 'POST', path: string, token: string, secret: string) {
  const t = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString('hex');
  const data = token + t + nonce;
  const signTerm = crypto.createHmac('sha256', secret)
    .update(Buffer.from(data, 'utf-8'))
    .digest();
  const sign = signTerm.toString('base64');

  const headers = new Headers({
    'Authorization': token,
    'Content-Type': 'application/json',
    'Content-Length': '0',
    sign,
    nonce,
    t
  });
  const res = await fetch(`${endpoint}${path}`, { method, headers });
  console.dir(await res.json(), { depth: null });
}
