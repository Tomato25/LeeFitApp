import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { Component, useState } from "react";
import Colors from "@/constants/Colors";
import uuid from "react-native-uuid";

export default function WorkoutTags({ selectedTags, setSelectedTags }) {
  
    const tags = [
        { tag: "Upper body", id: 1 }, 
        { tag: "Lower body", id: 2 },
        { tag: "Lower body", id: 7 }, 
        { tag: "Upper body", id: 3 },
        { tag: "Arms", id: 4 }, 
        { tag: "Compound", id: 5 }, 
        { tag: "Cardio", id: 6 }
    ];

    const addTag = (arr, obj) => {
        const index = arr.findIndex(item => item.id === obj.id);
        if (index !== -1) {
            // Object exists, remove it
            return arr.filter(item => item.id !== obj.id);
        } else {
            // Object doesn't exist, add it
            return [...arr, obj];
        } 
    };

    const handleToggle = (objToToggle) => {
        setSelectedTags(prevArray => addTag(prevArray, objToToggle));
    };

    return (
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleToggle(tag)}>
            <View
              style={[
                styles.tagButton,
                selectedTags.find(selectedTag => selectedTag.id === tag.id) 
                  ? { backgroundColor: '#ff8c00' } 
                  : null,
              ]}>
              <Text style={[
                styles.textBtn,
                selectedTags.find(selectedTag => selectedTag.id === tag.id) 
                  ? styles.chosenTextBtn 
                  : null,
              ]}>
                {tag.tag}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  tagContainer: {
    width: "80%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tagButton: {
    borderWidth: 1,
    borderRadius: 99,
    padding: 5,
    paddingHorizontal: 20,
    alignItems: "center",
    marginRight: 10,
    borderColor: "#ff8c00",
    marginBottom: 15,
  },
  textBtn: {
    color: Colors.light.orange,
    fontFamily: "outfit",
  },
  chosenTextBtn: {
    color: "black",
    fontFamily: "outfit",
  },
});
