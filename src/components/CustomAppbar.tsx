import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

type TProps = {
  title: string;
  goBack?: () => void;
};

const CustomAppbar = ({ title, goBack }: TProps) => {
  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
      <Appbar.Action icon="calendar" onPress={() => {}} />
    </Appbar.Header>
  );
};

export default CustomAppbar;

const styles = StyleSheet.create({});
