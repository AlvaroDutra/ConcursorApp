import { type SQLiteDatabase} from 'expo-sqlite'

export async function initDB(database: SQLiteDatabase){

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS Users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
            )
        `)

}