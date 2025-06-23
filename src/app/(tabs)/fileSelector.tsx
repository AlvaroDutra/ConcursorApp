import { View, ScrollView, Alert, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState }from 'react'
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
import  Markdown from 'react-native-markdown-display' 
import { SelectedFile } from '@/types/SelectedFile'
import { ApiResponse } from '@/types/ApiResponse'
import { useUser } from '@/contexts/UserContext'
import { useSummaryDatabase } from '@/database/useSummaryDatabase'
import Header from '@/components/Header'
import { useUserDatabase } from '@/database/useUserDatabase'



const fileSelector = () => {

  const [ selectedFile, setSelectedFile ] = useState<SelectedFile | null>(null)
  const [ isUploading, setIsUploading ] = useState<boolean>(false)
  const [ uploadProgress, setUploadProgress ] = useState<number>(0)
  const [ summary, setSummary ] = useState<string>('')
  const [ showPreview, setShowPreview ] = useState<boolean>(false)
  
  const { userId } = useUser()

  const userDatabase = useUserDatabase()
  const summaryDatabase = useSummaryDatabase()

  const setMockSummary = () => {
    console.log('setMockSummary foi chamado')
    const summary = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt et risus at sollicitudin. Proin viverra neque et nunc sagittis ultricies. Ut in elit non ligula vestibulum bibendum sed eget est. Vestibulum tincidunt vitae nisi euismod eleifend. Nullam sed finibus felis, nec cursus mauris. Donec elementum libero pulvinar, laoreet enim sed, luctus urna. Nulla luctus, tortor a porta commodo, libero ipsum aliquam erat, vel iaculis justo metus eu massa. Duis consectetur, nisi nec maximus luctus, tortor lectus laoreet dui, sit amet fermentum enim magna nec nisl. Praesent bibendum mauris leo, vel egestas turpis sollicitudin a. Aenean ac varius purus. Nunc ut aliquam lorem. Nunc blandit suscipit magna, vitae congue dolor ornare interdum. Suspendisse odio orci, blandit eget leo vehicula, porttitor dignissim justo. Sed hendrerit commodo vulputate."

    setIsUploading(true)
    setUploadProgress(0)
    setSummary(summary)
    setUploadProgress(1)
    setIsUploading(false)
  }


  const incrementsUploads = async() => {
    if(!userId){
      console.error('Usuario não autenticado.')
      return
    }

    await userDatabase.incrementsNumeroUploads(userId)
  }
 
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
        console.log(`Arquivo selecionado: ${selectedFile.name}`)
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

  // const uploadAndProcessFile = useCallback(async(): Promise<void> =>{
  //   console.log('chegou no metodo')
  //   if(!selectedFile){
  //     Alert.alert('Atenção', 'Selecione um arquivo primeiro')
  //     return
  //   }

  //   setIsUploading(true)
  //   setUploadProgress(0)

  //   try {
      
  //     await simulateUploadProgress()

  //     const formData = new FormData()
  //     formData.append('file', {
  //       uri: selectedFile.uri,
  //       name: selectedFile.name,
  //       type: selectedFile.mimeType || 'application/pdf'
  //     } as any)

  //     console.log('Antes da requisicao')
  //     const response = await fetch('http://192.168.3.9:8000/resumo', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       body: formData
  //     })

  //     console.log('requisicao concluida')
  //     console.log(response.status)
  //     setUploadProgress(1)

  //     if(response.ok){
  //       const data: ApiResponse = await response.json()
  //       incrementsUploads()
  //       console.log(data.summary.split("</think>")[1].trim())
  //       if(data.summary && data.success){
  //         setSummary(data.summary.split("</think>")[1].trim())
  //         setTimeout(() => {
  //           Alert.alert('Sucesso', 'PDF processado com sucesso!')
  //         }, 500)
  //       }else{
  //         throw new Error(data.error || 'Erro')
  //       }
  //     }else{
  //       throw new Error(`Erro HTTP: ${response.status}`)
  //     }
  //   } catch (error) {
  //     console.error('Erro ao processar PDF :( ', error)
  //     const errorMessage = error instanceof Error ? error.message: 'Erro'
  //     Alert.alert('Erro', `Não foi possivel processar o arquivo: ${errorMessage}`)      
  //   }finally{
  //     setIsUploading(false)
  //     setTimeout(() => setUploadProgress(0), 1000);
      
  //   }

  // }, [selectedFile, simulateUploadProgress])

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

  const openPreview = () => {
    setShowPreview(true)
  }

  const closePreview = () => {
    setShowPreview(false)
  }

  const saveSummary = async() => {
      console.log("Conectando a base de dados")

      try {
        if(selectedFile?.name && userId){
          await summaryDatabase.create(selectedFile.name, summary, userId)
          console.log("Resumo salvo")
        }else {
          console.error("Erro ao salver resumo. Verifique o nome do arquivo.")
        }
      } catch (error) { 
        throw error
      }
      

  }

  return (
    <SafeAreaView className="flex-1 bg-primary">

      <Header
        title='Selecionar arquivo'
        icon={<FilePlus2/>}
      />
      
      <ScrollView className="flex-1 px-5 max-h-[75%]" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>

        {!selectedFile ? (
          <Card mode='outlined' style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View className='items-center gap-1'>
                <CloudUpload size={64} className='mb-4'/>
                <Text variant='titleMedium' style={styles.text}> 
                  Selecionar PDF
                </Text>
                <Text variant='bodyMedium' style={styles.text}>
                  Escolha um arquivo PDF do seu dispositivo
                </Text>
                <Button
                  mode='contained'
                  onPress={selectPDF}
                  className='w-full'
                  contentStyle={{ paddingVertical: 8 }}
                  buttonColor='#7008e7'
                  textColor='#f8fafc'
                >
                  Selecionar arquivo
                </Button>
              </View>
            </Card.Content>
          </Card>
        ) : (
          <Card style={styles.card} mode="elevated">
            <Card.Content style={styles.cardContent}>
              <View className='flex-row items-center justify-between mb-3'>
                <View className='flex-row items-center flex-1'>
                  <Surface style={styles.surface} elevation={0}>
                    <FilePlus size={24}/>
                  </Surface>
                  <View className='flex-1'>
                    <Text variant='titleMedium' style={styles.text} numberOfLines={1}>
                      {selectedFile.name}
                    </Text>
                    <Text variant='bodySmall' style={styles.text}>
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
                icon={() => <CircleCheck color="#65a30d"/>}
                style={styles.chip}
              >
                Arquivo selecionado
              </Chip>
            </Card.Content>
          </Card>
        )}

        {selectedFile && !summary && (
          <Card className='mb-6'>
            <View>
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
                onPress={setMockSummary}
                disabled={isUploading}
                icon={() => isUploading ? <Loader/> : <Brain color="#f8fafc"/>}
                style={styles.button}
                contentStyle={{ paddingVertical: 8 }}
                buttonColor='#581c87'
                textColor='#f8fafc'
              >
                {isUploading ? 'Gerando resumo...' : 'Gerar resumo inteligente'}
              </Button>
            </View>
          </Card>
        )}

        {summary && (
          <View>
            <Card style={styles.card} mode='elevated'>
              <ScrollView className='p-6 bg-neutral-50 rounded-xl'>
                <View className='flex-row items-center justify-between mb-4'>
                  <Chip icon={() => <WandSparkles color="#fde047"/>} mode='outlined' style={styles.chip} selectedColor='#f8fafc'>
                    Resumo inteligente
                  </Chip>
                  <IconButton
                    icon={() => <Maximize2/>}
                    size={20}
                    onPress={openPreview}
                  />
                </View>

                <Divider className='mb-4'/>

                <Markdown>
                  {summary}
                </Markdown>
              </ScrollView>
            </Card>

            <View className='flex-row gap-3 mb-6'>
              <Button 
              mode='contained-tonal'
              onPress={saveSummary}
              icon={() => <Pin/>}
              className='flex-1'
              contentStyle={{ backgroundColor: "#7008e7" }}
              >
                Salvar
              </Button>
            </View>

            <Button 
            mode='contained-tonal'
            onPress={clearSelection}
            icon={() => <Plus/>}
            className='w-full'
            contentStyle={{ paddingVertical: 8, backgroundColor: "#7008e7" }}
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
                <Button mode='contained' onPress={saveSummary}>
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
  card:{
    marginBottom: 24,
  },
  chip: {
    backgroundColor: "#a855f7",
    alignSelf: 'flex-start'
  },
  cardContent: {
    padding: 4,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  text: {
    color: '#0a0a0a'
  },
  button: {
    borderRadius: 12,
    width: '100%'
  },
  surface: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  }
})
