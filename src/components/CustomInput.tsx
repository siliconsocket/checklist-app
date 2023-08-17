import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { IconButton, TextInput } from "react-native-paper";

type TProps = {
  placeholder?: string;
  label: string;
  value?: string;
  containerStyle?: ViewStyle;
  onChangeText?: (text: string) => void;
  onSave?: () => void;
};

const CustomInput = ({
  placeholder = "Ingresa una tarea...",
  label = "",
  value = "",
  containerStyle = {},
  onChangeText,
  onSave,
}: TProps) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={value}
        mode={"outlined"}
        style={styles.input}
        onChangeText={(text) => onChangeText?.(text)}
      />
      {onSave && (
        <IconButton icon="plus-thick" size={25} onPress={() => onSave?.()} />
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingBottom: 10,
    borderColor: "gray",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
  },
});
