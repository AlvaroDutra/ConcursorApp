import { initDB } from "../database/initiDB";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import './globals.css';
import { PaperProvider } from "react-native-paper";
import { UserProvider } from "@/contexts/UserContext";




export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="concursor.db" onInit={initDB}>
      <UserProvider>
        <PaperProvider>
          <Slot/>  
        </PaperProvider>
      </UserProvider>
    </SQLiteProvider>
  
  )
}
