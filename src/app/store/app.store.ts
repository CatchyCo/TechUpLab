import { countryReducer } from "../state/Country/country.reducer"
import { CountryData } from "../state/Country/country.state"



export interface AppState{
    countries:CountryData
}

export const AppReducer ={
    countries : countryReducer
}