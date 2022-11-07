export const order = {
    buyer: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        direction: {
            houseNumber:'',
            street: '',
            city: '',
            references: '',
            coordinates:''
        },
    },
    products: [{
        id: '',
        name: '',
        price: '',
    }],
    totalAmount: 0,
    paymentMethod: '', //paypal, binance, etc
    paymentMethodReceipt: '' || {} //string or json object
}