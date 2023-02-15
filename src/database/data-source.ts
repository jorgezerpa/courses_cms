import "reflect-metadata"
import config from "../config"
import { DataSource } from "typeorm"
import { Course, Lesson, Section, Resource } from "./entities"
import { origin1676469647753 } from "./migrations/1676469647753-origin"

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
        Course, Section, Lesson, Resource
    ],
    subscribers: [],
    migrations: [origin1676469647753],
    // migrationsTableName: "custom_migration_table",
})


AppDataSource.initialize()
    .then(() => {
        console.log('DB connected')
    })
    .catch((error) => console.log(error))