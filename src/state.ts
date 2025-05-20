import { onValue, push, ref } from "firebase/database";
import { rtdb } from "./db.js";

const API_BASE_URL = process.env.API_CONNECTION;
const state = {
  data: {
    email: "",
    fullName: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
    messages: [],
    rooms: [],
    guestName: "",
    currentRoom: {
      id: "",
      rtdbRoomId: "",
      guestName: "",
      owner: "",
      ownerName: "",
      guest: "",
    },
  },
  listeners: [],
  init() {},

  async listenRoom() {
    console.log("listenRoom");
    const cs = state.getState();
    console.log("cs", cs);
    const chatroomsRef = ref(rtdb, "/rooms/" + cs.rtdbRoomId);
    await onValue(chatroomsRef, async (snapshot) => {
      const val = snapshot.val();

      cs.guestName = await val.guestName;
      cs.messages = await val.messages;
      return await state.setState(cs);
    });
  },

  getState() {
    return this.data;
  },

  async sendMessageToRoom(rtdbRoomId: string, messageData: any) {
    const messagesRef = ref(rtdb, `rooms/${rtdbRoomId}/messages`);
    return await push(messagesRef, messageData);
  },

  async singIn(callback) {
    const cs = this.getState();
    if (cs.email && cs.fullName) {
      const fetchRes = await fetch(API_BASE_URL + "/auth", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: cs.email, fullName: cs.fullName }),
      });
      const data = await fetchRes.json();
      if (fetchRes.status === 404) {
        return console.error("No se encontró el usuario");
      }
      cs.userId = data.userId;
      cs.fullName = data.userData.name;
      this.setState(cs);
      return callback();
    } else {
      console.error("No email or fullName found");
    }
    // lunes 9/10/2023 19:16, agregar el endpoint signUp. Update: lunes 30/10/2023, ya estan todos los enpoints listos hace una semana.
  },

  async getRooms() {
    const cs = state.getState();
    if (cs.userId) {
      const roomsRes = await fetch(API_BASE_URL + "/room", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: cs.userId }),
      });
      const data = await roomsRes.json();
      cs.rooms = data;
      return state.setState(cs);
    } else {
      console.error("No userId found");
    }
  },

  async askNewRoom() {
    console.log("askNewRoom");
    const cs = state.getState();
    if (cs.userId) {
      const fetchRes = await fetch(API_BASE_URL + "/room/new", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: cs.userId, userName: cs.fullName }),
      });
      const data = await fetchRes.json();
      cs.roomId = data.id;
      cs.rtdbRoomId = data.rtdbRoomId;
      cs.currentRoom = {
        id: data.id,
        rtdbRoomId: data.rtdbRoomId,
        owner: data.owner,
        ownerName: cs.fullName,
        guest: data.guest,
      };
      return await state.setState(cs);
    } else {
      console.error("No hay userId");
    }
  },

  accessToRoom(callback?) {
    console.log("accessToRoom");
    const cs = state.getState();
    const roomIdState = cs.roomId;
    fetch(API_BASE_URL + "/rooms/" + roomIdState + "?userId=" + cs.userId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.rtdbRoomId);
        cs.rtdbRoomId = data.rtdbRoomId;
        state.setState(cs);
        state.listenRoom();
        if (callback) callback();
      });
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    // --------------------------
    console.log("State Changed", this.data);
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
