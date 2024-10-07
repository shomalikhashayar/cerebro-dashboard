import { atom } from "recoil";

export const filterCameraAtom = atom({
    key: 'filterCameraAtom_key',
    default:null,
})


export const newFaceDataAtom = atom({
    key:'newFaceDataAtom_key',
    default:null,
})


const defaultControlState = {
    current_step:'',
    data:{},
    status:'',
}



export const ControlAccountAtom = atom({
    key:'ControlAccountAtom_key',
    default:null,
})
export const ControlCameraAtom = atom({
    key:'ControlCameraAtom_key',
    default:null,
})
export const ControlFaceAtom = atom({
    key:'ControlFaceAtom_key',
    default:null,
})
export const ControlGroupAtom = atom({
    key:'ControlGroupAtom_key',
    default:null,
})
export const ControlPlateAtom = atom({
    key:'ControlPlateAtom_key',
    default:null,
})
export const ControlZoneAtom = atom({
    key:'ControlZoneAtom_key',
    default:null,
})

