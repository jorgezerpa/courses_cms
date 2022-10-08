//these are not used. TypeORM create union tables automatically
//are just for organization 

import { OrderProduct } from "./order_product";
import { CategoryProduct } from "./category_product";
import { ClientPayment } from "./client_payment";
import { MerchantPayment } from "./merchant_payment";

export {
    OrderProduct,
    CategoryProduct,
    ClientPayment,
    MerchantPayment
}