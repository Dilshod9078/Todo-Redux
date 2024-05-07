import { CREATE, DELETE, UPDATE } from "./type"

const instialState = {
    todo: []
}

export const reducer = (state = instialState, action) => {
   switch(action.type){
   case CREATE : return {
    todo:[...state.todo, action.payload]
   }
   case DELETE: {
    const deleteID = state.todo.findIndex(item => item.id == action.id);
   state.todo.splice(deleteID, 1)
    return {
        todo:[...state.todo]
    }
}
case UPDATE : {
    const updatedState = state.todo.map(item => {
      if (item.id === action.payload.id) {
        return { ...item, ...action.payload.updateData }
      }
      return item
    })
    return {
        ...state,
        todo:updatedState
    }
  }
  
    default : return state
   }
}