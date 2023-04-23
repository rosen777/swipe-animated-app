import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  PanResponder,
  Animated,
} from "react-native";

const Deck = ({ data, renderCard }) => {
  const [cards, setCards] = useState([]);
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },
      onPanResponderRelease: () => {
        resetPosition();
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: {
        x: 0,
        y: 0,
      },
    }).start();
  };

  useEffect(() => {}, []);

  useEffect(() => {
    setCards(data);
  }, [cards]);
  const renderCards = () => (
    <FlatList
      data={cards}
      renderItem={renderCard}
      keyExtractor={(item) => item.id}
    />
  );

  return <View>{renderCards()}</View>;
};

export default Deck;

const styles = StyleSheet.create({});
