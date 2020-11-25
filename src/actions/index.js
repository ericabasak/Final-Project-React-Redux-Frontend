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
export const fetchTodoItems = (id) => {
  return (dispatch) => {
    console.log("loading todo items")
    dispatch({ type: 'LOAD_TODO_ITEMS' })
    fetch(`http://localhost:3001/api/v1/lists/${id}`,
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



// is_complete update for lists
export const fetchIsComplete = (id) => {
  return (dispatch) => {
    console.log("loading is_complete lists")
    dispatch({ type: 'LOAD_IS_COMPLETE_CHECKBOX' })
    fetch(`http://localhost:3001/api/v1/lists/${id}`,
      {
        headers:
        {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        return response.json()
      })
      .then(isComplete => {
        dispatch({ type: 'ADD_IS_COMPLETE_CHECKBOX', isComplete: isComplete })
      })
  }
}

