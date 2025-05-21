import { state } from "../../state.js";
import { style } from "./css.js";

customElements.define(
  "error-el",
  class Welcome extends HTMLElement {
    connectedCallback() {
      this.render();
    }
    render() {
      const errorObj = state.errors.find((e) =>
        Object.values(e).some((v) => v === true)
      );
      const errorMessage = errorObj ? errorObj.message : "";
      const div = document.createElement("div");
      div.classList.add("main-Error-container");
      div.innerHTML = `
            <h2 class="title">😨Error🙈</h2>
            <div class="error">
              ${errorMessage ? `<span>${errorMessage}</span>` : ""}
            </div>
            <button class="cancel">Cancel</button>
        `;
      this.appendChild(style);
      this.appendChild(div);
      const cancelBtn = div.querySelector(".cancel");
      cancelBtn?.addEventListener("click", async (e) => {
        e.preventDefault();
        state.error.exists = false;
        state.errors.forEach((e) => {
          if (e.errStatus == true) {
            e.errStatus = false;
          }
        });
        const mainMain = document.querySelector(
          ".main-Error-main"
        ) as HTMLElement;
        mainMain.classList.remove("blurry-bg");
        mainMain.style.display = "none";
        const roomListEl = document.querySelector(
          ".main-Error-container"
        ) as HTMLElement;
        while (roomListEl.firstChild) {
          roomListEl.removeChild(roomListEl.firstChild);
        }
        document.querySelector(".main-Error-main")?.remove();
      });
    }
  }
);
