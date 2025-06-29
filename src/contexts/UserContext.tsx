import { createContext, ReactNode, useContext, useState } from "react"

interface UserContextProps {
    userId: number | null
    setUserId: (id: number) => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode}) => {
    const [userId, setUserId] = useState<number | null>(null)

    return(
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext)

    if(!context){
        throw new Error(`useUser deve ser usado dentro de um UserProvider`)
    }

    return context
}
