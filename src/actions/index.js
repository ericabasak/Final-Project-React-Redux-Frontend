// fetching all todos AKA lists
export const fetchLists = () => {
  return (dispatch) => {
    console.log("loading lists")
    dispatch({ type: 'LOAD_LISTS' })
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
      .then(lists => {
        dispatch({ type: 'ADD_LISTS', lists: lists })
      })
  }
}

// fetching all items from each todo
export const fetchTodoItems = (id) => {
  return (dispatch) => {
    console.log("loading todo items")
    // dispatch({ type: 'LOAD_TODO_ITEMS' })
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

// deleting an individual todo item
export const fetchDeleteTodoItem = (id) => {
  return (dispatch) => {
    console.log("load delete todo items")
    dispatch({ type: 'LOAD_DELETE_TODO_ITEM' })
    fetch(`http://localhost:3001/api/v1/items/${id}`,
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
        dispatch({ type: 'DELETE_TODO_ITEM', todos: todos })
      })
  }
}


export const fetchCurrentUser = () => {
  return (dispatch) => {
    console.log("loading current user")
    dispatch({ type: 'LOAD_GET_CURRENT_USER' })
    fetch('http://localhost:3001/api/v1/get_current_user',
      {
        headers:
        {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        return response.json()
      })
      .then(response => {
        console.log(response);
        if (response.user) {
          dispatch({ type: 'ADD_CURRENT_USER', user: response.user })
        } 
      })
  }
}