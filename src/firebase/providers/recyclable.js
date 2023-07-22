import { RealTime } from "../config/connection";
import {  ref, onValue  } from "firebase/database";

const recyclableRef = ref(RealTime, "recyclable");

export function GetRecyclable(setData) {
    onValue(recyclableRef, (snapshot) => {
        setData(snapshot.val());
    });
}
