export interface Customer {
  country: string;
  email: string;
  id: string;
  region: string;
  title: string;
}

export interface CustomerState {
  customer: Customer[] | null;
}

export const initStateCustomer: CustomerState = {
  customer: [],
};
