
import { countryReducer } from "../state/country.reducer";
import { CountryData } from "../state/country.state";

export interface AppState{
    countries:CountryData
}

export const AppReducer ={
    countries : countryReducer
}