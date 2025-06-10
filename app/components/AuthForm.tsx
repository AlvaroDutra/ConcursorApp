import {  useState } from "react";
import { Alert, View, TextInput } from "react-native";
import { Button } from "react-native-paper"
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
    <View className="w-full gap-52 ">

      <View className="gap-4">
        <TextInput
          placeholder="Email"
          className="border px-4 py-3 rounded-3xl"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          className="border px-4 py-3 rounded-3xl"
          value={password}
          onChangeText={setPassword}
        />

      </View>

      <Button mode="contained" 
              onPress={handleSubmit} 
              buttonColor='#e7e5e4'
              textColor="#0a0a0a"
      >
        {type === 'login' ? 'Entrar' : 'Cadastrar'}
      </Button>
    
    
    </View>
    
    )
}