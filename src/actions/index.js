export const fetchTodos = () => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_TODOS'})
    fetch('http://localhost:3001/api/v1/lists')
      .then(response => {
        return response.json()
      })
      .then(responseJSON => {
        dispatch({ type: 'ADD_TODOS', todos: responseJSON })
      })
  }
}