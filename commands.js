/**
 *
 * @param {import('node:net').Socket} client
 * @param {string} text
 * @param {Map<string, import('node:net').Socket>} clients
 */
export async function handleCommand(client, text, clients = []) {
  const addr = `${client.remoteAddress}:${client.remotePort}`;

  const args = text.split(' ');
  const command = args[0];

  switch (command) {
    case 'quit': {
      client.destroy();
      break;
    }

    case 'send': {
      clients.forEach((v, k) => {
        if (k !== addr) {
          v.write(`${text}\n`);
        }
      });
      break;
    }

    default: {
      client.write(`unknown command: ${text}`);
    }
  }
}

export function diego() {
  console.log('diego');
}
