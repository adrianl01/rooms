import { state } from "./state";
import "../router.ts";

export var messages = [
  {
    owner: true,
    message: "Hola, soy el dueño de la sala. ¿Cómo estás?",
    name: "juan",
  },
  {
    owner: false,
    message: "Hola, no soy el dueño de la sala. ¿Cómo estás?",
    name: "pedro",
  },
  {
    owner: true,
    message: "Hola, soy el dueño de la sala. ¿Cómo estás?",
    name: "juan",
  },
  {
    owner: false,
    message: "Hola, no soy el dueño de la sala. ¿Cómo estás?",
    name: "pedro",
  },
];

(function () {
  state.init();
  // state.setEmailAndFullName("gustavo.adrian.leiva879@gmail.com", "Gustavo Adrián Leiva");
  // state.singIn((err) => {
  //     if (err) console.error("Hubo un error en el singIn")
  //     state.askNewRoom(() => {
  //         state.accessToRoom();
  //     })
  // })
})();
