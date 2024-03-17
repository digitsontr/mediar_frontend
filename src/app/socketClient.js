import io from "socket.io-client";

let socket;

const socketClient = (userId) => {
  const connectSocket = () => {
    socket = io("http://localhost:3000", {
      transports: ["websocket"],
      query: { userId },
    });

    window["my_socket"] = socket;

    socket.on("connect", () => {
      //console.log("Connected to Socket.IO Server");
    });

    /*
    socket.on("mediatlon_socket_connected", (message) => {
      console.log("Connected to Socket.IO Server using mediatlon_socket_connected channel: ", message);
    });*/
    
    socket.on("disconnect", () => {
      //console.log("\n\n_SOCKET: Disconnected from Socket.IO Server");
      // Bağlantı kesildiğinde yeniden bağlanmaya çalış
      setTimeout(() => {
        if (socket.connected !== true) {
          connectSocket();
        }
      }, 5000); // 3 saniye sonra tekrar dene (isteğe bağlı olarak ayarlayabilirsiniz)
    });

    /*
    socket.on("connect_error", (err) => {
      console.log(`\n\n_SOCKET: Socket Connection error: ${err.message}`);
      // Bağlantı hatası olduğunda yeniden bağlanmaya çalış
      setTimeout(() => {
        if (socket.connected !== true) {
          connectSocket();
        }
      }, 5000); // 3 saniye sonra tekrar dene (isteğe bağlı olarak ayarlayabilirsiniz)
    });
    */

    /*
    if (socket.connected) {
      console.log("\n\n_SOCKET: Socket is connected");
    } else {
      console.log("\n\n_SOCKET: Socket is disconnected");
    }
    */
  };

  connectSocket();

  return socket;
};

export default socketClient;
