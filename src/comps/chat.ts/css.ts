export const style = document.createElement("style");

style.innerHTML = ` 
.main {
  display: flex;
  flex-direction: column;
  height: 100dvh; /* Full viewport height */
  position: relative;
  min-width: 300px;
  max-width: 600px;
}
.header {
color: black;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 130, 130, 1);
  z-index: 2;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  width: 100%;
  height: 60px;
}

.header h5 {
 margin: 0;
    font-size: 23px;
    font-weight: 400;
    display: flex;
    align-items: center;
}

.title {
  text-align: center;
  width: 375px;
}

.messages {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
  padding: 10px;
  padding-top: 70px;
  background:rgb(250, 187, 187);
  // flex: 1 1 auto;
}

.message, .message-owner { 
  display: flex;      
  flex-direction: column;
  gap: 10px;
  background-color: rgb(244, 173, 173);
  border-radius: 10px;
  padding: 5px;
  width: fit-content;
  max-width: 90%;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}
.message {
  text-align: left;
  align-self: flex-start;
}
.message-owner {
  text-align: right;
  align-self: flex-end;
}
.message-p {
  margin: 0;
  font-size: 24px;
}

.form-container {
  position: sticky;
  bottom: 0;
  background: #fff;
  z-index: 2;
  width: 100%;
}
.form {
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 10px 20px;
  background-color: rgb(249, 77, 77);
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
  font-size: 22px;
}

.form-button {
  min-width: 25px;
  width: 10%;
  text-decoration: none;
  background: transparent;
  border: solid black 2px;
  border-radius: 8px;
  font-family: "Cal Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}
`;
