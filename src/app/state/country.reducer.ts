import { Action, createReducer, on } from "@ngrx/store"
import { CountryData, initCountryState } from "./country.state"
import { getCountryDataSuccess } from "./country.action"

const __countryReducer = createReducer(
    initCountryState,
    on(getCountryDataSuccess,(state, action)=>{
        return {
            ...state,
            countries: action.countries
        }
    })
    
)

export function countryReducer(state: CountryData | undefined,actions: Action){
    return __countryReducer(state,actions)
}