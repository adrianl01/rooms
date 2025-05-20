export const style = document.createElement("style");
style.innerHTML = `
 .main-main {
       position: absolute;
    z-index: 5;
    /* top: 0; */
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    width: 100%;
    height: 100dvh;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
   .main-container {
  z-index = 6;
  width: 100%;
  display: flex;
    flex-direction: column;
    align-items: center;

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

.roomList-button {
  width: 100%;
    text-decoration: none;
    // background: transparent;
    border: solid black 2px;
    border-radius: 8px;
    font-family: "Cal Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.roomList-button:hover {
background-color = rgba(255, 130, 130, 1);
}

.roomList-button:active {
background-color = rgb(248, 87, 87);
}

h5 {
  margin: 0;
  padding: 0;
  color: black;
height: 100%;
font-size: small;
font-weight: 400;
padding: 10px 0px;
}
`;
