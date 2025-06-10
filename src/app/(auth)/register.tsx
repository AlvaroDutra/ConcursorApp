import AuthForm from '@/components/AuthForm';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Register(){
    const router = useRouter();
    
    return(
        <View className="flex-1 justify-center items-center px-6 bg-primary">
            <Text className="text-2xl font-bold mb-6">Cadastrar</Text>
            <AuthForm type="register" />

            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text className="text-secundary mt-4">Já tem conta? Faça login</Text>
            </TouchableOpacity>
    </View>
    )
}