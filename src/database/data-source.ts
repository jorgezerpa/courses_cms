import "reflect-metadata"
import config from "../config"
import { DataSource } from "typeorm"
import { Course, Lesson, Section, User } from "./entities"
import { origin1674903411354 } from "./migrations/1674903411354-origin"

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
        User, Course, Section, Lesson
    ],
    subscribers: [],
    migrations: [origin1674903411354],
    // migrationsTableName: "custom_migration_table",
})


AppDataSource.initialize()
    .then(() => {
        console.log('DB connected')
    })
    .catch((error) => console.log(error))