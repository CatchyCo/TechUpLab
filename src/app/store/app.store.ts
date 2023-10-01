import { customerReducer } from "../state/Country/Customer/customer.reducer"
import { CustomerState } from "../state/Country/Customer/customer.state"
import { pinReducer } from "../state/Country/PinData/pin.reducers"
import { PinState } from "../state/Country/PinData/pin.state"
import { countryReducer } from "../state/Country/country.reducer"
import { CountryData } from "../state/Country/country.state"




export interface AppState{
    countries:CountryData,
    customer:CustomerState,
    pins:PinState
}

export const AppReducer ={
    countries : countryReducer,
    customer:customerReducer,
    pins:pinReducer
}