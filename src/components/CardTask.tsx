import { StyleSheet, Pressable, View } from "react-native";
import React from "react";
import { Checkbox, Divider, IconButton, Text } from "react-native-paper";

type TProps = {
  name: string;
  onPress: () => void;
  onLongPress: () => void;
  onEdit: () => void;
  isChecked?: boolean;
};

const CardTask = ({
  name,
  onPress,
  onLongPress,
  onEdit,
  isChecked = false,
}: TProps) => {
  return (
    <View style={styles.wrapper}>
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
      <IconButton icon="plus-thick" size={25} onPress={() => onEdit?.()} />
    </View>
  );
};

export default CardTask;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
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
