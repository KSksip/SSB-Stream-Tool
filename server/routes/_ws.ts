import { db } from '../utils/lowdb'

export default defineWebSocketHandler({
  open(peer) {
    peer.subscribe('channel')
    console.log("[ws] open", peer);
  },

  message(peer, message) {
    console.log("[ws] message", message.text());
    db.read()
    if (message.text().includes("update")) {
        peer.publish('channel', JSON.stringify(db.data))
    }

    if (message.text().includes("init")){
        peer.send(JSON.stringify(db.data))
    }
  },

  close(peer, event) {
    console.log("[ws] close", peer, event);
  },

  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});