import React, { useState } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { DIALOG_TYPE } from "../reducers/Tasks";
import CustomInput from "./CustomInput";

type TDialogProps = {
  isVisible?: boolean;
  title?: string;
  fieldValue?: string;
  fieldLabel?: string;
  onDismiss?: () => void;
  onConfirm?: (newName?: string) => void;
};

const CustomDialog = ({
  isVisible = false,
  onDismiss,
  onConfirm,
  title = "Confirmación",
  fieldValue = "",
  fieldLabel = "Agregar tarea",
}: TDialogProps) => {
  const [newName, setNewName] = useState<string>(fieldValue);
  const dialogType = useSelector((state) => state.Tasks.dialogType);

  const renderDialogContent = () => {
    switch (dialogType) {
      case DIALOG_TYPE.EDIT:
        return (
          <CustomInput
            label={fieldLabel}
            onChangeText={(text) => setNewName(text)}
            value={newName}
          />
        );
      case DIALOG_TYPE.CONFIRM:
      default:
        return (
          <Text variant="bodyMedium">{"¿Deseas eliminar esta tarea?"}</Text>
        );
    }
  };

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>{renderDialogContent()}</Dialog.Content>
        <Dialog.Actions>
          {onDismiss && <Button onPress={onDismiss}>Cancelar</Button>}
          {onConfirm && (
            <Button onPress={() => onConfirm(newName)}>Aceptar</Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;
