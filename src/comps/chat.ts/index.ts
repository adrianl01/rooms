import { style } from "./css";
import { messages } from "../..";
customElements.define(
  "chat-el",
  class Welcome extends HTMLElement {
    connectedCallback() {
      this.render();
      this.listeners();
    }

    messages = messages;
    listeners() {
      const form = this.querySelector(".form");
      const input = this.querySelector(".message-input");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = (input as HTMLInputElement).value;
        console.log(message);
        if (message) {
          const newMessage = {
            owner: true,
            message,
            name: "Gustavo",
          };
          this.messages.push(newMessage);
          this.appendMessage(newMessage); // Append the new message
        }
      });
    }
    appendMessage(message) {
      const messagesContainer = this.querySelector(".messages");
      const div = document.createElement("div");
      if (message.owner) {
        div.classList.add("message-owner");
        div.innerHTML = `
          <h4 class="message-name">${message.name}</h4>
          <p class="message-p">${message.message}</p>
        `;
      } else {
        div.classList.add("message");
        div.innerHTML = `
          <h4 class="message-name">${message.name}</h4>
          <p class="message-p">${message.message}</p>
        `;
      }
      messagesContainer.appendChild(div); // Append the new message to the container

      // Scroll to the bottom of the messages container
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    render() {
      const div = document.createElement("div");
      div.classList.add("main");
      div.innerHTML = `
        <div class="header">
      <h3 id="roomId"><span>RoomId:</span>123</h3>        
        </div>
        <div class="messages">
        ${this.messages
          .map((message) => {
            if (message.owner) {
              const div = document.createElement("div");
              div.classList.add("message-owner");
              div.innerHTML = `
               <h4 class="message-name">${message.name}</h4>
              <p class="message-p">${message.message}</p>
          `;
              return div.outerHTML;
            } else {
              const div = document.createElement("div");
              div.classList.add("message");
              div.innerHTML = `
               <h4 class="message-name">${message.name}</h4>
              <p class="message-p">${message.message}</p>
          `;
              return div.outerHTML;
            }
          })
          .join("")}
        </div>
      <div class="form-container"/>
        <form class="form">
           <input type="text" class="message-input" name="input" placeholder="Write down a message...">
            <button type="submit" class="form-button">Comenzar</button>
            </form>
            </div>
`;
      this.appendChild(div);
      this.appendChild(style);
    }
  }
);
