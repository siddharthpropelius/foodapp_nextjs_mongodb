import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'slice',
  initialState: { total: 0, food: [], total: 0, qty: 0 },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.food.find((item) => item.id === newItem.id);
      if (existingItem) {
        if (existingItem.quantity < 5) {
          existingItem.quantity++;
          existingItem.totalPrice += newItem.price;
          state.total += newItem.price;
          state.qty++;
        }
      } else {
        state.food.push({
          id: newItem.id,
          user: newItem.user,
          name: newItem.name,
          price: newItem.price,
          img: newItem.img,
          quantity: 1,
          totalPrice: newItem.price,
          des: newItem.des,
          deliveryCharge: 15,
        });
        state.total += newItem.price;
        state.qty++;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.food.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.food = state.food.filter((item) => item.id !== id);
        state.total -= existingItem.price;
        state.qty--;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        existingItem.totalPrice -= existingItem.price;
        state.total -= existingItem.price;
        state.qty--;
      }
    },
  },
});

export const sliceAction = slice.actions;
export default slice.reducer;
