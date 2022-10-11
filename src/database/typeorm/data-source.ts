import "reflect-metadata"
import config from "../../config"
import { DataSource } from "typeorm"
// import { origin1665260842693 } from "./migrations/1665260842693-origin" //import your first migration
import { origin1665397733481 } from "./migrations/1665397733481-origin"

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
    migrations: [origin1665397733481],
    // migrationsTableName: "custom_migration_table",
})


// //execute the first time on dev server an then comment OR change this to a migration
AppDataSource.initialize()
    .then(() => {
        console.log('DB connected')
    })
    .catch((error) => console.log(error))