export default function index(
  state = {
    lists: [],
    loading: false,
    todoItems: [],
    isComplete: false,
    user: {},
    token: localStorage.getItem("token")
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
    case "LOAD_IS_COMPLETE_CHECKBOX_LIST":
      return {
        ...state,
        loading: true
      };
    case "ADD_IS_COMPLETE_CHECKBOX_LIST":
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
      const todoItems = state.todoItems.filter(i => i.id !== action.todo.id);
      console.log(todoItems);
      return {
        ...state,
        loading: false,
        todoItems: []
      };
      case "LOAD_GET_CURRENT_USER":
      return {
        ...state,
        loading: true
      };
    case "ADD_CURRENT_USER":
      return {
        ...state,
        user: action.user
      };
    case "LOGOUT_USER":
        localStorage.removeItem('token');
        return {
          ...state,
          user: {},
          token: undefined
        };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.token)
      return {
        ...state,
        token: action.token
        // token: localStorage.getItem("token")
        };
        // this is when an item or todo is added or created to a list
    case "LOAD_TODO_ITEM_SUBMIT":
      return {
        ...state,
        loading: true
      };
    case "ADD_TODO_ITEM_SUBMIT":
      return {
        ...state,
        todoItems: state.todoItems.concat(action.todo),
        loading: false
      };
    case "LOAD_LIST_FORM":
      return {
        ...state,
        loading: true
      };
    case "ADD_LIST_FORM":
      return {
        ...state,
        lists: action.lists
      };
// update the checkbox for an item
    case "LOAD_IS_COMPLETE_TODO_ITEM":
      return {
        ...state,
        loading: true
      };
    case "ADD_IS_COMPLETE_TODO_ITEM":
      return {
        ...state,
        isComplete: action.isComplete
      };
    default:
      return state;
  }
}
 
// reducers are functions that take a state and an action as arguments
// and return a new state.
// reducers are pure functions - only return a value & no side effects
// reducer always creates a new state object
