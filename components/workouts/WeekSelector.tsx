import React, { useEffect, useRef } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const WeekSelector = ({ weeks, selectedWeek, setSelectedWeek, workoutWeeks }) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    if (selectedWeek && flatListRef.current) {
      const index = weeks.findIndex((week) => week.start === selectedWeek.start);
      if (index !== -1) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }
  }, [selectedWeek, weeks]);

  const getItemLayout = (data, index) => ({
    length: 205, // Adjust based on your button size
    offset: 205 * index - 105, // Adjust based on your button size
    index,
  });

  const onScrollToIndexFailed = (error) => {
    const contentOffset = { offset: 0, animated: true };
    flatListRef.current.scrollToOffset(contentOffset);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
        data={weeks}
        keyExtractor={(item) => item.start}
        renderItem={({ item }) => {
          const isChosen = item.start === selectedWeek?.start;
          const isWorkoutSet = workoutWeeks.includes(item.start);
          return (
            <TouchableOpacity
              onPress={() => setSelectedWeek(item)}
              style={[styles.dayButton, isChosen && { backgroundColor: "#ff8c00" }]}
            >
              <Text style={isChosen ? styles.chosenTextBtn : styles.textBtn}>
                {item.start} - {item.end} {isWorkoutSet ? "✔" : "✖"}
              </Text>
            </TouchableOpacity>
          );
        }}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: 75,
    width: "100%",
  },
  dayButton: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderColor: "#ff8c00",
  },
  textBtn: { color: Colors.light.orange, fontFamily: "outfit" },
  chosenTextBtn: { color: "black", fontFamily: "outfit" },
});

export default WeekSelector;