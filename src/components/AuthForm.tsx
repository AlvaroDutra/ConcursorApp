import { useAuth } from "../lib/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, TextInput, View } from "react-native";
import { Button } from "react-native-paper";


export default function AuthForm({type}: {type: 'login'| 'register'}){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const auth = useAuth()
    
    const handleSubmit = async () => {
        try {
            if(type === 'login'){

                await auth.login(email, password);
                router.replace('/(tabs)/home');
            }else{
                await auth.register(email, password);
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