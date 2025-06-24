import { UserDatabase } from "@/types/UserDatabase";
import { useSQLiteContext } from "expo-sqlite";



export function useUserDatabase() {

    const db = useSQLiteContext();

    async function create(data : Omit<UserDatabase, 'id' | 'numeroUploads'>) {
        
        const statement = await db.prepareAsync("INSERT INTO Users (email, password, numeroUploads) VALUES ($email, $password, $numeroUploads)")
        
        try {
            const result = await statement.executeAsync({
                $email: data.email,
                $password: data.password,
                $numeroUploads: 0
            })

            const insertedRowId = result.lastInsertRowId

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

    async function incrementsNumeroUploads(id: number){
        
        const statement = await db.prepareAsync("UPDATE Users SET numeroUploads = numeroUploads + 1 WHERE id = $id") 
        
        try {
            await statement.executeAsync({
                $id: id
            })
            
        } catch (error) {
            throw error
        }finally{
            await statement.finalizeAsync()
        }
    }

    async function getUserEmailById(id:number) {
        
        try {
            const query = "SELECT * FROM Users WHERE id = ?"  
            const response = await db.getFirstAsync<UserDatabase>(query, [id])
            
            if(response){
                return response.email
            }else{
                return 'Usuario não possui email ??'
            }
        } catch (error) {
            throw error
        }
        
    }
    
    async function getUserUploadsById(id:number) {
        try {
            const query = "SELECT * FROM Users WHERE id = ?"  
            const response = await db.getFirstAsync<UserDatabase>(query, [id])
            
            if(response){
                return response.numeroUploads
            }else{
                return 0
            }
        } catch (error) {
            throw error
        }
    }

    return { create, findByEmailAndPassword, incrementsNumeroUploads, getUserEmailById, getUserUploadsById }

}