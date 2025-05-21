import { onValue, push, ref, set } from "firebase/database";
import { rtdb } from "./db.js";
import { Router } from "@vaadin/router";

const API_BASE_URL = process.env.API_CONNECTION;
export const state = {
  data: {
    email: "",
    fullName: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
    messages: [],
    rooms: [],
    currentRoom: {
      id: "",
      rtdbRoomId: "",
      guestName: "",
      owner: "",
      ownerName: "",
      guestUserId: "",
    },
  },
  error: { exists: false },
  errors: [
    {
      errorName: "errCreating",
      errStatus: false,
      message: "Error creating user",
    },
    {
      errorName: "errJoining",
      errStatus: false,
      message: "Error joining room",
    },
    {
      errorName: "errSending",
      errStatus: false,
      message: "Error sending message",
    },
    {
      errorName: "errFetching",
      errStatus: false,
      message: "Error fetching messages",
    },
    {
      errorName: "errCreatingRoom",
      errStatus: false,
      message: "Error creating room",
    },
    {
      errorName: "errListening",
      errStatus: false,
      message: "Error listening to room",
    },
    {
      errorName: "errAccessing",
      errStatus: false,
      message: "Error accessing room",
    },
    {
      errorName: "errFinding",
      errStatus: false,
      message: "Error finding room",
    },
    {
      errorName: "errClearing",
      errStatus: false,
      message: "Error clearing rooms",
    },
  ],
  listeners: [],
  init() {},

  async listenRoom() {
    console.log("listenRoom");
    const cs = state.getState();
    const chatroomsRef = ref(rtdb, "/rooms/" + cs.rtdbRoomId);
    await onValue(chatroomsRef, async (snapshot) => {
      const val = snapshot.val();
      if (
        val.guestInfo.guestName == "none" &&
        val.guestInfo.guestUserId == "none" &&
        val.owner !== cs.userId
      ) {
        state.addGuestInfo();
      }
      if (val.guestInfo.guestName !== "none" || undefined) {
        cs.currentRoom.guestName = val.guestInfo.guestName;
        cs.currentRoom.guestUserId = val.guestInfo.guestUserId;
      }
      cs.messages = val.messages;
      return state.setState(cs);
    });
  },
  getState() {
    return this.data;
  },

  async sendMessageToRoom(rtdbRoomId: string, messageData: any) {
    const messagesRef = ref(rtdb, `rooms/${rtdbRoomId}/messages`);
    return await push(messagesRef, messageData);
  },
  async addGuestInfo() {
    console.log("addGuestInfo");
    const cs = state.getState();
    const rtdbRoomId = cs.rtdbRoomId;
    const messagesRef = ref(rtdb, `rooms/${rtdbRoomId}/guestInfo`);
    return await set(messagesRef, {
      guestName: cs.fullName,
      guestUserId: cs.userId,
    });
  },

  async singIn(callback) {
    const cs = this.getState();
    const fetchFunc = async () =>
      await fetch(API_BASE_URL + "/auth", {
        method: "POST",
        headers: {
          mode: "cors",
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: cs.email, name: cs.fullName }),
      });
    if (cs.email && cs.fullName) {
      const fetchRes = await fetchFunc();
      if (fetchRes.status === 401) {
        console.error("Unauthorized");
        return;
      }
      const data = await fetchRes.json();
      cs.userId = data.userId;
      this.setState(cs);
      // state.errors.find(e=> e.errorName=="errCreating").errStatus = true;
      return callback();
    } else if (cs.email && cs.fullName === "") {
      try {
        const fetchRes = await fetchFunc();
        if (fetchRes.status === 404) {
          console.error("User not found");
          return;
        }
        const data = await fetchRes.json();
        cs.userId = data.userId;
        cs.fullName = data.userData.name;
        this.setState(cs);
        return callback();
      } catch (error) {
        state.error.exists = true;
        state.errors.find((e) => e.errorName == "errCreating").errStatus = true;
        return;
      }
    } else {
      console.error("No email or fullName found");
      alert("No email or fullName found");
      return;
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
      await state.clearRooms();
      cs.rooms = data;
      return await state.setState(cs);
    } else {
      console.error("No userId found");
    }
  },
  async askNewRoom() {
    const cs = state.getState();
    if (cs.userId && cs.fullName) {
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
      await state.setState(cs);
      Router.go("/chat");
      return;
    } else {
      alert("No userId or fullName found");
    }
  },

  clearRooms() {
    const cs = this.getState();
    cs.rooms = [];
    this.setState(cs);
  },

  async accessToRoom() {
    console.log("accessToRoom");
    const cs = state.getState();
    const roomIdState = cs.roomId;
    try {
      const fetchRes = await fetch(API_BASE_URL + "/room/join", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          userId: cs.userId,
          roomId: roomIdState,
          guestName: cs.fullName,
        }),
      });
      const data = await fetchRes.json();
      cs.rtdbRoomId = data.rtdbRoomId;
      cs.currentRoom = {
        id: state.data.roomId,
        rtdbRoomId: data.rtdbRoomId,
        owner: data.owner,
        ownerName: data.ownerName,
        guest: cs.fullName,
        guestUserId: data.guestUserId,
      };
      state.setState(cs);
      Router.go("/chat");
      return;
    } catch (error) {
      state.error.exists = true;
      state.errors.find((e) => e.errorName == "errJoining").errStatus = true;
      return;
    }
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
  stateCleaner() {
    const cs = this.getState();
    cs.email = "";
    cs.fullName = "";
    cs.userId = "";
    cs.roomId = "";
    cs.rtdbRoomId = "";
    cs.messages = [];
    cs.rooms = [];
    cs.guestName = "";
    cs.currentRoom = {
      id: "",
      rtdbRoomId: "",
      guestName: "",
      owner: "",
      ownerName: "",
      guest: "",
    };
    this.setState(cs);
  },
};
