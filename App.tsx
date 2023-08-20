import { Alert, StyleSheet, View } from "react-native";
import { PaperProvider, Surface, Text } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import CardTask from "./src/components/CardTask";
import CustomAppbar from "./src/components/CustomAppbar";
import CustomDialog from "./src/components/CustomDialog";
import CustomInput from "./src/components/CustomInput";

import store from "./src/config/reduxStore";

import {
  addTask,
  removeTask,
  setDialogTitle,
  setDialogType,
  setIndexSelected,
  setNameSelected,
  setShowDialog,
  setTaskFieldValue,
  toggleChecked,
  updateTaskName,
} from "./src/actions/task";
import { DIALOG_TITLE, DIALOG_TYPE, ItemList } from "./src/reducers/Tasks";

function App() {
  const dispatch = useDispatch();

  const dialogIsVisible = useSelector((state) => state.Tasks.dialogIsVisible);
  const dialogTitle = useSelector((state) => state.Tasks.dialogTitle);
  const dialogType = useSelector((state) => state.Tasks.dialogType);
  const taskIndexSelected = useSelector(
    (state) => state.Tasks.taskIndexSelected
  );
  const taskFieldValue = useSelector((state) => state.Tasks.taskFieldValue);
  const taskNameSelected = useSelector((state) => state.Tasks.taskNameSelected);
  const tasksList = useSelector((state) => state.Tasks.tasksList);

  const handleChangeText = (text: string) => {
    dispatch(setTaskFieldValue(text));
  };

  const handleChecked = (index: number) => {
    dispatch(toggleChecked(index));
  };

  const addNewTask = () => {
    if (taskFieldValue.trim() !== "") {
      const newTask: ItemList = {
        name: taskFieldValue,
        isChecked: false,
      };
      dispatch(addTask(newTask));
      dispatch(setTaskFieldValue(""));
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
    dispatch(updateTaskName(newName, taskIndexSelected));
    dispatch(setShowDialog(false));
  };

  const onEdit = (name: string) => {
    dispatch(setShowDialog(true));
    dispatch(setDialogType(DIALOG_TYPE.EDIT));
    dispatch(setDialogTitle(DIALOG_TITLE.EDIT));
    dispatch(setNameSelected(name));
  };

  const onRemoveItem = (index: number) => {
    dispatch(setShowDialog(true));
    dispatch(setDialogType(DIALOG_TYPE.CONFIRM));
    dispatch(setDialogTitle(DIALOG_TITLE.CONFIRM));
    dispatch(setIndexSelected(index));
  };

  const doRemoveItem = () => {
    dispatch(setShowDialog(false));
    dispatch(removeTask());
    dispatch(setIndexSelected(0));
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
        onChangeText={handleChangeText}
        value={taskFieldValue}
        onSave={addNewTask}
      />
      {renderBody()}
      {dialogIsVisible && (
        <CustomDialog
          title={dialogTitle}
          fieldValue={taskNameSelected}
          onDismiss={() => dispatch(setShowDialog(false))}
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
    <ReduxProvider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
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
