import { SummaryDatabase } from "@/types/SummaryDatabase";
import { useSQLiteContext } from "expo-sqlite";

export function useSummaryDatabase(){
    const db = useSQLiteContext()

    async function create(title: string , summary: string, userid: number) {
            
            const statement = await db.prepareAsync("INSERT INTO Summarys (title, summary, idUser) VALUES ($title, $summary, $idUser)")
            
            try {
                const result = await statement.executeAsync({
                    $title: title,
                    $summary: summary,
                    $idUser: userid
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

    async function getSummaryByUserId(userId: number) {
        try {
            const query = "SELECT * FROM Summarys WHERE idUser = ?"
            const response = await db.getAllAsync<SummaryDatabase>(query, [userId])

            if(!response){
                return []
            }

            return response
        } catch (error) {
            throw error
        }
    }



    return { create, getSummaryByUserId }

}