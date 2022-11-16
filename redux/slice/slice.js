import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'slice',
  initialState: {
    total: 0,
    newTotal: 0,
    food: [],
    qty: 0,
    couponList: [
      {
        id: 1,
        name: '10onus',
        discountedPercentage: 10,
      },
      {
        id: 2,
        name: '20onus',
        discountedPercentage: 20,
      },
      {
        id: 3,
        name: '30onus',
        discountedPercentage: 30,
      },
      {
        id: 4,
        name: '40onus',
        discountedPercentage: 40,
      },
      {
        id: 5,
        name: '50onus',
        discountedPercentage: 50,
      },
    ],
    couponName: '',
    discount: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.food.find(
        (item) => item.foodId === newItem.foodId
      );

      if (existingItem) {
        if (existingItem.quantity < 5) {
          existingItem.quantity++;
          existingItem.totalPrice += newItem.price;
          state.total += newItem.price;
          state.newTotal += newItem.price;

          state.qty++;
        }
      } else {
        state.food.push({
          foodId: newItem.foodId,
          name: newItem.name,
          price: newItem.price,
          img: newItem.img,
          quantity: 1,
          totalPrice: newItem.price,
          deliveryCharge: 15,
        });
        state.total += newItem.price;
        state.newTotal += newItem.price;

        state.qty++;
      }
    },
    reset(state) {
      state.food = [];
      state.total = 0;
      state.qty = 0;
      state.newTotal = 0;
      state.discount = 0;
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.food.find((item) => item.foodId === id);
      if (existingItem.quantity === 1) {
        state.food = state.food.filter((item) => item.foodId !== id);
        state.total -= existingItem.price;
        state.newTotal -= existingItem.price;

        state.qty--;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        existingItem.totalPrice -= existingItem.price;
        state.total -= existingItem.price;
        state.newTotal -= existingItem.price;

        state.qty--;
      }
    },
    addCoupon(state, action) {
      const coupon = action.payload;
      state.couponName = coupon;
      const found = state.couponList.find(
        (item) => item.name === coupon.toLowerCase()
      );
      console.log('FOUND', found);
      state.discount = Math.round(
        (state.total / 100) * found.discountedPercentage
      );
      state.newTotal -= Math.round(
        (state.total / 100) * found.discountedPercentage
      );
    },

    removeCoupon(state, action) {
      state.couponData = '';
      state.newTotal = state.total;
    },
  },
});

export const sliceAction = slice.actions;
export default slice.reducer;
