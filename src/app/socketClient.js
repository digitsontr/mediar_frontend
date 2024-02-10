import io from "socket.io-client";

const socketClient = (userId) => {
  const socket = io("http://localhost:3000", {
    query: { userId },
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from Socket.IO Server");
  });

  socket.on("connect_error", (err) => {
    //console.log(`Connection error: ${err.message}`);
  });

  /* test event
  socket.on("selam", () => {
    console.log("selam");
  });
  */

  return socket;
};

export default socketClient;
