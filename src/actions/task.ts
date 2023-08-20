import {
  ADD_TASK,
  DIALOG_TITLE,
  DIALOG_TYPE,
  REMOVE_TASK,
  SET_DIALOG_TITLE,
  SET_DIALOG_TYPE,
  SET_SHOW_DIALOG,
  SET_TASK_FIELD_VALUE,
  SET_TASK_INDEX_SELECTED,
  SET_TASK_NAME_SELECTED,
  TOGGLE_CHECKED,
  UPDATE_TASK_NAME,
} from "./../reducers/Tasks";

export const toggleChecked = (index: number) => ({
  type: TOGGLE_CHECKED,
  index,
});

export const addTask = (task: { name: string; isChecked?: boolean }) => ({
  type: ADD_TASK,
  task,
});

export const setTaskFieldValue = (value: string) => ({
  type: SET_TASK_FIELD_VALUE,
  value,
});

export const updateTaskName = (name: string, index: number) => ({
  type: UPDATE_TASK_NAME,
  name,
  index,
});

export const setShowDialog = (isVisible: boolean) => ({
  type: SET_SHOW_DIALOG,
  isVisible,
});

export const setDialogType = (dialogType: DIALOG_TYPE) => ({
  type: SET_DIALOG_TYPE,
  dialogType,
});

export const setDialogTitle = (dialogTitle: DIALOG_TITLE) => ({
  type: SET_DIALOG_TITLE,
  dialogTitle,
});

export const setNameSelected = (name: string) => ({
  type: SET_TASK_NAME_SELECTED,
  name,
});

export const setIndexSelected = (index: number) => ({
  type: SET_TASK_INDEX_SELECTED,
  index,
});

export const removeTask = () => ({
  type: REMOVE_TASK,
});
