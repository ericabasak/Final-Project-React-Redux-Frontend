// to update state, create an action (object with a key type)
// and pass the action as an arguement to the reducer(the switch/case statement)
// and that is how you change state

// actions are plain javascript objects that have a type field
// think of an action as an event that describes something that happend on the frontend

// fetching all todos AKA lists
export const fetchLists = (token) => {
  return (dispatch) => {
    console.log("loading lists");
    console.log(token);
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
      .then(response => {
        if (response.error) {
          console.log('ERROR: failed to fetch list');
          return;
        }
        console.log(response);
        dispatch({ type: 'ADD_LISTS', lists: response })
      })
  }
}

// fetching all items from each todo
export const fetchTodoItems = (listId, token) => {
  return (dispatch) => {
    console.log("loading todo items " + listId);
    // dispatch({ type: 'LOAD_TODO_ITEMS' })
    fetch(`http://localhost:3001/api/v1/lists/${listId}`,
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
export const updateListCheckbox = (token) => {
  return (dispatch) => {
    console.log("loading is_complete lists")
    dispatch({ type: 'LOAD_IS_COMPLETE_CHECKBOX_LIST' })
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
        dispatch({ type: 'ADD_IS_COMPLETE_CHECKBOX_LIST', isComplete: isComplete })
      })
  }
}

// deleting an individual todo item
export const deleteTodoItem = (id, token) => {
  return (dispatch) => {
    console.log("load delete todo items")
    dispatch({ type: 'LOAD_DELETE_TODO_ITEM' })
    fetch(`http://localhost:3001/api/v1/items/${id}`,
      {
        method: "DELETE",
        headers:
        {
          "Authorization": "Bearer " + token
        }
      })
      .then(response => {
        return response.json()
      })
      .then(response => {
        console.log(response);
        dispatch({ type: 'DELETE_TODO_ITEM', todo: response })
      })
  }
}


// this is for updating an item/todo's checkbox 
export const updateItemCheckbox = (id, token, is_complete) => {
  return (dispatch) => {
    console.log("updating a checkbox for an item - " + is_complete);
    fetch(`http://localhost:3001/api/v1/items/${id}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        item: { is_complete: is_complete }
      })
    })
    .then(response => {
      return response.json()
    })
    .then(response => {
      dispatch({ type: "UPDATE_TODO_ITEM", todo: response })
    })
  }
}


export const fetchCurrentUser = (token) => {
  return (dispatch) => {
    console.log("loading current user")
    dispatch({ type: 'LOAD_GET_CURRENT_USER' })
    fetch('http://localhost:3001/api/v1/get_current_user',
      {
        headers:
        {
          "Authorization": "Bearer " + token
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
        // } else {
        //   dispatch.push("/userloginform")
        // }
      })
  }
}

// to be finished for the listform component - finish converting to redux
// listform to redux
export const fetchListForm = (listFormId, token) => {
  return (dispatch) => {
    console.log("loading list form")
    dispatch({ type: 'LOAD_LIST_FORM' })
    fetch(`http://localhost:3001/api/v1/lists/${listFormId}`,
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
        dispatch({ type: 'ADD_LIST_FORM', lists: lists })
      })
  }
}

// adding a item(todo) 
export const fetchTodoHandleSubmit = (id, name, token) => {
  return (dispatch) => {
    console.log("creating todo items");
    // dispatch({ type: 'LOAD_TODO_ITEM_SUBMIT' })
    fetch("http://localhost:3001/api/v1/items", {
      method: "POST",
      headers:
      {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        item: { 
          list_id: id, 
          name: name, 
          is_complete: false 
        }} 
      )
    }).then(response => {
        return response.json()
      }).then(item => {
        dispatch({ 
          type: 'ADD_TODO_ITEM_SUBMIT', 
          todo: item 
        });
      })
  }
}
