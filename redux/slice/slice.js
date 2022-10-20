import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'slice',
  initialState: { total: 0, food: [] },
  reducers: {
    addToCart(state, action) {
      console.log('payload', action.payload.total);
      state.total = action.payload.total;
      const price = action.payload.price;
      state.total += price;
    },
    removeFromCart(state, action) {
      const price = action.payload.props.price;
      const quantity = action.payload.props.quantity;
      console.log('REDUX', price, quantity);
      state.total -= price;
    },
  },
});

export const sliceAction = slice.actions;
export default slice.reducer;
