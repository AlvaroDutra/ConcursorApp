import { View, ScrollView, Alert, StyleSheet } from 'react-native'
import React, { useCallback, useState }from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as DocumentPicker from 'expo-document-picker'
import {
  Surface,
  Text
} from 'react-native-paper'
import { FilePlus } from 'lucide-react-native'

import { SelectedFile } from '@/types/SelectedFile'
import { ApiResponse } from '@/types/ApiResponse'



const fileSelector = () => {

  const [ selectedFile, setSelectedFile ] = useState<SelectedFile | null>(null)
  const [ isUploading, setIsUploading ] = useState<boolean>(false)
  const [ uploadProgress, setUploadProgress ] = useState<number>(0)
  const [ summary, setSummary ] = useState<string>('')
  const [ showPreview, setShowPreview ] = useState<boolean>(false)

  const selectPDF = async() => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
        multiple: false
      })

      if(!result.canceled && result.assets && result.assets.length > 0){
        const file = result.assets[0]
        const selectedFile: SelectedFile ={
          uri: file.uri,
          name: file.name,
          size: file.size || 0,
          mimeType: file.mimeType
        }
        setSelectedFile(selectedFile)
        console.log(`Arquivo selecionado: ${selectedFile}`)
      }
    } catch (error) {
        console.error('Erro ao selecionar arquivo', error)
        Alert.alert('Error', 'Não foi possivel selecionar arquivo')
    }
  }

  const simulateUploadProgress = useCallback(():Promise<void> =>{
    return new Promise((resolve) =>{
      let progress = 0
      const interval = setInterval(() => {
        progress += 0.1
        setUploadProgress(Math.min(progress, 0.9))
      
        if(progress >=0.9){
          clearInterval(interval)
          resolve()
        }
      }, 200)
    })
  },[])

  const uploadAndProcessFile = useCallback(async(): Promise<void> =>{
    if(!selectedFile){
      Alert.alert('Atenção', 'Selecione um arquivo primeiro')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      
      await simulateUploadProgress()

      const formData = new FormData()
      formData.append('file', {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: selectedFile.mimeType || 'application/pdf'
      } as any)

      const response = await fetch('http://localhost:8000', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      })

      setUploadProgress(1)

      if(response.ok){
        const data: ApiResponse = await response.json()
        if(data.summary && data.success){
          setSummary(data.summary)
          setTimeout(() => {
            Alert.alert('Sucesso', 'PDF processado com sucesso!')
          }, 500)
        }else{
          throw new Error(data.error || 'Erro')
        }
      }else{
        throw new Error(`Erro HTTP: ${response.status}`)
      }
    } catch (error) {
      console.error('Erro ao processar arquivo: ', error)
      const errorMessage = error instanceof Error ? error.message: 'Erro'
      Alert.alert('Erro', `Não foi possivel processar o arquivo: ${errorMessage}`)      
    }finally{
      setIsUploading(false)
      setTimeout(() => setUploadProgress(0), 1000);
    }

  }, [selectedFile, simulateUploadProgress])

  const clearSelection = useCallback((): void =>{
    setSelectedFile(null)
    setSummary('')
    setUploadProgress(0)
  }, [])

  const formatFileSize = useCallback((bytes: number): string =>{
    if(bytes < 1024) return `${bytes} B`
    if(bytes < 1024 * 1024) return `${(bytes/ 1024).toFixed(1)} MB`
    return `${(bytes/ (1024 * 1024)).toFixed(1)} MB`
  }, [])

  const openPreview = () =>{
    setShowPreview(true)
  }

  const closePreview = () => {
    setShowPreview(false)
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">

      <View className="p-6">
        <View className='mb-8 mt-4'>
          <Surface style={styles.surface} elevation={2}>
            <FilePlus size={30}/>
            <Text variant='headlineMedium'
                  style={styles.text}
            >
              Selecione um arquivo
              </Text>
          </Surface>
        </View>

      </View>
      
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>

        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-2xl font-bold">Arquivos</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default fileSelector


const styles = StyleSheet.create({
  surface: {
    width: 350,
    padding: 4,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7e5e4'
  },
  text :{
    color: '#0a0a0a',
    textAlign: 'center',
    fontWeight: 700,
  }

})