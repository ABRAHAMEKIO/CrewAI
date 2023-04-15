import { Server } from 'socket.io';

/* eslint-disable no-console */
export default (req, res) => {
  if (res.socket.server.io) {
    console.info('Socket is already initialized');
  } else {
    console.info('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
  }

  res.end();
};
