let session = {loggedIn: false}

export async function login(email: string, password: string){
    if (email && password){
        session = {loggedIn: true}
        return true
    }else{
        throw new Error("Email and password are required")
    }

}

export async function register(email: string, password: string){
    if (email && password){
        session = {loggedIn: true}
        return true
    }else{
        throw new Error("Email and password incorrect")
    }

}

export function isLoggedIn(){
    return session.loggedIn
}