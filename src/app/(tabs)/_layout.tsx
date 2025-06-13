import React from 'react'
import { Tabs } from 'expo-router'
import { NotebookText , CircleUserRound , CirclePlus} from 'lucide-react-native'
 
const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            },
            tabBarStyle: {
                backgroundColor: '#e7e5e4',
                borderRadius: 50,
                marginHorizontal: 30,
                marginBottom: 30,
                height: 52,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#e7e5e4',
            },
            tabBarActiveTintColor: '#a684ff',
            tabBarInactiveTintColor: '#a3a3a3'
        }}

    >
        <Tabs.Screen
            name='home'
            options={{
                title: 'Resumos',
                headerShown: false,
                tabBarIcon: ({ focused }) => (focused ? <NotebookText/> : <NotebookText color="#a3a3a3"/>)
                
            }}
        />
        <Tabs.Screen
            name='fileSelector'
            options={{
                title: 'Novo Arquivo',
                headerShown: false,
                tabBarIcon: ({focused}) => (focused ? <CirclePlus /> : <CirclePlus color="#a3a3a3"/>)
            }}
        />
        <Tabs.Screen
            name='profile'
            options={{
                title: 'Perfil',
                headerShown: false,
                tabBarIcon: ({focused}) => (focused ? <CircleUserRound/> : <CircleUserRound color="#a3a3a3"/>)
            }}
        />
        
    </Tabs>
  )
}

export default _layout