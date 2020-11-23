const toDoAppReducer = (
  state = { 
    todos: [], 
    loading: false 
  }, 
    action
) => {
  switch(action.type) {
    case 'LOADING_TODOS':
      return {
        ...state,
        todos: [...state.todos],
        loading: true
      }
    case 'ADD_TODOS':
      return {
        ...state,
        todos: action.todos,
        loading: false
      }
    default:
      return state;
  }
}
 
export default toDoAppReducer;