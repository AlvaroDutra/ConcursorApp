import { StyleSheet, TouchableOpacity, View, Modal } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  CircleUserRound, UserRound, RefreshCcw } from 'lucide-react-native'
import { Avatar, Card , IconButton, Text } from 'react-native-paper'
import Header from '@/components/Header'
import BadgesModal from '@/components/BadgesModal'
import { useUser } from '@/contexts/UserContext'
import { useUserDatabase } from '@/database/useUserDatabase'
import { useBadgesDatabase } from '@/database/useBagdeDatabase'
import { BadgeDatabase } from '@/types/BadgeDatabase'
import { useUsersBadgesDatabase } from '@/database/useUsersBadgesDatabase'

const profile = () => {
  const [ showBadgesModal, setShowBadgesModal ] = useState(false)
  const [ userEmail, setUserEmail ] = useState('')
  const [userBadges, setUserBadges] = useState<BadgeDatabase[]>([])

  const { userId } = useUser()

  const userDatabase = useUserDatabase()
  const badgeDatabase = useBadgesDatabase()
  const usersBadgesDatabase = useUsersBadgesDatabase()
  

  const secureUserBadges = async() =>{
    if(userId == null){
      throw new Error("Usuário precisa estar autenticado.")
    }
    console.log("Garantindo insigina para usuario")

    const userUploads = await userDatabase.getUserUploadsById(userId)
    console.log("Verificando uploads do usuario")

    if(userUploads == 0){
      throw alert("Usuario não possui uploads suficientes")
    }

    if(userUploads > 5){
      console.log("Muito upload poucas insignias", userUploads)
    }
    const badge = await badgeDatabase.getBadgeByThreshold(userUploads)
    console.log("Verificando insignias disponiveis")

    userBadges.push(badge)
    setUserBadges(userBadges)
    console.log("Presentiando usuario com insignias")

    await usersBadgesDatabase.create(userId, badge.id)
    console.log("Finalizando processo de garantir insignia ao usuario")
  }

  // const getUserBadges = async() => {
  //   console.log('Pegando todas as badges')
  //   const result = await badgeDatabase.getAllBadges()
  //   setUserBadges(result)
  // }

  const getUserEmail = useCallback(async(): Promise<void> => {
    if(!userId){
      console.error('Usuario não autenticado.')
      return
    }
    const result = await userDatabase.getUserEmailById(userId)
    setUserEmail(result)
    console.log("email encontrado.")
  }, [userId])

  const deleteRelation = async() =>{
    await usersBadgesDatabase.deleteAll()
    console.log("deletando todas as relacoes entre indignias e usuarios")
  } 
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
                    {userEmail.split('@')[0]}
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
                  <IconButton
                    icon={()=> <RefreshCcw color='#a684ff'/>}
                    onPress={secureUserBadges}
                  />
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
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  contaier: {
    flex: 1,
    justifyContent: 'space-between'
  }
})