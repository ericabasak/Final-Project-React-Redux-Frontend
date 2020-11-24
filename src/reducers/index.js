export default function index(
  state = {
    todos: [],
    loading: false,
    todoItems: []
  },
  action
) {
  console.log("this is what action is")
  console.log(action)
  console.log(action.type)

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
    default:
      return state;
  }
}
 
