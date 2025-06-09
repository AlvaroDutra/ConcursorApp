import { isLoggedIn } from "@/lib/auth";
import { View, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
    const checkAuth = async () => {
      const logged = await isLoggedIn();
      if (logged) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(auth)/login");
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