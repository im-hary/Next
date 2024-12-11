import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    increaseCartQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; 
      }
    },
    decreaseCartQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1; 
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    addToCart: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload._id);
      if (index >= 0) {
        state.items[index].quantity += 1;
      } else {
        state.items.push({ ...action.payload, id: action.payload._id, quantity: 1 }); 
      }
    },
    
    removeCart: (state, action) => {
      console.log('Before removal:', state.items);
      console.log('Payload:', action.payload);
      state.items = state.items.filter(item => item.id !== action.payload.id);
      console.log('After removal:', state.items);
    },
    
  },
});

export const { increaseCartQuantity, decreaseCartQuantity, clearCart, addToCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
