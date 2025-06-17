import { View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  UserRound } from 'lucide-react-native'
import { Text } from 'react-native-paper'
import Header from '@/components/Header'

const profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">

      <Header
        title='Meu Perfil'
        icon={<UserRound/>}
      />
      
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>

        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-2xl font-bold">Este é seu perfil</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default profile
