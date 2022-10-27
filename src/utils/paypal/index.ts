import { Request } from "express"
import config from '../../config'
import axios from 'axios'

const PAYPAL_API = config.PAYPAL_API
const auth = { username: config.PAYPAL_USER_ID, password:config.PAYPAL_SECRET}
const headers = { 
    "Content-Type": "application/json",
}

export const paypalService = {
    createPayment: async(price:string) => {
        const body = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
                    value: price
                }
            }],
            application_context: {
                brand_name: `MiTienda.com`,
                landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
                user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
                return_url: `http://localhost:3000/execute-payment`, // Url despues de realizar el pago
                cancel_url: `http://localhost:3000/cancel-payment` // Url despues de realizar el pago
            }
        }

        const result = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, body, { headers, auth})
         return result
    },

    executePayment : (queryToken:string) => {
        //req.query.token
        const token = queryToken;
        const PAYPAL_API = config.PAYPAL_API
        const result = axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, { auth, headers })
        return result
    }
}