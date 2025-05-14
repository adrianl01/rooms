import { onValue, ref } from "firebase/database"
import { rtdb } from "./db"
import * as map from "lodash/map"
const API_BASE_URL = "http://localhost:3000"

const state = {
    data: {
        email: "",
        fullName: "",
        userId: "",
        roomId: "",
        rtdbRoomId: "",
        messages: [],
    },
    listeners: [],
    init() {

    },

    listenRoom() {
        console.log("listenRoom")
        const cs = this.getState();
        const db = rtdb;
        const chatroomsRef = ref(db, "/rooms/" + cs.rtdbRoomId);
        onValue(chatroomsRef, (snapshot => {
            const val = snapshot.val();
            console.log(val)
            const messagesList = map(val.messages);
            cs.messages = messagesList
            this.setState(cs);
        }))
    },

    getState() {
        return this.data;
    },

    setName(name: string) {
        const currentState = this.getState();
        currentState.name = name;
        this.setState(currentState);
    },

    pushMessage(message: string) {
        console.log("mensaje del pushMessasge", message)
        const nombreDelState = this.data.name;
        fetch(API_BASE_URL + "/messages", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                from: nombreDelState,
                message: message
            }),
        })
    },
    setEmailAndFullName(email: string, fullName: string) {
        const cs = this.getState();
        cs.email = email;
        cs.fullName = fullName;
        this.setState(cs);
    },
    singIn(callback) {
        const cs = this.getState()
        if (cs.email) {
            fetch(API_BASE_URL + "/signin", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email: cs.email })
            }).then((res) => {
                return res.json();
            }).then(data => {
                cs.userId = data.id;
                this.setState(cs);
                callback();
            })
        } else {
            console.error("No hay un email en el state");
            callback(true);
        }
        // lunes 9/10/2023 19:16, agregar el endpoint signUp. Update: lunes 30/10/2023, ya estan todos los enpoints listos hace una semana.
    },

    askNewRoom(callback) {
        console.log("askNewRoom");
        const cs = this.getState();
        if (cs.userId) {
            fetch(API_BASE_URL + "/rooms", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ userId: cs.userId })
            }).then((res) => {
                return res.json();
            }).then(data => {
                cs.roomId = data.id;
                this.setState(cs);
                callback();
            })

        } else {
            console.error("No hay userId")
        }
    },

    accessToRoom(callback?) {
        console.log("accessToRoom");
        const cs = this.getState();
        const roomIdState = cs.roomId
        fetch(API_BASE_URL + "/rooms/" + roomIdState + "?userId=" + cs.userId)
            .then((res) => {
                return res.json();
            }).then(data => {
                console.log(data.rtdbRoomId)
                cs.rtdbRoomId = data.rtdbRoomId;
                this.setState(cs);
                this.listenRoom();
                if (callback) callback();
            })
    },

    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();
        }
        // --------------------------
        console.log("State Changed", this.data)
    },
    subscribe(callback: (any) => any) {
        this.listeners.push(callback)
    }
}

export { state }