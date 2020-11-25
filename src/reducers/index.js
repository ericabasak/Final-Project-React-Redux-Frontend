export default function index(
  state = {
    todos: [],
    loading: false,
    todoItems: [],
    isComplete: false
  },
  action
) {
  switch (action.type) {
    case "LOAD_TODOS":
      console.log("reducer 1")
      return {
        todos: [],
        loading: true
      };
    case "ADD_TODOS":
      console.log("reducer 2")
      return {
        ...state,
        todos: action.todos,
        loading: false
      };
      case "LOAD_TODO_ITEMS":
      console.log("reducer 3")
      return {
        ...state,
        todoItems: action.todoItems,
        loading: false
      };
    case "ADD_TODO_ITEMS":
      console.log("reducer 4")
      return {
        ...state,
        todoItems: action.todoItems,
        loading: false
      };
      case "LOAD_IS_COMPLETE_CHECKBOX":
      console.log("reducer 5")
      return {
        ...state,
        isComplete: action.isComplete
      };
    case "ADD_IS_COMPLETE_CHECKBOX":
      console.log("reducer 6")
      return {
        ...state,
        isComplete: action.isComplete
      };
    default:
      return state;
  }
}
 
