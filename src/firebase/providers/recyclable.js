import { RealTime } from "../config/connection";
import {  ref, onValue, set  } from "firebase/database";
import { VerifyErroCode } from "../config/errors";


export function GetRecyclable(setData) {
    const recyclableRef = ref(RealTime, "recyclable");
    onValue(recyclableRef, (snapshot) => {
        setData(snapshot.val());
    });
}

export function GetCollectorRecyclable(idCollector, setData) {
    const recyclableRef = ref(RealTime, `collectors/${idCollector}`);
    onValue(recyclableRef, (snapshot) => {
        setData(snapshot.val());
    });
}

async function AssociateCollection (idCollector, idRecyclable, time) {
    const recyclableCollectorRef = ref(RealTime, `collectors/${idCollector}/${idRecyclable}`);
    await set(recyclableCollectorRef, time);
}

export async function AssociateCollector (idCollector, idRecyclable, colletorName, collectorPhotoURL, time, cb){
    try{
        await AssociateCollection(idCollector, idRecyclable, time);

        const recyclableCollectorRef2 = ref(RealTime, `recyclable/${idRecyclable}/status`);
        await set(recyclableCollectorRef2, "loading");

        const recyclableCollectorRef = ref(RealTime, `recyclable/${idRecyclable}/collector`);
        await set(recyclableCollectorRef, {
            'id' : idCollector,
            'name' : colletorName,
            'photoUrl' : collectorPhotoURL
        })

    } catch (err) {
        const error = {
            title: "Falha ao Associar Coleta",
            content: VerifyErroCode(err.code)
        }
        cb(error);
    }    
}

async function DisassociateCollection (idCollector, idRecyclable) {
    const recyclableCollectorRef = ref(RealTime, `collectors/${idCollector}/${idRecyclable}`);
    await set(recyclableCollectorRef, null);
}
export async function DisassociateCollector (idCollector, idRecyclable, cb){
    try{
        await DisassociateCollection(idCollector, idRecyclable);

        const recyclableCollectorRef = ref(RealTime, `recyclable/${idRecyclable}/collector`);
        await set(recyclableCollectorRef, {
            'id' : 'none',
            'name' : 'none',
            'photoUrl' : 'none'
        })

        const recyclableCollectorRef2 = ref(RealTime, `recyclable/${idRecyclable}/status`);
        await set(recyclableCollectorRef2, "pending");
    } catch (err) {
        const error = {
            title: "Falha ao Desassociar Coleta",
            content: VerifyErroCode(err.code)
        }
        cb(error);
    }    
}
