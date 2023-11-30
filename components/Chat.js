import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Chat() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId, name, color } = route.params;
  const [messages, setMessages, isConnected] = useState([]);
  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation, name]);

  useEffect(() => {
    const loadCachedMessages = async () => {
      const cachedMessages = (await AsyncStorage.getItem("messages")) || "[]";
      setMessages(JSON.parse(cachedMessages));
    };

    const cacheMessages = async (messagesToCache) => {
      try {
        await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchMessages = async () => {
      if (isConnected) {
        if (unsubMessages) unsubMessages(); // Unsubscribe any previous Firestore listener.
        unsubMessages = null;

        // Query Firestore for messages, ordered by their creation date.
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

        // Listen for real-time changes in messages collection.
        unsubMessages = onSnapshot(q, (docs) => {
          let newMessages = [];
          docs.forEach((doc) => {
            newMessages.push({
              _id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis()),
            });
          });
          cacheMessages(newMessages); // Cache the fetched messages.
          setMessages(newMessages); // Update state with new messages.
        });
      } else {
        await loadCachedMessages();
      }
    };

    fetchMessages();

    // Cleanup function to unsubscribe from Firestore listener.
    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, [isConnected]);

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

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  return (
    <View style={[styles.container, { flex: 1, backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: userId,
          name,
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
