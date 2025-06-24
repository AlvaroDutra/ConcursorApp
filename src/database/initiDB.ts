import { type SQLiteDatabase } from 'expo-sqlite'

export async function initDB(database: SQLiteDatabase){

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS Users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            numeroUploads INTEGER
        );

        CREATE TABLE IF NOT EXISTS Summarys(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            summary TEXT,
            idUser INTEGER,
            FOREIGN KEY(idUser) REFERENCES Users(id)
        );

        CREATE TABLE IF NOT EXISTS Badges(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            threshold INTEGER NOT NULL,
            description TEXT
        );
        
        CREATE TABLE IF NOT EXISTS UsersBadges(
            badgeId INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            FOREIGN KEY(badgeId) REFERENCES Badges(id),
            FOREIGN KEY(userId) REFERENCES Users(id)
        )
        `)

}
