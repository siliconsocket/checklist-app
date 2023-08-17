import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { PaperProvider, Surface, Text } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CardTask from "./src/components/CardTask";
import CustomAppbar from "./src/components/CustomAppbar";
import CustomDialog from "./src/components/CustomDialog";
import CustomInput from "./src/components/CustomInput";

type ItemList = {
  name: string;
  isChecked?: boolean;
};

export enum DIALOG_TYPE {
  CONFIRM = "CONFIRM",
  EDIT = "EDIT",
}

enum DIALOG_TITLE {
  CONFIRM = "Confirmación",
  EDIT = "Editar tarea",
}

function App() {
  const [taskString, setTaskString] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<DIALOG_TYPE>(
    DIALOG_TYPE.CONFIRM
  );
  const [dialogTitle, setDialogTitle] = useState<DIALOG_TITLE>(
    DIALOG_TITLE.CONFIRM
  );
  const [tasksList, setTaskList] = useState<ItemList[]>([]);
  const [indexSelected, setIndexSelected] = useState<number>(0);
  const [nameSelected, setNameSelected] = useState<string>("");

  const handleChecked = (index: number) => {
    setTaskList((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].isChecked = !newItems[index].isChecked;
      return newItems;
    });
  };

  const addNewTask = () => {
    if (taskString.trim() !== "") {
      const newTask: ItemList = {
        name: taskString,
        isChecked: false,
      };
      setTaskList((prevItems) => {
        const newItems = [...prevItems, newTask];
        return newItems;
      });
      setTaskString("");
    } else {
      Alert.alert(
        "Error",
        "El campo de tarea esta vacío, por favor agregue una tarea",
        [
          {
            text: "Aceptar",
          },
        ]
      );
    }
  };

  const updateTask = (newName?: string) => {
    if (!newName) {
      Alert.alert("Error", "El nombre de la tarea es requerido.", [
        {
          text: "Aceptar",
        },
      ]);
      return;
    }
    setTaskList((prevItems) => {
      const newItems = [...prevItems];
      newItems[indexSelected].name = newName;
      return newItems;
    });
    setShowDialog(false);
  };

  const onEdit = (name: string) => {
    setShowDialog(true);
    setDialogType(DIALOG_TYPE.EDIT);
    setDialogTitle(DIALOG_TITLE.EDIT);
    setNameSelected(name);
  };

  const onRemoveItem = (index: number) => {
    setShowDialog(true);
    setDialogType(DIALOG_TYPE.CONFIRM);
    setDialogTitle(DIALOG_TITLE.CONFIRM);
    setIndexSelected(index);
  };

  const doRemoveItem = () => {
    setShowDialog(false);
    setTaskList((prevItems) =>
      prevItems.filter((_, itemIndex: number) => itemIndex !== indexSelected)
    );
    setIndexSelected(0);
  };

  const renderBody = () => {
    if (tasksList.length > 0) {
      return tasksList.map(function (item, index) {
        return (
          <CardTask
            key={`task-${index}`}
            name={item.name}
            isChecked={item.isChecked}
            onPress={() => handleChecked(index)}
            onLongPress={() => onRemoveItem(index)}
            onEdit={() => onEdit?.(item.name)}
          />
        );
      });
    }
    return (
      <Surface style={styles.empty}>
        <Text>{"Ingresa una tarea"}</Text>
      </Surface>
    );
  };

  return (
    <View style={styles.container}>
      <CustomAppbar title="Checklist" />
      <CustomInput
        label={"Agregar tarea"}
        onChangeText={(text) => setTaskString(text)}
        value={taskString}
        onSave={() => addNewTask()}
      />
      {renderBody()}
      {showDialog && (
        <CustomDialog
          title={dialogTitle}
          fieldValue={nameSelected}
          dialogType={dialogType}
          onDismiss={() => setShowDialog(false)}
          onConfirm={(newName?: string) =>
            dialogType === DIALOG_TYPE.CONFIRM
              ? doRemoveItem()
              : updateTask(newName)
          }
          isVisible
        />
      )}
    </View>
  );
}

export default function Main() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    margin: 5,
    height: 77,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
