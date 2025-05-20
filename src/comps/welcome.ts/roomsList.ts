import { state } from "../../state.js";
import { style } from "./roomListCss.js";
// import { Router } from "@vaadin/router";

const userIdSt = state.data.userId;
export function roomList() {
  return customElements.define(
    "roomlist-el",
    class Welcome extends HTMLElement {
      connectedCallback() {
        this.render();
        this.appendRooms();
      }
      rooms: any[] = state.data.rooms;

      render() {
        const div = document.createElement("div");
        div.classList.add("main-container");
        div.innerHTML = `
            <h4>Previous rooms you've joined</h4>
            <ul class="room-list"></ul>
        `;
        this.appendChild(style);
        this.appendChild(div);
        const btn = div.querySelector(".room-list");
        btn?.addEventListener("click", async (e) => {
          e.preventDefault();
          const target = e.target as HTMLElement;
          const text = target.textContent;
          const roomId = text.split(":")[1].trim();
          const roomData = this.rooms.find((r) => r.id === roomId);
          await this.roomHandler(roomData);
        });
      }
      appendRooms() {
        const mainMain = document.querySelector(".main-main") as HTMLElement;
        mainMain.classList.add("blurry-bg");
        mainMain.style.display = "flex";
        const roomListEl = document.querySelector(".room-list") as HTMLElement;
        state.data.rooms.map((r) => {
          if (userIdSt !== r.owner) {
            const buttonEl = document.createElement("button");
            buttonEl.classList.add("roomList-button");
            buttonEl.innerHTML = `
            <h5>${r.ownerName} Room Id: ${r.id}</h5>       
            `;
            return roomListEl.appendChild(buttonEl);
          } else {
            const buttonEl = document.createElement("button");
            buttonEl.classList.add("roomList-button");
            buttonEl.innerHTML = `
                  <h5>You own this room. Room Id:${r.id}</h5>
            `;
            return roomListEl.appendChild(buttonEl);
          }
        });
      }
      async roomHandler(roomData) {
        console.log();
        const cs = state.getState();
        cs.roomId = roomData.id;
        cs.rtdbRoomId = roomData.rtdbRoomId;
        cs.guestName = roomData.guestName;
        cs.currentRoom = roomData;
        state.setState(cs);
        // const connection = await state.listenRoom();
        // console.log("connection", connection);
        const { Router } = await import("@vaadin/router");
        Router.go("/chat");
      }
    }
  );
}
