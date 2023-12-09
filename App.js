import Start from "./components/Start"
import Chat from "./components/Chat";
import { getFirestore } from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { disableNetwork, enableNetwork } from "firebase/firestore";
import { useEffect } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { Alert } from "react-native";
import { LogBox } from "react-native";

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

function App(){
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: "AIzaSyBtiJRPNM-6kw4WY7u7GWXeJQpuv89vqpc",
    authDomain: "chatapp-8f1df.firebaseapp.com",
    projectId: "chatapp-8f1df",
    storageBucket: "chatapp-8f1df.appspot.com",
    messagingSenderId: "816560297114",
    appId: "1:816560297114:web:abacae15dcf0eed2e7bb23",
    measurementId: "G-WTGXF4N801"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Start}
          options={{
            headerShown: false,
          }}
        />
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            {...props} />}
        <Stack.Screen name="Chat" component={Chat}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

/*

const firebaseConfig = {
  apiKey: "AIzaSyBtiJRPNM-6kw4WY7u7GWXeJQpuv89vqpc",
  authDomain: "chatapp-8f1df.firebaseapp.com",
  projectId: "chatapp-8f1df",
  storageBucket: "chatapp-8f1df.appspot.com",
  messagingSenderId: "816560297114",
  appId: "1:816560297114:web:abacae15dcf0eed2e7bb23",
  measurementId: "G-WTGXF4N801"

};

*/
