import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">

      <View className="flex-row items-center justify-between px-5 py-5">
        <Text className="text-neutral-100 font-bold text-4xl">Meu Perfil</Text>
      </View>
      
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>

        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-2xl font-bold">Este é seu perfil</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default profile