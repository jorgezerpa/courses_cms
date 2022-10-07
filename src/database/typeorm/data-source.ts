import "reflect-metadata"
import { DataSource } from "typeorm"

import { Product } from "./entities/product"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "ecommerce_dashboard",
    synchronize: true,
    logging: false,
    entities: [Product],
    subscribers: [],
    migrations: [],
})


// //execute the first time on dev server an then comment OR change this to a migration
AppDataSource.initialize()
    .then(() => {
        console.log('DB created')
    })
    .catch((error) => console.log(error))