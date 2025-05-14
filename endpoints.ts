import express from "express";
import { rtdb, fsdb } from "./src/db";
import { ref, set, onValue, getDatabase, get, child } from "firebase/database"
import { doc, collection, addDoc, getDoc, getDocs, where, query, setDoc } from "firebase/firestore"
import cors from "cors"
import map from "lodash/map"
import { v4 as uuid4 } from "uuid"

const port = 3000;
const app = express();
app.use(express.json())
app.use(cors())

const usersRef = collection(fsdb, "users")
const roomsRef = collection(fsdb, "rooms")
const roomShortId = 1000 + Math.floor(Math.random() * 999)
const createDocRoomsRef = doc(fsdb, "rooms/" + roomShortId.toString())

// -----------------------------------------------

app.post("/signup", function (req, res) {
    const email = req.body.email;
    const name = req.body.name;
    console.log(email, name)
    const q = query(usersRef, where("email", "==", email))
    getDocs(q).then(searchRes => {
        if (searchRes.empty) {
            addDoc(usersRef, {
                email, name
            }).then(newUserRef => {
                res.json({
                    id: newUserRef.id,
                    new: true,
                })
            })

        } else {
            res.status(400).json({
                message: "user already exist"
            })
        }
    })
});

// -----------------------------------------------

app.post("/signin", (req, res) => {
    const { email } = req.body
    const q = query(usersRef, where("email", "==", email))
    getDocs(q).then(searchRes => {
        if (searchRes.empty) {
            res.status(404).json({
                message: "not found"
            })
        } else {
            res.json({
                id: searchRes.docs[0].id
            })
        }
    })
})

// -----------------------------------------------

app.post("/rooms", function (req, res) {
    const userId = req.body.id;
    getDoc(doc(usersRef, userId)).then(doc => {
        console.log("doc:", doc.data())
        if (doc.exists()) {
            console.log("userId:", userId)
            const rtdbRoomsRef = ref(rtdb, "rooms/" + uuid4())
            set(rtdbRoomsRef, {
                messages: [],
                owner: userId
            }).then(() => {
                const roomLongId = rtdbRoomsRef.key;
                setDoc(createDocRoomsRef, {
                    rtdbRoomId: roomLongId
                }).then(() => {
                    res.json({
                        id: roomShortId.toString()
                    })
                })
            })
        } else {
            res.status(401).json({ message: "Necesistas crear una cuenta para crear una room" })
        }
    })
})

// -----------------------------------------------

app.get("/rooms/:roomId", function (req, res) {
    const { userId } = req.query;
    const { roomId } = req.params;
    console.log(userId, roomId)

    const docRoomsRef = doc(fsdb, "rooms/", roomId)
    getDoc(doc(usersRef, userId.toString())).then(doc => {
        if (doc.exists()) {
            getDoc(docRoomsRef).then((snap) => {
                const data = snap.data();
                console.log(data)
                res.json(data)
            });
        } else {
            res.status(401).json({ message: "Necesitas crear una cuenta para crear una room" });
        };
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})