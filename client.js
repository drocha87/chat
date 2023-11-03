/**
 * Client class definition
 * @class
 * @constructor
 * @public
 */
export class Client {
  /**
   * @param {import('node:net').Socket} socket
   */
  constructor(socket) {
    this.socket = socket;
    // TODO: generate a random nickname
    this.nickname = 'unknown';
  }

  /**
   * Send a message directly to the client. The message will be sent as it is
   * without any sanitization
   * @param {string} message
   */
  sendMessage(message) {
    this.socket.write(message + '\n');
  }
}
