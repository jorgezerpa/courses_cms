import "reflect-metadata"
import config from "../../config"
import { DataSource } from "typeorm"
import { Product, AuthMerchant, Category, Merchant, PaymentMethod, Shipping } from "./entities"
import { PaymentPaypal } from './entities/paymentMethods'
import { origin1666799089818 } from './migrations/1666799089818-origin'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    migrationsRun: true,
    // synchronize: true,
    logging: false,
    entities: [
        Product, AuthMerchant, Category, Merchant, PaymentMethod, Shipping,
        PaymentPaypal
    ],
    subscribers: [],
    migrations: [origin1666799089818],
    // migrationsTableName: "custom_migration_table",
})


// //execute the first time on dev server an then comment OR change this to a migration
AppDataSource.initialize()
    .then(() => {
        console.log('DB connected')
    })
    .catch((error) => console.log(error))