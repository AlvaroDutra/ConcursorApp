import { useAuth } from "@/lib/auth";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
    const router = useRouter();
    const auth = useAuth()

    useEffect(() => {
    const checkAuth = async () => {
      const logged = await auth.isLoggedIn();
      if (logged) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("../(auth)/login");
      }
    };

    checkAuth();
    }, []);

    return(
        
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

        <ActivityIndicator size="large" />
      </View>
    )
}