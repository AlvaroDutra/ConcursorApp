import { View, ScrollView, Alert, StyleSheet } from 'react-native'
import React, { useCallback, useState }from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as DocumentPicker from 'expo-document-picker'
import {
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  Modal,
  Portal,
  ProgressBar,
  Surface,
  Text
} from 'react-native-paper'
import { 
  FilePlus, 
  CloudUpload, 
  FilePlus2, 
  X, 
  CircleCheck, 
  Loader, 
  Brain, 
  WandSparkles,
  Maximize2,
  ViewIcon,
  Pin,
  Plus,
  FileText,
  Minimize2
} from 'lucide-react-native'

import { SelectedFile } from '@/types/SelectedFile'
import { ApiResponse } from '@/types/ApiResponse'



const fileSelector = () => {

  const [ selectedFile, setSelectedFile ] = useState<SelectedFile | null>(null)
  const [ isUploading, setIsUploading ] = useState<boolean>(false)
  const [ uploadProgress, setUploadProgress ] = useState<number>(0)
  const [ summary, setSummary ] = useState<string>('')
  const [ showPreview, setShowPreview ] = useState<boolean>(false)
  const [ id , setId ] = useState<number | null>(null)
 
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

  const saveSummry = () => {
    console.log("Resumo salvo")
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">

      <View className="p-6">
        <View className="items-center mb-8 mt-4">
          <Surface
            style={[styles.surface]}
            elevation={2}
          >
            <FilePlus2 size={23} />
            <Text variant="headlineMedium" style={[styles.text]}>
              Selecione um arquivo
            </Text>
          </Surface>
        </View>
      </View>
      
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>

        {!selectedFile ? (
          <Card mode='outlined' className='mb-6'>
            <Card.Content className='p-8'>
              <View className='items-center'>
                <CloudUpload size={64} className='mb-4'/>
                <Text variant='titleMedium' className='text-center mb-2 font-semibold'> 
                  Selecionar PDF
                </Text>
                <Text variant='bodyMedium' className='text-center text-neutral-500 mb-6'>
                  Escolha um arquivo PDF do seu dispositivo
                </Text>
                <Button
                  mode='contained'
                  onPress={selectPDF}
                  className='w-full'
                  contentStyle={{ paddingVertical: 8 }}
                  buttonColor='#7008e7'
                >
                  Selecionar arquivo
                </Button>
              </View>
            </Card.Content>
          </Card>
        ) : (
          <Card className='mb-6' mode="elevated">
            <Card.Content className='p4'>
              <View className='flex-row items-center justify-between mb-3'>
                <View className='flex-row items-center flex-1'>
                  <Surface className='w-12 h-12 rounded-lg items-center justify-center mr-3' elevation={0}>
                    <FilePlus size={24}/>
                  </Surface>
                  <View className='flex-1'>
                    <Text variant='titleMedium' className='font-semibold' numberOfLines={1}>
                      {selectedFile.name}
                    </Text>
                    <Text variant='bodySmall' className='text-neutral-500'>
                      {formatFileSize(selectedFile.size)}
                    </Text>
                  </View>
                </View>

                <IconButton
                  icon={()=> <X color="#dc2626"/>}
                  size={24}
                  onPress={clearSelection}
                />
              </View>
              <Chip
                icon={() => <CircleCheck color="#059669"/>}
                className='self-start'
              >
                Arquivo selecionado
              </Chip>
            </Card.Content>
          </Card>
        )}

        {selectedFile && !summary && (
          <Card className='mb-6'>
            <Card.Content className='p-4'>
              {isUploading && (
                <View className='mb-4'>
                  <View className='flex-row justify-between items-center mb-2'>
                    <Text variant='bodyMedium' className='font-medium'>
                      Processando arquivo...
                    </Text>
                    <Text variant='bodySmall' className='text-neutral-500'>
                      {Math.round(uploadProgress * 100)}%
                    </Text>
                  </View>
                  <ProgressBar progress={uploadProgress}/>
                </View>
              )}

              <Button 
                mode='contained'
                onPress={uploadAndProcessFile}
                disabled={isUploading}
                icon={() => isUploading ? <Loader/> : <Brain color="#f8fafc"/>}
                className='w-full'
                contentStyle={{ paddingVertical: 8 }}
                buttonColor='#7008e7'
              >
                {isUploading ? 'Gerando resumo...' : 'Gerar resumo inteligente'}
              </Button>
            </Card.Content>
          </Card>
        )}

        {summary && (
          <View>
            <View className='flex-row items-center mb-4'>
              <Brain size={24} color="#059669"/>
              <Text variant='headlineSmall' className='ml-2 font-bold text-neutral-500'>
                Resumo gerado
              </Text>
            </View>

            <Card className='mb-6' mode='elevated'>
              <Card.Content className='p-6'>
                <View className='flex-row items-center justify-between mb-4'>
                  <Chip icon={() => <WandSparkles/>} mode='outlined'>
                    Resumo inteligente
                  </Chip>
                  <IconButton
                    icon={() => <Maximize2/>}
                    size={20}
                    onPress={openPreview}
                  />
                </View>

                <Divider className='mb-4'/>

                <Text variant='bodyLarge' className='leading-7 text-neutral-950'>
                  {summary}
                </Text>
              </Card.Content>
            </Card>

            <View className='flex-row gap-3 mb-6'>
              <Button 
              mode='outlined'
              onPress={openPreview}
              icon={() => <ViewIcon/>}
              className='flex-1'
              >
                Visualizar
              </Button>
              <Button 
              mode='outlined'
              onPress={saveSummry}
              icon={() => <Pin/>}
              className='flex-1'
              >
                Salvar
              </Button>
            </View>

            <Button 
            mode='contained-tonal'
            onPress={clearSelection}
            icon={() => <Plus/>}
            className='w-full'
            contentStyle={{ paddingVertical: 8 }}
            >
              Processar novo arquivo
            </Button>
          </View>
        )}

        <Portal>
          <Modal
            visible={showPreview}
            onDismiss={closePreview}
            contentContainerStyle={{ margin: 20 }}
          >
            <Card>
              <Card.Title
                title = "Resumo Completo"
                subtitle= {selectedFile?.name || "Arquivo PDF" }
                left={(props) => <FileText {...props} size={24}/>}
                right={(props) =>(
                  <IconButton
                  {...props}
                  icon={() => <Minimize2/>}
                  onPress={closePreview}
                  />
                )}
              />
              <Card.Content>
                <ScrollView style={{ maxHeight: 400 }}>
                  <Text variant='bodyLarge' className='leading-7'>
                    {summary}
                  </Text>
                </ScrollView>
              </Card.Content>
              <Card.Actions>
                <Button onPress={closePreview}>Fechar</Button>
                <Button mode='contained' onPress={saveSummry}>
                  Salvar
                </Button>
              </Card.Actions>
            </Card>
          </Modal>
        </Portal>
      </ScrollView>
    </SafeAreaView>
  )
}

export default fileSelector


const styles = StyleSheet.create({
  surface: {
    width: 350,
    height: 70,
    padding: 4,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f8fafc'
  },
  text :{
    color: '#0a0a0a',
    textAlign: 'center',
    fontWeight: 700,
    marginLeft: 8 
  }

})