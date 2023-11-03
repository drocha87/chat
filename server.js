import { createServer } from 'node:net';
import { handleCommand } from './commands.js';

/**
 *
 * @param {number} code
 * @returns {boolean}
 */
function isControlCharacter(code) {
  return (code >= 0x00 && code <= 0x1f) || code === 0x7f;
}

/**
 *
 * @param {Buffer} buffer
 * @returns {string}
 */
function sanitizeBuffer(buffer) {
  const textDecoder = new TextDecoder();
  const data = Uint8Array.from(buffer.filter((x) => !isControlCharacter(x)));
  return textDecoder.decode(data);
}

async function main() {
  /**
   *  @type {Map<string, import('node:net').Socket>}
   */
  const clients = new Map();

  const server = createServer();
  const port = 6969;

  server.on('connection', (socket) => {
    socket.on('data', async (buffer) => {
      const text = sanitizeBuffer(buffer);
      await handleCommand(socket, text, clients);
    });

    const addr = `${socket.remoteAddress}:${socket.remotePort}`;
    clients.set(addr, socket);
    console.log(`INFO: new connection from ${addr}`);
  });

  server.listen(port, () => {
    console.log(`INFO: server listening on port ${port}`);
  });
}

await main();
