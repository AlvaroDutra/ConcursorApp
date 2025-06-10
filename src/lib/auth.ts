import { useUserDatabase } from "../database/useUserDatabase"
import { useState } from "react"


export function useAuth(){

    const [ loggedIn, setLoggedIn ] = useState(false)

    const userDatabase = useUserDatabase()

    async function login(email: string, password: string){

        const user = await userDatabase.findByEmailAndPassword(email, password)

        if (user){
            setLoggedIn(true)
            return true
        }else{
            throw new Error("Email and password are incorrect")
        }

    }

    async function register(email: string, password: string){

        if (email && password){
            await userDatabase.create({email, password})
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
