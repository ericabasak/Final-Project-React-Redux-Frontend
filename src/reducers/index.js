export default function index(
  state = {
    lists: [],
    loading: false,
    todoItems: [],
    isComplete: false
  },
  action
) {
  switch (action.type) {
    case "LOAD_LISTS":
      return {
        ...state,
        lists: [],
        loading: true
      };
    case "ADD_LISTS":
      return {
        ...state,
        lists: action.lists,
        loading: false
      };
    case "LOAD_TODO_ITEMS":
      return {
        ...state,
        // todoItems: action.todoItems,
        loading: true
      };
    case "ADD_TODO_ITEMS":
      return {
        ...state,
        todoItems: state.todoItems.concat(action.todoItems),
        loading: false
      };
    case "LOAD_IS_COMPLETE_CHECKBOX":
      return {
        ...state,
        loading: true
      };
    case "ADD_IS_COMPLETE_CHECKBOX":
      return {
        ...state,
        isComplete: action.isComplete
      };
    case "LOAD_DELETE_TODO_ITEM":
      return {
        ...state,
        loading: true
      };
    case "DELETE_TODO_ITEM":
      return {
        ...state,
        todoItems: action.loading
      };
    default:
      return state;
  }
}
 
