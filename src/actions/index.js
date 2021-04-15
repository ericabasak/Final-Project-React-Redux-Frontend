// to update state, create an action (object with a key type)
// and pass the action as an arguement to the reducer(the switch/case statement)
// and that is how you change state

// actions are plain javascript objects that have a type field
// think of an action as an event that describes something that happend on the frontend

// async action creators

// fetching all todos AKA lists
export const getLists = (token) => {
  return (dispatch) => {
    console.log("loading lists");
    dispatch({ type: 'LOAD_LISTS' })
    fetch('http://localhost:3001/api/v1/lists', {
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
export const getTodoItems = (listId, token) => {
  return (dispatch) => {
    console.log("loading todo items " + listId);
    console.log(token);
    // dispatch({ type: 'LOAD_TODO_ITEMS' })
    fetch(`http://localhost:3001/api/v1/lists/${listId}`, {
      headers:
      {
        "Authorization": "Bearer " + token
      }
      })
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response.error) {
          return;
        }
        dispatch({ type: 'ADD_TODO_ITEMS', todoItems: response })
      })
  }
}


// WWHEN DO YOU USE DISPATCH AND WHEN NOT?????????? line 64
// is_complete update for lists
export const updateListStatus = (listId, isComplete) => {
  console.log("this checkbox for the list is getting updated!!!!")
  return (dispatch) => {
    fetch(`http://localhost:3001/api/v1/lists/${listId}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: listId,
        is_complete: isComplete
      })
    })
    .then(response => {
      return response.json()
    })
    .then(response => {
      dispatch({ type: 'UPDATE_LIST_STATUS', list: response })
    })
  }
}



// deleting an individual todo item
export const deleteTodoItem = (id, token) => {
  return (dispatch) => {
    console.log("load delete todo items")
    // dispatch({ type: 'LOAD_DELETE_TODO_ITEM' })
    fetch(`http://localhost:3001/api/v1/items/${id}`,{
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
        dispatch({ type: 'DELETE_TODO_ITEM', todo: response })
      })
  }
}


// this is for updating an item/todo's checkbox 
export const updateItemCheckbox = (id, token, isComplete) => {
  return (dispatch) => {
    console.log("updating a checkbox for an item - " + isComplete);
    fetch(`http://localhost:3001/api/v1/items/${id}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token 
      },
      body: JSON.stringify({
        item: { is_complete: isComplete }
      })
    })
    .then(response => {
      return response.json()
    })
    .then(response => {
      dispatch({ type: 'UPDATE_TODO_ITEM', todo: response })
    })
  }
}


export const getCurrentUser = (token) => {
  return (dispatch) => {
    console.log("loading current user")
    dispatch({ type: 'LOAD_GET_CURRENT_USER' })
    fetch('http://localhost:3001/api/v1/get_current_user', {
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
      })
  }
}



// to be finished for the listform component - finish converting to redux
// listform to redux
export const getListForm = (listFormId, token) => {
  return (dispatch) => {
    console.log("loading list form")
    dispatch({ type: 'LOAD_LIST_FORM' })
    fetch(`http://localhost:3001/api/v1/lists/${listFormId}`, {
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
export const addTodoItemToList = (id, name, token) => {
  console.log("2")
  // returns a function with an argument of dispatch
  return (dispatch) => {
    console.log("3")
    console.log("creating todo items");
    // calls dispatch, which passes in an object - not a function
    // dispatch({ type: 'LOAD_TODO_ITEM_SUBMIT' }) synchronous function
    // fetch returns a promise
    // fetch is asynchronous
    fetch('http://localhost:3001/api/v1/items', {
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
      // then is asynchronous
      // asynchronous callback
      // then returns a promise and attaches a callback that parses a response object
      // that we get back as json()
      // have to wait to go into call stack
      }).then(response => {
        console.log("4")
        return response.json()
        // then is asynchronous
        // asynchronous callback
        // then returns another promise, attaches a callback and moves on.
        // has to wait to go into call stack
      }).then(item => {
        console.log("5")
        const obj = { 
          type: 'ADD_TODO_ITEM_SUBMIT', 
          todo: item 
        };
        dispatch(obj);
      })
      console.log("6")
  }
  console.log("8")
}

// this is for when a list is created in the listform component
export const addAList = (title, token) => {
  console.log('b')
  return (dispatch) => {
    console.log('c')
    console.log("this is creating a new list");
    fetch('http://localhost:3001/api/v1/lists', {
      method: "POST",
      headers:
      {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title
      })
    }).then(response => {
      return response.json()
    }).then(response => {
      console.log(response);
      console.log('d')
      dispatch({ type: 'ADD_A_LIST', list: response})
    })
    console.log('e')
  }
  console.log('f')
}