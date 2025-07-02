export const style = document.createElement("style");

style.innerHTML = ` 
.main {
display:flex;
flex-direction: column;
align-items: center;
min-width: 356px;
}
   .header {
       background-color: rgba(255, 130, 130, 1);
       width: 100%;
       height: 60px;
   }

   .title {
       text-align: center;
       width: 100%;
   }

//    .email,
//    .name,
//    .room-id {
//        border: solid 2px;
//        border-radius: 8px;
//    }

   .form-container {
   width:100%;
   padding: 15px
   }
   .form {
       display: flex;
       flex-direction: column;
       border: solid black 2px;
       border-radius: 8px;
       gap: 10px;
       width: 100%;
       padding: 20px;
       background-color: rgba(255, 130, 130, 1);

   }

   .form-email__label,
   .form-name__label {
       display: flex;
       flex-direction: column;
       gap: 10px;
   }

   .form__room {
       display: flex;
       gap:5px;
       padding: 0;
       list-style: none;
       background-color: rgba(255, 130, 130, 1);
   }

   .new-room,
   .existant-room {
    width: 100%;
    text-decoration: none;
    background: transparent;
    // border: solid black 2px;
    border-radius: 8px;
    font-family: "Cal Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
   }
    
   .form-div {
    display: flex;
    flex-direction: column;
    gap: 10px;
   }

   .text {
       display: flex;
       width: 100%;
       background: transparent;
       text-decoration: none;
       border: none;
   }

//    .existant-room:hover {
//        background-color: rgb(252, 52, 52);
//    }

//    .new-room:hover {
//        background-color: rgb(252, 52, 52);
//    }

   .form-room-id {
       display: none;
       flex-direction: column;
   }

   .existant-room:focus+.form-room-id {
       display: flex;
   }

   .form-button {
     width: 100%;
    text-decoration: none;
    background: transparent;
    // border: solid black 2px;
    border-radius: 8px;
    font-family: "Cal Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
   }

//    .form-button:hover {
//        background-color: rgb(252, 52, 52);
//    }
   sl-input::part(base) {
  --sl-input-border-color: #fc3434;
  --sl-input-focus-ring-color: #fc3434;
}
  sl-input::part(input):-webkit-autofill,
sl-input::part(input):-webkit-autofill:focus {
  -webkit-text-fill-color: #fc3434; 
  box-shadow: 0 0 0 1000px #fff0f0 inset !important; /* match your bg */
  caret-color: #fc3434;
}
  sl-input::part(input):-moz-autofill {
  color: #fc3434 !important;
  background-color: #fff0f0 !important;
}
   sl-button::part(base) {
       font-family: "Cal Sans", sans-serif;
         --sl-color-primary-600: #fc3434;
  --sl-color-primary-500: #fc3434;
  --sl-color-primary-400: #fc3434;
  --sl-color-primary-300: #fc3434;
  --sl-color-primary-200: #fc3434;
  --sl-color-primary-100: #fc3434;
  --sl-input-focus-ring-color:rgb(255, 255, 255);
   }
  .loading-sign {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.7);
  z-index: 9999;
  font-size: 1.2rem;
  color: #fc3434;
}
   `;
