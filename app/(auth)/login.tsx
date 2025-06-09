import AuthForm from '@/app/components/AuthForm';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Login(){
    
    const router = useRouter();

    return(
        <View className="flex-1 justify-center items-center px-6 bg-primary">
            <Text className="text-2xl font-bold mb-6">Entrar</Text>
            <AuthForm type="login" />

            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text className="text-secundary mt-4">Não tem uma conta? Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    )
}