import React from 'react'
import { Tabs } from 'expo-router'
import { NotebookText , CircleUserRound , CirclePlus} from 'lucide-react-native'
 
const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen
            name='index'
            options={{
                title: 'Resumos',
                headerShown: false,
                tabBarIcon: () => (
                    <NotebookText />
                )
            }}
        />
        <Tabs.Screen
            name='addFile'
            options={{
                title: 'Novo Arquivo',
                headerShown: false,
                tabBarIcon: () => (
                    <CirclePlus />
                ),
            }}
        />
        <Tabs.Screen
            name='profile'
            options={{
                title: 'Perfil',
                headerShown: false,
                tabBarIcon: () => (
                    <CircleUserRound />
                )
            }}
        />
        
    </Tabs>
  )
}

export default _layout