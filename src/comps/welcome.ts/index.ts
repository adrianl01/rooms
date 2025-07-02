import { state } from "../../state.js";
import { style } from "./css.js";
import "./roomsList.js";
import "./../error/index.js";
import { Router } from "@vaadin/router";

customElements.define(
  "welc-el",
  class Welcome extends HTMLElement {
    connectedCallback() {
      this.render();
      this.listeners();
    }
    render() {
      if (state.data.userId !== "") {
        state.stateCleaner();
      }
      const div = document.createElement("div");
      div.classList.add("main");
      div.innerHTML = `
  <div class="header"></div>
  <h2 class="title">iMessages😃🤗😜</h2>
  <h4>Write down your email and name to get started✍</h4>
  <div class="form-container">
    <form class="form">
      <sl-input 
        label="Your Email" 
        name="email" 
        type="email" 
        class="email" 
        pill 
        required
        style="--sl-input-background-color: #fff0f0; --sl-input-color: #fc3434;">
      </sl-input>
      <sl-input 
        label="Your Name" 
        name="name" 
        maxlength="8" 
        class="name" 
        pill 
        style="--sl-input-background-color: #fff0f0; --sl-input-color: #fc3434;">
      </sl-input>
      <div class="form-div">
        <label class="text">Room Options</label>
        <div id="roomText">You'll start a new room</div>
        <div class="form__room">
          <sl-button variant="default" class="existant-room"; color: white;" pill>
            Existant Room
          </sl-button>
        </div>
      </div>
      <div class="form-room-id">
        Room Id
        <sl-input 
          name="room" 
          class="room-id" 
          maxlength="4" 
          pill 
          style="--sl-input-background-color: #fff0f0;">
        </sl-input>
      </div>
      <sl-button type="submit" class="form-button" variant="primary" color: white;" pill>
        Start
      </sl-button>
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
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const emailInput = this.querySelector('sl-input[name="email"]') as any;
        const nameInput = this.querySelector('sl-input[name="name"]') as any;
        const roomInput = this.querySelector('sl-input[name="room"]') as any;
        const email = emailInput?.value;
        const name = nameInput?.value;
        const roomId = roomInput?.value;
        if (!email) {
          return console.error("Email is required");
        }
        if (!email.includes("@")) {
          console.error("Please enter a valid email");
          return;
        }
        state.data.email = await email;
        state.data.fullName = await name;
        state.data.roomId = await roomId;
        console.log(roomOption);
        if (roomOption.room === "existant") {
          await state.singIn(state.accessToRoom);
          if (state.error.exists) {
            console.error("Error", state.error);
            this.showErrorSign();
          } else {
            Router.go("/chat");
          }
        } else if (roomOption.room === "new") {
          await state.singIn(state.getRooms);
          if (state.error.exists) {
            console.error("Error", state.error);
            this.showErrorSign();
          } else {
            this.showRoomList();
          }
        }
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
    showRoomList() {
      const el = document.createElement("roomlist-el");
      el.classList.add("main-main");
      document.body.appendChild(el);
    }
    showErrorSign() {
      const el = document.createElement("error-el");
      el.classList.add("main-Error-main", "blurry-bg");
      document.body.appendChild(el);
    }
  }
);
