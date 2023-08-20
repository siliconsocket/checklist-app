export const SET_SHOW_DIALOG = "SET_SHOW_DIALOG";
export const SET_DIALOG_TYPE = "SET_DIALOG_TYPE";
export const SET_DIALOG_TITLE = "SET_DIALOG_TITLE";
export const TOGGLE_CHECKED = "TOGGLE_CHECKED";
export const SET_TASK_INDEX_SELECTED = "SET_TASK_INDEX_SELECTED";
export const SET_TASK_NAME_SELECTED = "SET_TASK_NAME_SELECTED";
export const SET_TASK_FIELD_VALUE = "SET_TASK_FIELD_VALUE";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK_NAME = "UPDATE_TASK_NAME";
export const REMOVE_TASK = "REMOVE_TASK";

export enum DIALOG_TYPE {
  CONFIRM = "CONFIRM",
  EDIT = "EDIT",
}

export enum DIALOG_TITLE {
  CONFIRM = "Confirmación",
  EDIT = "Editar tarea",
}

export type ItemList = {
  name: string;
  isChecked?: boolean;
};

const initialState = {
  taskFieldValue: "",
  dialogIsVisible: false,
  dialogType: DIALOG_TYPE.CONFIRM,
  dialogTitle: DIALOG_TITLE.CONFIRM,
  tasksList: [],
  taskIndexSelected: 0,
  taskNameSelected: "",
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CHECKED:
      const newItems = [...state.tasksList];
      newItems[action.index].isChecked = !newItems[action.index].isChecked;
      return {
        ...state,
        tasksList: newItems,
      };
    case ADD_TASK:
      return {
        ...state,
        tasksList: [...state.tasksList, action.task],
      };
    case SET_TASK_FIELD_VALUE:
      return {
        ...state,
        taskFieldValue: action.value,
      };
    case UPDATE_TASK_NAME:
      const updatedTasks = [...state.tasksList];
      updatedTasks[state.taskIndexSelected].name = action.name;
      return {
        ...state,
        tasksList: updatedTasks,
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasksList: state.tasksList.filter(
          (_, itemIndex: number) => itemIndex !== state.taskIndexSelected
        ),
      };
    case SET_SHOW_DIALOG:
      return {
        ...state,
        dialogIsVisible: action.isVisible,
      };
    case SET_DIALOG_TITLE:
      return {
        ...state,
        dialogTitle: action.dialogTitle,
      };
    case SET_DIALOG_TYPE:
      return {
        ...state,
        dialogType: action.dialogType,
      };
    case SET_TASK_INDEX_SELECTED:
      return {
        ...state,
        taskIndexSelected: action.index,
      };
    case SET_TASK_NAME_SELECTED:
      return {
        ...state,
        taskNameSelected: action.name,
      };
    default:
      return state;
  }
};

export default reducer;
