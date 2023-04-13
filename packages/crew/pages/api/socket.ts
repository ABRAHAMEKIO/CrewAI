import { Server } from "socket.io";

export default (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already initialized');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
  }

  res.end();
}
