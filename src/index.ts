import { callSwitchbotAPI } from './switchbot-api';

export interface Env {
  ACCESS_CONTROL_ALLOW_ORIGIN: string;
  SWITCHBOT_API_PATH: string;
  SWITCHBOT_API_TOKEN: string;
  SWITCHBOT_API_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === 'OPTIONS') {
      if (
        request.headers.get("Origin") !== null &&
        request.headers.get("Access-Control-Request-Method") !== null &&
        request.headers.get("Access-Control-Request-Headers") !== null
      ) {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': env.ACCESS_CONTROL_ALLOW_ORIGIN,
            'Access-Control-Allow-Methods': 'POST,OPTIONS',
            "Access-Control-Allow-Headers": 'Content-Type',
          },
        });
      } else {
        return new Response(null, {
          headers: {
            Allow: "POST, OPTIONS",
          },
        });
      }
    }
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ result: 'failure', error: 'Invalid method' }), { status: 400 , headers: { 'Content-Type': 'application/json' }});
    }
    try {
      const path = env.SWITCHBOT_API_PATH;
      const token = env.SWITCHBOT_API_TOKEN;
      const secret = env.SWITCHBOT_API_SECRET;

      await callSwitchbotAPI('POST', path, token, secret);
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': env.ACCESS_CONTROL_ALLOW_ORIGIN,
      })
      return new Response(JSON.stringify({ result: 'success' }), { status: 200, headers });
    } catch (e) {
      console.error(e);
      return new Response(JSON.stringify({ result: 'failure', error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' }});
    }
  },
};
