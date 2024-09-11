import Colors from '@/constants/Colors';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import uuid from 'react-native-uuid';

export default function PickerComponent() {
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const flatListRef = useRef(null);

  const ITEM_HEIGHT = 40; // Set the height of each item to control scroll behavior
  const VISIBLE_ITEMS = 3; // Number of visible items in the picker

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    if (timeList.length > 0) {
      // Automatically select the middle item when the time list is set
      const middleIndex = Math.floor(timeList.length / 2);
      setSelectedTime(timeList[middleIndex].id);
      scrollToIndex(middleIndex);
    }
  }, [timeList]);

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i < 12; i++) {
      timeList.push({
        time: i + ':00 AM',
        id: uuid.v4(),
      });
      timeList.push({
        time: i + ':30 AM',
        id: uuid.v4(),
      });
    }
    timeList.push({
      time: 12 + ':00 PM',
      id: uuid.v4(),
    });
    timeList.push({
      time: 12 + ':30 PM',
      id: uuid.v4(),
    });
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ':00 PM',
        id: uuid.v4(),
      });
      timeList.push({
        time: i + ':30 PM',
        id: uuid.v4(),
      });
    }
    setTimeList(timeList);
  };

  const scrollToIndex = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.5, // Center the item
      });
    }
  };

  const handleScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / 40) + 1; // Calculate the index of the item closest to the center
    const item = timeList[index];
    setSelectedTime(item.id);

    // Scroll to ensure the item is centered
    scrollToIndex(index);
    console.log(item.time)
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Time</Text>

      <View style={styles.pickerWrapper}>
        <FlatList
          ref={flatListRef}
          data={timeList}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => scrollToIndex(index)}>
              <View style={[styles.itemContainer]}>
                <Text style={[styles.itemText, selectedTime === item.id && styles.selectedItemText]}>
                  {item.time}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          getItemLayout={(data, index) => ({
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
    </SafeAreaView>
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
    height: 40 * 3, // Height of the picker (5 items visible)
    width: Dimensions.get('window').width * 0.8,
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
  },
  selectedItemText: {
    fontSize: 20,
    color: '#ff8c00',
    fontWeight: 'bold',
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
    width: '40%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ff8c00',
  },
});
