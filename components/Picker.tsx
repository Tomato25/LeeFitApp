import Colors from "@/constants/Colors";
import React, { useState, useEffect, useRef } from "react";
import { FlatList, View, Text, TouchableOpacity, NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from "react-native";

interface PickerComponentProps {
  data: (number)[]; // Accept an array of numbers as props
}

export default function PickerComponent({ data }: PickerComponentProps) {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null); // Store the selected number
  const flatListRef = useRef<FlatList<number>>(null); // Ref for FlatList

  const ITEM_HEIGHT = 40; // Set the height of each item
  const VISIBLE_ITEMS = 3; // Number of visible items

  // Scroll to the middle item on component mount
  useEffect(() => {
    if (data.length > 0) {
      const middleIndex = Math.floor(data.length / 2);
      setSelectedNumber(data[middleIndex]);
      scrollToIndex(middleIndex, false); // Do not animate the first scroll
    }
  }, [data]);

  const scrollToIndex = (index: number, animated = true) => {
    if (flatListRef.current && index >= 0 && index < data.length) {
      flatListRef.current.scrollToIndex({
        index,
        animated,
        viewPosition: 0.5, // Center the item
      });
    } else {
      console.warn(
        `scrollToIndex out of range: requested index ${index} is out of 0 to ${
          data.length - 1
        }`
      );
    }
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT); // Calculate the index of the item closest to the center

    // Ensure the index is within valid bounds
    if (index >= 0 && index < data.length) {
      const selectedItem = data[index+1];
      setSelectedNumber(selectedItem);
      console.log(`Selected Item: ${selectedItem}`); // Log the selected number
    } else {
      console.warn(`handleScrollEnd: Calculated index ${index} is out of bounds`);
    }
  };

  return (
    <View style={styles.pickerWrapper}>
      <FlatList
        ref={flatListRef}
        data={data} // Use the number array as data
        keyExtractor={(item) => item.toString()} // Use the number itself as the key
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => scrollToIndex(index)}>
            <View style={styles.itemContainer}>
              <Text
                style={[
                  styles.itemText,
                  selectedNumber === item && styles.selectedItemText,
                ]}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        snapToInterval={ITEM_HEIGHT} // Snap to each item
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd} // Detect when scrolling stops
        initialNumToRender={VISIBLE_ITEMS}
        style={styles.flatList}
      />

      {/* Overlay to highlight the selected item */}
      <View style={styles.overlay}>
        <View style={styles.overlayLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  pickerWrapper: {
    height: 120, // Height of the picker (5 items visible)
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    flexGrow: 0,
  },
  itemContainer: {
    height:40 , // Must match ITEM_HEIGHT
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: Colors.light.placeholderBlue,
    fontFamily: "outfit"
  },
  selectedItemText: {
    fontSize: 20,
    color: '#ff8c00',
    fontWeight: 'bold',
    fontFamily: "outfit-sb"

  },
  overlay: {
    position: 'absolute',
    top: 40 * ((3 - 1) / 2), // Align overlay to the middle item
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  overlayLine: {
    height: 40,
    width: '60%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ff8c00',
  },
});
