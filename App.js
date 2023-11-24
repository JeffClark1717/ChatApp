import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

function App() {
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
        <Stack.Screen name="Chat" component={Chat} />
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
