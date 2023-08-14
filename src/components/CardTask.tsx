import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { Checkbox, Divider, Text } from "react-native-paper";

type TProps = {
  name: string;
  onPress: () => void;
  onLongPress: () => void;
  isChecked?: boolean;
};

const CardTask = ({ name, onPress, onLongPress, isChecked = false }: TProps) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => onPress?.()}
      onLongPress={() => onLongPress?.()}
    >
      <Checkbox.Android status={isChecked ? "checked" : "unchecked"} />
      <Text style={[isChecked ? styles.text : {}]} numberOfLines={1}>
        {name}
      </Text>
      <Divider />
    </Pressable>
  );
};

export default CardTask;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  text: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});
