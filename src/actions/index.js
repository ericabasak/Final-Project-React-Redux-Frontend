// fetching all todos AKA lists
export const fetchTodos = () => {
  return (dispatch) => {
    console.log("loading todos")
    dispatch({ type: 'LOAD_TODOS' })
    fetch('http://localhost:3001/api/v1/lists',
      {
        headers:
        {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        return response.json()
      })
      .then(todos => {
        dispatch({ type: 'ADD_TODOS', todos: todos })
      })
  }
}

// fetching all items from each todo
export const fetchTodoItems = () => {
  return (dispatch) => {
    console.log("loading todo items")
    dispatch({ type: 'LOAD_TODO_ITEMS' })
    fetch(`http://localhost:3001/api/v1/lists/${this.props.id}`,
      {
        headers:
        {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        return response.json()
      })
      .then(todoItems => {
        dispatch({ type: 'ADD_TODO_ITEMS', todoItems: todoItems })
      })
  }
}

