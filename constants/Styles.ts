import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
  inputField: {
    height: 50,
    borderBottomWidth:1,
    color: Colors.light.orange,
    //backgroundColor: "#212145",
    backgroundColor: Colors.light.blue,
    padding: 10,
    width: "90%",
    borderRadius: 8,
    fontFamily: "outfit",
  },
  btn: {
    backgroundColor: Colors.light.orange,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  btnText: {
    color: "black",
    fontSize: 16,
    fontFamily: "outfit-b",
  },
  btnIcon: {
    position: "absolute",
    left: 16,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: Colors.light.orange,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: "90%",
  },
  btnOutlineText: {
    color: Colors.light.orange,
    fontSize: 16,
    fontFamily: "outfit-sb",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    width:"100%"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
    
  },
  card: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: Colors.light.blue,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 15,
  },
});


/* inputField: {
  height: 44,
  borderWidth: 1,
  borderColor: Colors.light.orange,
  color: Colors.light.orange,
  borderRadius: 8,
  padding: 10,
  width: "90%",
}, */