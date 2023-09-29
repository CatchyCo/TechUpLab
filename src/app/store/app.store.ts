import { countryReducer } from "../state/Country/country.reducer"
import { CountryData } from "../state/Country/country.state"
//import { CustomerReducer } from "../state/Customers/customer.reducer"
import { CustomerState } from "../state/Customers/customer.state"



export interface AppState{
    countries:CountryData,
    customer:CustomerState
}

export const AppReducer ={
    countries : countryReducer,
   // customer:CustomerReducer
}