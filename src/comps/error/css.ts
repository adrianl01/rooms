export const style = document.createElement("style");
style.innerHTML = `
 .main-Error-main {
       position: absolute;
    z-index: 5;
    /* top: 0; */
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 100dvh;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
   .main-Error-container {
  z-index = 6;
  width: 100%;
  display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    border: solid black 2px;
    background-color: #ff00006e;
    padding: 10px;
     }
  .blurry-bg {
  background: rgba(255, 255, 255, 0.5); /* semi-transparent white */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px); /* for Safari support */
}

.room-list {
 border: solid black 2px;
 border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none; /* Remove the dots */
  padding-left: 0;   /* Remove default left padding */
padding: 15px;
width: 100%;
}

.roomList-button, .cancel, .create-room, .no-userName-cancel {
  width: 100%;
    text-decoration: none;
    background: transparent;
    border: solid black 2px;
    border-radius: 8px;
    font-family: "Cal Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.cancel, .create-room, .no-userName-cancel {
  margin-top: 10px;
  height: 40px;
  }
`;
