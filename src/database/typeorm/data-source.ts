import "reflect-metadata"
import config from "../../config"
import { DataSource } from "typeorm"
import { Admin, Program, Section, User, Widget, File, Video, Image } from "./entities"
import { origin1668866116127 } from './migrations/1668866116127-origin'

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
        Admin, Program, Section, User, Widget, File, Video, Image
    ],
    subscribers: [],
    migrations: [origin1668866116127],
    // migrationsTableName: "custom_migration_table",
})


// //execute the first time on dev server an then comment OR change this to a migration
AppDataSource.initialize()
    .then(() => {
        console.log('DB connected')
    })
    .catch((error) => console.log(error))