import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const color = route.params.color;
  const name = route.params.name;
  console.log(name);

  useEffect(() => {
    navigation.setOptions({ title: name });
  });
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={[styles.text]}>chat!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
  },
});

export default Chat;