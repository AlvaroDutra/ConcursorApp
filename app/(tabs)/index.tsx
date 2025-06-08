import {  ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-primary">

      <View className="flex-row items-center justify-between px-5 py-5">
        <Text className="text-neutral-100 font-bold text-4xl">Meus resumos</Text>
      </View>
      
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>

        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-2xl font-bold">Welcome to the App!</Text>
          <Text className="text-white mt-4">This is the home screen.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
