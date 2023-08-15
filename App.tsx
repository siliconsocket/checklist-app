import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ActivityIndicator, Button, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomAppbar from "./src/components/CustomAppbar";
import CustomInput from "./src/components/CustomInput";
import { useRef, useState } from "react";
import CardTask from "./src/components/CardTask";
import CustomDialog from "./src/components/CustomDialog";

type ItemList = {
  name: string;
  isChecked?: boolean;
};

const list = [
  { name: "tarea 1", isChecked: false },
  { name: "tarea 2", isChecked: false },
];

function App() {
  const [taskString, setTaskString] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [tasksList, setTaskList] = useState<ItemList[]>(list);
  const [itemSelected, setItemSelected] = useState<number | null>(null);

  const handleChecked = (index: number) => {
    setTaskList((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].isChecked = !newItems[index].isChecked;
      return newItems;
    });
  };

  const addNewTask = () => {
    if (taskString.trim() !== '') {
      const newTask: ItemList = {
        name: taskString,
        isChecked: false,
      };
      setTaskList((prevItems) => {
        const newItems = [...prevItems, newTask];
        return newItems;
      });
      setTaskString('');
    }
    else{
      Alert.alert('Error', 'El campo de tarea esta vacio, por favor agregue una tarea',[
        {
          text: 'Aceptar'
        }
      ]);
    }
  };

  const onRemoveItem = (index: number) => {
    setShowDialog(true);
    setItemSelected(index);
  };

  const doRemoveItem = () => {
    setShowDialog(false);
    setTaskList((prevItems) =>
      prevItems.filter((_, itemIndex: number) => itemIndex !== itemSelected)
    );
    setItemSelected(null);
  };

  return (
    <View style={styles.container}>
      <CustomAppbar title="Checklist" goBack={() => alert("go back")} />
      <CustomInput
        label={"Agregar tarea"}
        onChangeText={(text) => setTaskString(text)}
        value={taskString}
        onSave={() => addNewTask()}
      />
      {tasksList.map(function (item, index) {
        return (
          <CardTask
            key={`task-${index}`}
            name={item.name}
            isChecked={item.isChecked}
            onPress={() => handleChecked(index)}
            onLongPress={() => onRemoveItem(index)}
          />
        );
      })}
      <CustomDialog
        isVisible={showDialog}
        onDismiss={() => setShowDialog(false)}
        onConfirm={() => doRemoveItem()}
      />
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
    backgroundColor: "#fff",
  },
});
