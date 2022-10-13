import "reflect-metadata"
import config from "../../config"
import { DataSource } from "typeorm"
// import { origin1665260842693 } from "./migrations/1665260842693-origin" //import your first migration
// import { origin1665397733481 } from "./migrations/1665397733481-origin"
// import { origin1665580403588 } from "./migrations/1665580403588-origin"
// import { origin1665660803260 } from './migrations/1665660803260-origin'
// import { origin1665661168414 } from './migrations/1665661168414-origin'
// import { origin1665664955554 } from './migrations/1665664955554-origin'
// import { origin1665667816247 } from './migrations/1665667816247-origin'
// import { origin1665668727289 } from './migrations/1665668727289-origin'
// import { origin1665671202802 } from './migrations/1665671202802-origin'
import { origin1665671382440 } from './migrations/1665671382440-origin'

import { Product, Auth, AuthMerchant, Cart, Category, Client, Merchant, Order, PaymentMethod } from "./entities"
import { PaymentPaypal } from './entities/paymentMethods'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    // migrationsRun: true,
    // synchronize: true,
    logging: false,
    entities: [
        Product, Auth, AuthMerchant, Cart, Category, Client, Merchant, Order, PaymentMethod,
        PaymentPaypal
    ],
    subscribers: [],
    migrations: [origin1665671382440],
    // migrationsTableName: "custom_migration_table",
})


// //execute the first time on dev server an then comment OR change this to a migration
AppDataSource.initialize()
    .then(() => {
        console.log('DB connected')
    })
    .catch((error) => console.log(error))