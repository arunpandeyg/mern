import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

const addToCart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      const cartData = state.items.filter((item) => item.id !== action.payload.id);
      state.items = cartData;
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearAllItem: (state) => {
      state.items = [];
      
    },
  }
});
export const { addItem, removeItem, clearAllItem } = addToCart.actions;
export default addToCart.reducer;