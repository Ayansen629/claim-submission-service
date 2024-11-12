// import { configureStore } from '@reduxjs/toolkit';
// import counterSlice from './slices/counter';

// export const store = configureStore({
//   reducer: {
//     counter: counterSlice,  // Correctly added here
//   },
// });

import {createStore} from 'redux';
const reducer=(state=0,action)=>{

  switch(action.type){
    case 'INCREMENT': 
      return state+1;
    case 'DECREMENT':
      return state-1;
    default:
      return state;
  }
}
export const store=createStore(reducer);