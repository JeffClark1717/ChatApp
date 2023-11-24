import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { app } from "../firebase-config";
import { SafeAreaView } from "react-native-safe-area-context";
import { signInAnonymously, getAuth } from "firebase/auth";

const auth = getAuth(app);

function Start() {
  const navigation = useNavigation();
  //creates state for name input so that content is updated dynamically
  const [name, setName] = useState("");
  //creates state for background selection so that background is populated dynamically
  const [background, setBackground] = useState("white");
  //creates a variable (options) for th setBackground selection
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userId: result.user.uid,
          name: name,
          color: background,
        });
        Alert.alert("Signed in Successfully");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Unable to sign in, try again later");
      });
  };

  return (
    //prevents keyboard from blocking view
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/background-image.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 2 }}>
              <Text style={styles.title}>Chat App</Text>
            </View>
            <View style={styles.box}>
              <View style={styles.textInput}>
                <Image
                  style={styles.icon}
                  source={require("../assets/user-icon.png")}
                />
                <TextInput
                  value={name}
                  style={{ width: "100%", marginLeft: 10 }}
                  /*user interaction that uses a prop to populate the textbox based on the current state*/
                  onChangeText={setName}
                  placeholder={"Your Name"}
                />
              </View>

              <View style={styles.backgroundContainer}>
                <Text style={styles.textBackground}>
                  Choose your background color:
                </Text>
                {/* ASK ABOUT BELOW */}
                <View style={styles.colorList}>
                  {colors.map((color, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.colorCircles, { backgroundColor: color }]}
                      onPress={() => setBackground(color)}
                    />
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={signInUser}
              >
                <Text style={styles.button}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 40,
    textAlign: "center",
  },
  text: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  box: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
  },
  textInput: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#757083",
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 50,
    flexDirection: "row",
  },
  textBackground: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
    paddingLeft: 20,
  },
  colorList: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  colorCircles: {
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 20,
  },
  backgroundContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "#757083",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  selected: {
    borderWidth: 1,
    borderColor: "white",
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default Start;
