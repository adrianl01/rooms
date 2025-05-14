export const style = document.createElement("style");

style.innerHTML = ` 
.main {
display:flex;
flex-direction: column;
align-items: center;
min-width: 356px;
max-width: 600px;
height: 100dvh;
}
 .header {
       background-color: rgb(249, 77, 77);
       width: 100%;
       height: 60px;
       padding: 0 10px;
   }

   .title {
       text-align: center;
       width: 375px;
   }

   .messages {
   display: flex;
    flex-grow: 1;
    gap: 10px;
    width: 100%;
    flex-direction: column;
    padding: 10px 10px;
    overflow-y: auto;
    background-color: rgb(248, 218, 218);
    }

    .message, .message-owner { 
   display: flex;      
    flex-direction: column;
    gap: 10px;
    background-color: rgb(244, 173, 173);
    border-radius: 10px;
    padding: 10px;
    width: fit-content;
    max-width: 600px;
    margin: 0;
}
.message-owner {
text-align: right;
align-self: flex-end;
}
    .message-name, .message-p {
    margin: 0;
}

    .form-container {
   width:100%;
   position: ;
   }
   .form {
       display: flex;
       flex-direction: column;
       gap: 10px;
       width: 100%;
       padding: 10px 20px;
       background-color: rgb(249, 77, 77);
   }

   .form-email__label,
   .form-name__label {
       display: flex;
       flex-direction: column;
       gap: 10px;
   }

.message-input {  
    width: 100%;
    text-decoration: none;
    background: transparent;
    border: solid black 2px;
    border-radius: 8px;
    font-family: "Cal Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
    color: black;
    }

      .form-button {
     width: 100%;
    text-decoration: none;
    background: transparent;
    border: solid black 2px;
    border-radius: 8px;
    font-family: "Cal Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
   }
       `;
