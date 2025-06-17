import Header from "@/components/Header";
import { useUser } from "@/contexts/UserContext";
import { useSummaryDatabase } from "@/database/useSummaryDatabase";
import { SummaryDatabase } from "@/types/SummaryDatabase";
import { BookOpenText } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { Text,ScrollView, TouchableOpacity, View, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const [ summarys, setSummarys ] = useState<SummaryDatabase[]>([])
  const [ selectedSummary, setSelectedSummary ] = useState<SummaryDatabase | null>(null)

  const { userId } = useUser()

  const summaryDatabase = useSummaryDatabase()

  
  const getUserSummarys = useCallback(async(): Promise<void> => {
    if(!userId){
      console.error('Usuario não autenticado.')
      return
    }
    const result = await summaryDatabase.getSummaryByUserId(userId)
    setSummarys(result)

  }, [userId])

  useEffect(() => {
    const mockData: SummaryDatabase[] = [
    { id: 1, title: "Resumo do Concurso X", summary: "Esse é um exemplo de resumo gerado pela IA sobre o concurso X..." , idUser: 1},
    { id: 2, title: "Resumo do Concurso Y", summary: "Aqui temos o resumo do concurso Y, com as principais informações..." , idUser: 1},
    { id: 3, title: "Resumo do Concurso Z", summary: "Resumo detalhado sobre o concurso Z, gerado automaticamente." , idUser: 1},
    ]
    setSummarys(mockData)
    // getUserSummarys()
  }, [])

  
  const openSummaryModal = (summary: SummaryDatabase) => {
    setSelectedSummary(summary)
  }

  const closeSummaryModal = () => {
    setSelectedSummary(null)
  }



  return (
    <SafeAreaView className="flex-1 bg-primary">

      <Header
        title="Meus Resumos"
        icon={<BookOpenText/>}
      />
      
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={true} contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>

        <View className="flex-1 items-center justify-center">
          {summarys.length === 0 ? (
            <View>
              <Text className="text-white text-2xl font-bold">Bem vindo ao Concursor User-{userId}</Text>
              <Text className="text-white mt-4">Aqui ficarão seus resumos</Text>
            </View>
          ) : (
            summarys.map((summary) => (
              <TouchableOpacity
                key={summary.id}
                onPress={() => openSummaryModal(summary)}
                className="w-full bg-slate-50 rounded-xl p-4 mb-3 shadow"
              >
                <Text className="font-bold text-lg">{summary.title}</Text>
                <Text className="mt-1" numberOfLines={3}>
                  {summary.summary}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      <Modal
        visible={selectedSummary !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={closeSummaryModal}  
      >
        <View className="flex-1 bg-primary justify-center items-center px-5">
          <View className="bg-slate-50 rounded-2xl p-6 w-full max-h-[80%]">
            <Text className="text-xl font-bold mb-2 text-neutral-950">{selectedSummary?.title}</Text>
            <ScrollView>
              <Text className="text-neutral-500">
                {selectedSummary?.summary}
              </Text>
            </ScrollView>
            <TouchableOpacity
              onPress={closeSummaryModal}
              className="mt-4 bg-purple-700 rounded-xl p-3 items-center"
            >
              <Text className="text-slate-50 font-semibold">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


