import { useSQLiteContext } from "expo-sqlite";

export function useUsersBadgesDatabase(){
    const db = useSQLiteContext()

    async function create(userId:number, badgeId: number) {
        const statement = await db.prepareAsync("INSERT INTO UsersBadges (badgeId, userId) VALUES ($badgeId, $userId)")
        
        try {
            const result = await statement.executeAsync({
                $badgeId: badgeId,
                $userId: userId
            })

            const insertedRowId = result.lastInsertRowId

            console.log(`Relação entre badge: ${badgeId} e usuário: ${userId} criada com sucesso com ID: ${insertedRowId}!`)

        } catch (error) {
            throw error

        } finally{

            await statement.finalizeAsync()
        }
    }

    async function deleteAll() {
        try {
            const query = "DELETE * FROM UsersBadges"
            await db.runAsync(query)
        } catch (error) {
            throw error
        }
    }
    return { create, deleteAll }
}