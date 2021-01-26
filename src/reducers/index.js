export default function index(
  state = {
    lists: [],
    loading: false,
    todoItems: [],
    isComplete: false,
    user: {},
    token: ""
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
      return {
        ...state,
        user: {}
        };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.token
        };
// write redux for the ListForm page
    case "LOAD_LIST_FORM":
      return {
        ...state,
        loading: true
      };
    case "ADD_LIST_FORM":
      return {
        ...state,
        lists: action.lists,
      };
    default:
      return state;
  }
}
 
// reducers are functions that take a state and an action as arguments
// and return a new state.
// reducers are pure functions - only return a value & no side effects
// reducer always creates a new state object
