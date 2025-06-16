import { useUser } from "@/contexts/UserContext"
import { useUserDatabase } from "../database/useUserDatabase"
import { useState } from "react"


export function useAuth(){

    const [ loggedIn, setLoggedIn ] = useState(false)
    const userDatabase = useUserDatabase()
    const { setUserId } = useUser()

    async function login(email: string, password: string){

        const user = await userDatabase.findByEmailAndPassword(email, password)

        if (user){
            setUserId(user.id)
            setLoggedIn(true)
            return true
        }else{
            throw new Error("Email and password are incorrect")
        }

    }

    async function register(email: string, password: string){

        if (email && password){
            const result = await userDatabase.create({email, password})
            setUserId(result.insertedRowId)
            setLoggedIn(true)
            return true
        }else{
            throw new Error("Email and password are required")
        }

    }

    function isLoggedIn(){
        return loggedIn
    }

    return { login, register, isLoggedIn }

}
