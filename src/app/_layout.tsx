import { initDB } from "../database/initiDB";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import './globals.css';




export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="concursor.db" onInit={initDB}>

      <Slot/>  
    </SQLiteProvider>
  
  )
}
