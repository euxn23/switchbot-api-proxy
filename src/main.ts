import { callSwitchbotAPI } from './switchbot-api';

function main () {
  const method = process.env.SWITCHBOT_API_METHOD as 'GET' | 'POST';
  const path = process.env.SWITCHBOT_API_PATH;
  const token = process.env.SWITCHBOT_API_TOKEN;
  const secret = process.env.SWITCHBOT_API_SECRET;

  return callSwitchbotAPI(method, path, token, secret);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
})
