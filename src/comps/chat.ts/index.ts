import { style } from "./css.js";
import { state } from "../../state.js";
import { map } from "lodash";
let loading = true;
customElements.define(
  "chat-el",
  class Welcome extends HTMLElement {
    connectedCallback() {
      this.render();
      this.listeners();
      state.listenRoom();
      state.subscribe(() => {
        if (loading) {
          loading = false;
          setTimeout(() => {
            const l = map(state.data.messages);
            l.map((m) => {
              this.appendMessage(m);
            });
          }, 1000);
          const messagesContainer = document.querySelector(".messages");
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } else {
          const lastMessage = map(state.data.messages)
            .slice()
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            )
            .at(-1);
          if (lastMessage) {
            this.appendMessage(lastMessage);
          }
        }
      });
    }
    listeners() {
      const cs = state.getState();
      const form = this.querySelector(".form");
      const input = this.querySelector(".message-input");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = (input as HTMLInputElement).value;
        console.log(message);
        const messageData = {
          from: cs.fullName,
          message: message,
          createdAt: new Date().toISOString(),
        };
        state.sendMessageToRoom(cs.rtdbRoomId, messageData);
      });
    }
    appendMessage(message) {
      const nameSt = state.data.fullName;
      const messagesContainer = this.querySelector(".messages");
      const div = document.createElement("div");
      const dateString = new Date(message.createdAt).toLocaleString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
      if (nameSt == message.from) {
        div.classList.add("message-owner");
        div.innerHTML = `
          <p class="message-p">${message.message}</p>
          <small class="message-date">${dateString}</small>
        `;
      } else {
        div.classList.add("message");
        div.innerHTML = `
          <p class="message-p">${message.message}</p>
          <small class="message-date">${dateString}</small>
        `;
      }
      messagesContainer.appendChild(div);
      console.log(messagesContainer.scrollTop, messagesContainer.scrollHeight);
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        const messages = document.querySelectorAll(".message, .message-owner");
        messages[messages.length - 1]?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
    render() {
      const div = document.createElement("div");
      div.classList.add("main");
      div.innerHTML = `
        <div class="header">
        <h5>${state.data.guestName}</h5>
      <h5 id="roomId">${state.data.roomId}</h5>        
        </div>
        <div class="messages">
        </div>
      <div class="form-container">
        <form class="form">
           <input type="text" class="message-input" name="input" placeholder="Write down a message...">
            <button type="submit" class="form-button" aria-label="Send"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
    <path d="M2 21l21-9-21-9v7l15 2-15 2v7z" fill="currentColor"/>
  </svg></button>
            </form>
            </div>
`;
      this.appendChild(div);
      this.appendChild(style);
    }
  }
);
