import React from "react";
import { StyleSheet, View } from "react-native";
import { Dialog, Portal, Text, Button } from "react-native-paper";

type TDialogProps = {
  isVisible?: boolean;
  onDismiss?: () => void;
  onConfirm?: () => void;
};

const CustomDialog = ({
  isVisible = false,
  onDismiss,
  onConfirm,
}: TDialogProps) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Title>{"Confirmación"}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{"¿Deseas eliminar esta tarea?"}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button onPress={onConfirm}>Aceptar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CustomDialog;
