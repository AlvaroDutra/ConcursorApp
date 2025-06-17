import { View, StyleSheet } from 'react-native'
import React from 'react'
import { HeaderProps } from '@/types/HeaderProps'
import { Surface, Text } from 'react-native-paper'

const Header = ({ title, icon }: HeaderProps) => {
  return (
    <View className="p-6">
        <View className="items-center mb-8 mt-4">
          <Surface
            elevation={2}
            style={[styles.surface]}
          >
            {icon}
            <Text variant="headlineMedium" style={[styles.text]}>
              {title}
            </Text>
          </Surface>
        </View>
      </View>
  )
}

export default Header

const styles = StyleSheet.create({
  surface: {
    width: '100%',
    height: 70,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#f8fafc'
  },
  text :{
    color: '#0a0a0a',
    textAlign: 'center',
    fontWeight: 700,
    marginLeft: 8 
  }

})