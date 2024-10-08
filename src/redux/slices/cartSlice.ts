import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = { 
    count: number,
    id: string, 
    title : string, 
    price: number,
    imageUrl : string,
    type: string,
    size: number,
    
  };

interface cartSliceState{
  totalPrice: number,
  items: CartItem[]
}

const initialState: cartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      },
      minusItem(state, action: PayloadAction<string>) {
        const findItem = state.items.find((obj) => obj.id === action.payload);
        if (findItem) {
          if (findItem.count > 0) {
            findItem.count--;
          }
          if (findItem.count === 0) {
            
            state.items = state.items.filter((obj) => obj.id !== action.payload);
          }
        }
        
        
 // Обновление totalPrice после уменьшения количества или удаления
 state.totalPrice = state.items.reduce((sum, obj) => {
  return obj.price * obj.count + sum;
}, 0);
},

removeItem(state, action: PayloadAction<string>) {
state.items = state.items.filter((obj) => obj.id !== action.payload);

// Обновление totalPrice после удаления элемента
state.totalPrice = state.items.reduce((sum, obj) => {
  return obj.price * obj.count + sum;
}, 0);
},

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState ) => state.cart
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id)

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
