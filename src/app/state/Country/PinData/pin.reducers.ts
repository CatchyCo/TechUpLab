import { Action, createReducer, on } from "@ngrx/store"
import { getPinDataSuccess } from "./pin.actions"
import { PinState, initStatePin } from "./pin.state"


const __pinReducer = createReducer(
    initStatePin,
    on(getPinDataSuccess,(state, action)=>{
        return {
            ...state,
            pins: action.pins
        }
    })
    
)

export function pinReducer(state: PinState | undefined,actions: Action){
    return __pinReducer(state,actions)
}