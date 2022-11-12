import { createPdf } from ".";
import fs from "fs"
import path from 'path'
import { Order } from "../../database/typeorm/entities";

const fakeOrder =             {
  "id": 1,
  "state": "in-process",
  "order": "{\"buyer\":{\"firstName\":\"Jorge\",\"lastName\":\"Zerpa\",\"email\":\"jorgezerpabuyer@gmail.com\",\"phone\":\"01132232\",\"direction\":{\"houseNumber\":\"73\",\"street\":\"Bolivar\",\"city\":\"Mérida\",\"references\":\"abajo de la plaza\",\"coordinates\":[]}},\"products\":[{\"id\":1,\"name\":\"product name\",\"price\":100}],\"totalAmount\":0,\"paymentMethod\":\"paypal\",\"paymentMethodReceipt\":\"recibo stringifeado\"}"
}

async function createOrderPdf(orderData:Order){
  let html = fs.readFileSync( path.join(__dirname, "src/utils/pdfCreator/templates", 'order.html') , "utf8");
  const order = JSON.parse(orderData.order as string)
  const merchant = orderData.merchant

  const document = {
    html: html,
    data: {
        merchant: merchant,
        buyer : order.buyer,
        products : order.products,
        totalAmmount : order.totalAmount,
        paymentMethod : order.paymentMethod,
      },
      path: path.join(__dirname, `src/utils/pdfCreator/outputs/order${orderData.id}${Date.now()}.pdf`),
      type: "",
    };
    try {
      let { filename } = await createPdf(document)
      return filename
    } catch (error) {
      return error
    }
}

export { createOrderPdf }

