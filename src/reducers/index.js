// REDUCERS ARE PURE FUNCTIONS - predictable and returns same value
// same input equals same output
// dispatch an action into the reducer
// takes two parameters - initial state, action
// the reducer takes the action, then changes the 
// state on the store based on the action. After access to the state, it can be updated.
// an action a JavaScript object that has type property that describes an action
// and an optional payload.

// an action is just a plain object with a type key.
// Redux pattern in which the store dispatches an action to the 
// reducer, the reducer uses that action to make changes 
// to the state, and components re-render with new data.

// 1.
// We hold our application's state in one plain old JavaScript object, 
// and we update that state by passing both an action 
// and the old state to our reducer. Our reducer returns to us our new state.
// 2.
// So to change our state we (1) create an action (an action is just 
// a plain object with a type key); and (2) and pass the action 
// as an argument when we call the reducer (which is just a function 
// with a switch/case statement). This produces a new state.
// 3
// Our reducer is a pure function which means that given the same 
// arguments of state and action, it will always produce the same 
// new state. Also it means that our reducer never updates the 
// previous state, but rather creates a new state object.

export default function index(
  state = {
    lists: [],
    loading: false,
    todoItems: [],
    user: {},
    token: localStorage.getItem("token")
  },
  action
  // the action plus the initial state creates updated state
) {
  switch (action.type) {
    case "LOAD_LISTS":
      return {
        ...state,
        loading: true
      };
      // SORT THROUGH ALL LISTS IN ALPHEBETICAL ORDER
      // action represents what you get back from server
      // action.lists is lists from server but unsorted
      // action contains all the input data

    case "ADD_LISTS":
      const sortedList = action.lists.sort((a, b) => (a.title > b.title) ? 1 : -1)
      console.log(sortedList);
      return {
        ...state,
        lists: sortedList,
        loading: false
      };
    case "LOAD_TODO_ITEMS":
      return {
        ...state,
        // todoItems: action.todoItems,
        loading: true
      };
    case "ADD_TODO_ITEMS":
      console.log(action);
      const newItems = action.todoItems.filter(todo => {
        return !state.todoItems.find(e => e.id === todo.id);
      });
      return {
        ...state,
        todoItems: state.todoItems.concat(newItems),
        loading: false
      };
    // update the list checkbox status
    case "UPDATE_LIST_STATUS":
        const listIndex = state.lists.filter(l => l.id === action.list.id);
        state.lists.splice(listIndex, 1, action.list)
        return {
          ...state,
          lists: state.lists,
          loading: false
        };
    // deleting a todo item from a list
    case "LOAD_DELETE_TODO_ITEM":
      return {
        ...state,
        loading: true
      };
    case "DELETE_TODO_ITEM":
      // filter - filters goes through and array of items and looks to
      // see if it meets a condition given
      // action.todo.id is the deleted item
      const todoItems = state.todoItems.filter(i => i.id !== action.todo.id);
      console.log(todoItems);
      return {
        ...state,
        loading: false,
        todoItems: todoItems
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
// [{id:1},{id:1}, {id:2modified},{id:3}]
//1. [{id:1},{id:1}]
//2. [{id:1},{id:1}, {id:2modified}]
//3. [{id:1},{id:1}, {id:2modified}, ,{id:3}]
// [{id:1},{id:1}, {id:2modified},{id:3}]
// [{id:1},{id:2},{id:3}]
    case "UPDATE_TODO_ITEM":
      console.log(action);
      const itemIndex = state.todoItems.findIndex((item) => item.id === action.todo.id);
      state.todoItems.splice(itemIndex, 1, action.todo);
      // prevItems = prevItems.concat(action.todo);
      // const postItems = state.todoItems.splice(itemIndex + 1);
      console.log(state.todoItems);
      // const updatedItems = prevItems.concat(state.todoItems);
      // console.log(updatedItems);
      return {
        ...state,
        todoItems: state.todoItems,
        loading: false
      };
    case 'ADD_A_LIST':
      console.log(action);
      return {
        ...state,
        lists: state.lists.concat(action.list),
        loading: false
      };
    default:
      return state;
  }
}
 
// reducers are functions that take a state and an action as arguments
// and return a new state.
// reducers are pure functions - only return a value & no side effects
// reducer always creates a new state object


// state + action = newState