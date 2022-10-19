import { configureStore } from '@reduxjs/toolkit';
import slice from '../slice/slice';

const store = configureStore({
  reducer: { slice },
});

export default store;
