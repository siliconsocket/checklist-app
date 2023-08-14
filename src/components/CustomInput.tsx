import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";

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
      <Button
        icon="content-save"
        mode="contained"
        style={styles.btn}
        onPress={() => onSave?.()}
      >
        Guardar
      </Button>
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
  btn: {
    marginLeft: 5,
    width: 111,
  },
});
