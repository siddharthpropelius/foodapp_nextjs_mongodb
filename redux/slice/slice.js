import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'slice',
  initialState: { cart: [] },
  reducers: {
    addToCart(state, action) {
      const input = action.payload;
      const existingItem = state.cart.find((item) => item.id === input.id);

      if (existingItem) {
        if (existingItem.quantity < 5) {
          existingItem.quantity++;
          existingItem.total = existingItem.price * existingItem.quantity;
        }
      } else {
        state.cart.push({
          id: input.id,
          name: input.name,
          price: input.price,
          img: input.img,
          quantity: 1,
          total: input.price,
        });
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
      state.totalItem--;
    },
  },
});

export const sliceAction = slice.actions;
export default slice.reducer;
