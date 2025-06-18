import { StyleSheet, TouchableOpacity, View, Modal } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  CircleUserRound, UserRound } from 'lucide-react-native'
import { Avatar, Card , Text } from 'react-native-paper'
import Header from '@/components/Header'
import BadgesModal from '@/components/BadgesModal'
import { useUser } from '@/contexts/UserContext'
import { useUserDatabase } from '@/database/useUserDatabase'

const profile = () => {
  const [ showBadgesModal, setShowBadgesModal ] = useState(false)
  const [ userEmail, setUserEmail ] = useState('')

  const { userId } = useUser()
  const userBadges = ['Badge 01','Badge 02','Badge 03']
  const userDatabase = useUserDatabase()

  const getUserEmail = useCallback(async(): Promise<void> => {
    if(!userId){
      console.error('Usuario não autenticado.')
      return
    }
    const result = await userDatabase.getUserEmailById(userId)
    setUserEmail(result)
  }, [userId])

  useEffect(()=>{
    getUserEmail()
  }, [getUserEmail])

  const openBadgesModal = () => {
    setShowBadgesModal(true)
  }

  const closeBadgesModal = () => {
    setShowBadgesModal(false)
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">

      <Header
        title='Meu Perfil'
        icon={<UserRound/>}
      />
      
      <View className='justify-center items-center h-4/6'>
        <Card mode='outlined' style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.contaier}> 
              <View>
                <View className='items-center flex-row gap-2'>
                  <View className='rounded-full p-0.5'>
                    <Avatar.Icon icon={() => <CircleUserRound size={64} strokeWidth={1}/>}/>
                  </View>
                  <Text variant='titleSmall' style={styles.text}>
                    {userEmail}
                  </Text>
                </View>
              </View>
              <View className='w-full'>
                <TouchableOpacity
                  onPress={openBadgesModal}
                  style={styles.button}
                  activeOpacity={0.7}
                >
                  <Text style={styles.text}>Badges</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Card>
      </View>

      <BadgesModal
        visible={showBadgesModal}
        badges={userBadges}
        onClose={closeBadgesModal}
      />

    </SafeAreaView>
  )
}

export default profile


const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: '60%',
    backgroundColor: '#f8fafc'
  },
  cardContent: {
    padding: 24,
    margin: 10,
    height: "100%"
  },
  text: {
    color: '#0a0a0a',
    fontWeight: 700,
    marginLeft: 8 
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: "#c4b5fd",
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contaier: {
    flex: 1,
    justifyContent: 'space-between'
  }
})