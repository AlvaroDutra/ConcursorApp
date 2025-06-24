import { BadgeDatabase } from "@/types/BadgeDatabase";
import { useSQLiteContext } from "expo-sqlite";

export function useBadgesDatabase(){

    const db = useSQLiteContext()

    async function populate(badges: Omit<BadgeDatabase, 'id'>[]) {

        for(const badge of badges){
            const statement = await db.prepareAsync("INSERT INTO Badges (title, threshold, description) VALUES ($title, $threshold, $description)")

            try {
                const result = await statement.executeAsync({
                    $title: badge.title,
                    $threshold: badge.threshold,
                    $description: badge.description
                })

                const insertedRowId = result.lastInsertRowId

                console.log(`Badge adicionada com sucesso!\n\nID: ${insertedRowId} - Badge: ${badge.title}`)
            } catch (error) {
                console.error(`Erro ao inserir badge ${badge.title}:`, error)
                throw error
            } finally{
                await statement.finalizeAsync()
            }
        }
    }

    async function getAllBadges() {
        try {
            const query = "SELECT * FROM Badges"
            const response = await db.getAllAsync<BadgeDatabase>(query)

            if(!response){
                console.error("Sem badges adicionadas")
            }

            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
    
    async function deleteAllBadges() {
        try {
            const query = "DELETE * FROM Badges"
            await db.runAsync(query)
            console.log("Badges deletadas")
        } catch (error) {
            throw error
        }
    }

    async function getBadgeByThreshold(threshold: number) {
        try {
            const query = "SELECT * FROM Badges WHERE threshold = ?"  
            const response = await db.getFirstAsync<BadgeDatabase>(query, [threshold])
                    
            if(!response){
                throw new Error    
            }

            return response

            } catch (error) {
                throw error
            }
    }
    return { populate, getAllBadges, deleteAllBadges, getBadgeByThreshold }
}