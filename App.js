import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  useWindowDimensions,
} from "react-native";
import Deck from "./src/components/Deck";
import { Card, Button, Image } from "@rneui/themed";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "https://cdn.pixabay.com/photo/2013/03/02/02/41/alley-89197_960_720.jpg",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "https://cdn.pixabay.com/photo/2017/03/29/15/18/tianjin-2185510_960_720.jpg",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "https://cdn.pixabay.com/photo/2017/11/11/21/55/freedom-2940655_960_720.jpg",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "https://cdn.pixabay.com/photo/2017/01/18/16/46/hong-kong-1990268_960_720.jpg",
  },
  {
    id: 5,
    text: "Card #5",
    uri: "https://cdn.pixabay.com/photo/2017/01/28/02/24/japan-2014618_960_720.jpg",
  },
  {
    id: 6,
    text: "Card #6",
    uri: "https://cdn.pixabay.com/photo/2016/11/13/12/52/kuala-lumpur-1820944_960_720.jpg",
  },
  {
    id: 7,
    text: "Card #7",
    uri: "https://cdn.pixabay.com/photo/2017/03/05/00/34/panorama-2117310_960_720.jpg",
  },
  {
    id: 8,
    text: "Card #8",
    uri: "https://cdn.pixabay.com/photo/2016/11/29/09/16/architecture-1868667_960_720.jpg",
  },
];

export default function App() {
  const [cards, setCards] = useState([]);
  const position = useRef(new Animated.ValueXY()).current;
  const { height, width } = useWindowDimensions();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  useEffect(() => {
    setCards(DATA);
  }, [cards]);

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-width * 1.5, 0, width * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });

    return {
      ...position.getLayout(),
      transform: [
        {
          rotate,
        },
      ],
    };
  };

  const renderCard = ({ item, index }) => {
    if (index === 0) {
      return (
        <Animated.View
          key={item.id}
          style={getCardStyle()}
          {...panResponder.panHandlers}
        >
          <Card key={item.id}>
            <Card.Title>{item.text}</Card.Title>
            <Card.Image source={{ uri: item.uri }} />
            <Text
              style={{
                marginBottom: 10,
              }}
            >
              I can customize the card further.
            </Text>
            <Button
              icon={{ name: "code" }}
              backgroundColor="#03A9F4"
              title="View Now!"
            />
          </Card>
        </Animated.View>
      );
    }

    if (item) {
      return (
        <Card key={item.id}>
          <Card.Title>{item.text}</Card.Title>
          <Card.Image source={{ uri: item.uri }} />
          <Text
            style={{
              marginBottom: 10,
            }}
          >
            I can customize the card further.
          </Text>
          <Button
            icon={{ name: "code" }}
            backgroundColor="#03A9F4"
            title="View Now!"
          />
        </Card>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Deck data={DATA} renderCard={renderCard} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
});
