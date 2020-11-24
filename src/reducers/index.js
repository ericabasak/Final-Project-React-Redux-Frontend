export default function index(
  state = {
    todos: [],
    loading: false,
    todoItems: []
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
        todoItems: [],
        loading: true
      };
    case "ADD_TODO_ITEMS":
      console.log("reducer 4")
      return {
        ...state,
        todoItems: action.lists,
        loading: false
      };
    default:
      return state;
  }
}
 
