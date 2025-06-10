import { useSQLiteContext } from "expo-sqlite";

export type UserDatabase = {
    id: number
    email: string
    password: string
}

export function useUserDatabase() {

    const db = useSQLiteContext();

    async function create(data : Omit<UserDatabase, 'id'>) {
        
        const statement = await db.prepareAsync("INSERT INTO Users (email, password) VALUES ($email, $password)")
        
        try {
            const result = await statement.executeAsync({
                $email: data.email,
                $password: data.password
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return{
                insertedRowId
            }

        } catch (error) {
            throw error

        } finally{

            await statement.finalizeAsync()
        }
    }


    async function findByEmailAndPassword(email: string, password: string) {
    
        try {
            const query = "SELECT * FROM Users WHERE email = ? AND password = ?"
            const response = await db.getFirstAsync<UserDatabase>(query, [email, password])    

            if (response) {
                return response
            } else {
                return null
            }

        } catch (error) {
            throw error

        } 
    }

    return { create, findByEmailAndPassword }

}