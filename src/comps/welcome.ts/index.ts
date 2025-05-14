import { state } from "../../state";
import { style } from "./css";

customElements.define(
  "welc-el",
  class Welcome extends HTMLElement {
    connectedCallback() {
      this.render();
      this.listeners();
    }
    render() {
      const div = document.createElement("div");
      div.classList.add("main");
      div.innerHTML = `
        <div class="header"></div>
        <h2 class="title">iMessages😃🤗😜</h2>
        <h4>Write down your email and name to get started✍</h4>
      <div class="form-container"/>
        <form class="form">
            <label for="email" class="form-email__label">
                Your Email
                <input type="email" class="email" name="email">
            </label>
            <label for="name" class="form-name__label">
                Your Name
                <input type="text" class="name" name="name">
            </label>
            <div class="form-div">
            <label class="text">Room Options</label>
            <div id="roomText">You'll start a new room</div>
            <div for="room" class="form__room">
                <button class="existant-room">Existant Room</button>
            </div>
            </div>
            <div class="form-room-id">
            Room Id
            <input type="text" class="room-id" name="room">
        </div>
            <button type="submit" class="form-button">Start</button>
            </form>
            </div>
`;
      this.appendChild(div);
      this.appendChild(style);
    }
    listeners() {
      const roomOption = {
        room: "new",
      };
      const form = this.querySelector(".form") as HTMLElement;
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const form = e.target as any;
        const email = form.email.value;
        const name = form.name.value;
        const roomId = form.room.value;
        state.data.email = email;
        state.data.fullName = name;
        state.data.roomId = roomId;
        if (roomOption.room === "existant") {
          state.singIn(() => {
            state.accessToRoom();
          });
        } else {
          state.singIn(() => {
            state.askNewRoom(() => {});
          });
        }
        console.log(state.data);
      });

      const buttonExistantRoom = this.querySelector(".existant-room");
      buttonExistantRoom.addEventListener("click", (e) => {
        e.preventDefault();
        if (roomOption.room == "new") {
          roomOption.room = "existant";
          const newRoomId = this.querySelector(".form-room-id") as HTMLElement;
          newRoomId.style.display = "flex";
          const roomText = this.querySelector("#roomText") as HTMLElement;
          roomText.textContent = `Write down a 4-digit id to join a room`;
        } else if (roomOption.room == "existant") {
          roomOption.room = "new";
          const newRoomId = this.querySelector(".form-room-id") as HTMLElement;
          newRoomId.style.display = "none";
          const roomText = this.querySelector("#roomText") as HTMLElement;
          roomText.textContent = `You'll start a new room`;
        }
      });
    }
  }
);
