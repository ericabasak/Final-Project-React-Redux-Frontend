// to update state, create an action (object with a key type)
// and pass the action as an arguement to the reducer(the switch/case statement)
// and that is how you change state

// actions are plain javascript objects that have a type field
// think of an action as an event that describes something that happend on the frontend

// fetching all todos AKA lists
export const fetchLists = (token) => {
  return (dispatch) => {
    console.log("loading lists")
    dispatch({ type: 'LOAD_LISTS' })
    fetch('http://localhost:3001/api/v1/lists',
      {
        headers:
        {
          "Authorization": "Bearer " + token
        }
      })
      .then(response => {
        return response.json()
      })
      .then(lists => {
        console.log(lists)
        dispatch({ type: 'ADD_LISTS', lists: lists })
      })
  }
}

// fetching all items from each todo
export const fetchTodoItems = (token) => {
  return (dispatch) => {
    console.log("loading todo items")
    // dispatch({ type: 'LOAD_TODO_ITEMS' })
    fetch(`http://localhost:3001/api/v1/lists/${token}`,
      {
        headers:
        {
          "Authorization": "Bearer " + token
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
export const fetchIsComplete = (token) => {
  return (dispatch) => {
    console.log("loading is_complete lists")
    dispatch({ type: 'LOAD_IS_COMPLETE_CHECKBOX' })
    fetch(`http://localhost:3001/api/v1/lists/${token}`,
      {
        headers:
        {
          "Authorization": "Bearer " + token
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
export const fetchDeleteTodoItem = (token) => {
  return (dispatch) => {
    console.log("load delete todo items")
    dispatch({ type: 'LOAD_DELETE_TODO_ITEM' })
    fetch(`http://localhost:3001/api/v1/items/${token}`,
      {
        headers:
        {
          "Authorization": "Bearer " + token
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