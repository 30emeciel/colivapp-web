import {CheckoutAPI, Client} from "@adyen/api-library";

const ADYEN_API_KEY = process.env.ADYEN_API_KEY!
const ADYEN_ENVIRONMENT = process.env.NEXT_PUBLIC_ADYEN_ENVIRONMENT! as Environment
export const ADYEN_MERCHANT_ACCOUNT = process.env.ADYEN_MERCHANT_ACCOUNT!
export const client = new Client({ apiKey: ADYEN_API_KEY, environment: ADYEN_ENVIRONMENT });
export const checkout = new CheckoutAPI(client);
