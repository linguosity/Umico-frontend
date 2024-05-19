export interface Address {
    id: number;
    customer: number;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  }
  
  export interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    shipping_addresses: Address[];
  }