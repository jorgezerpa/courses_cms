import "reflect-metadata"
import config from "../../config"
import { DataSource } from "typeorm"
import { Product, AuthMerchant, Category, Merchant, PaymentMethod, Shipping } from "./entities"
import { PaymentPaypal } from './entities/paymentMethods'
import { origin1665928261208 } from './migrations/1665928261208-origin'
import { origin1665930420939 } from './migrations/1665930420939-origin'
import { origin1665930548474 } from './migrations/1665930548474-origin'
import { origin1665932816241 } from './migrations/1665932816241-origin'
import { origin1665933143168 } from './migrations/1665933143168-origin'
import { origin1665946229822 } from './migrations/1665946229822-origin'

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
        Product, AuthMerchant, Category, Merchant, PaymentMethod, Shipping,
        PaymentPaypal
    ],
    subscribers: [],
    migrations: [origin1665928261208, origin1665930420939, origin1665930548474, origin1665932816241, origin1665933143168,
    origin1665946229822],
    // migrationsTableName: "custom_migration_table",
})


// //execute the first time on dev server an then comment OR change this to a migration
AppDataSource.initialize()
    .then(() => {
        console.log('DB connected')
    })
    .catch((error) => console.log(error))