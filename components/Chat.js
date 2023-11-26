import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigation, useRoute } from "@react-navigation/native";

function Chat() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId, name, color } = route.params;
  const [messages, setMessages] = useState([]);
  let unsubMessages;

  useEffect(() => {
    const loadCachedMessages = () => {
      // Implement your logic for loading cached messages
    };

    const cacheMessages = (newMessages) => {
      // Implement your logic for caching messages
    };

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    if (unsubMessages) unsubMessages(); // Unsubscribe from previous collection

    unsubMessages = onSnapshot(q, (querySnapshot) => {
      const newMessages = querySnapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis()),
      }));
      cacheMessages(newMessages);
      setMessages(newMessages);
    });

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [navigation]);

  const onSend = async (newMessages) => {
    await addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#474056",
        },
        left: {
          backgroundColor: "#FFF",
        },
      }}
    />
  );

  return (
    <View style={[styles.container, { flex: 1, backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: userId,
          name: name,
        }}
      />
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="height" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});

export default Chat;
