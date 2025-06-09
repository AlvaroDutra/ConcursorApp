import {  useState } from "react";
import { Alert, View, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { login , register} from "@/lib/auth";

export default function AuthForm({type}: {type: 'login'| 'register'}){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async () => {
        try {
            if(type === 'login'){
                
                await login(email, password);
                router.replace('/(tabs)/home');
            }else{
                await register(email, password);
                router.replace('/(tabs)/home');
            }

        } catch (error) {
            Alert.alert('Erro','Falha na autenticação.')
        }
    }

    return(
    <View className="w-full gap-4">
      <TextInput
        placeholder="Email"
        className="border outline outline-neutral-950 px-4 py-3 rounded-lg"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        className="border px-4 py-3 rounded-lg"
        value={password}
        onChangeText={setPassword}
      />
      <Button title={type === 'login' ? 'Entrar' : 'Cadastrar'} onPress={handleSubmit}/>
    </View>
    )
}