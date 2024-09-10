import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';



type Pizza = {

  id: string, 
  title: string, 
  price: number, 
  imageUrl: string, 
  sizes: number[], 
  types: number[]
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",

}

interface PizzaSliceState{
  items: Pizza[],
  status: Status

}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING
};


export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async(params) => {
    const {sortBy,order,category,search,currentPage} = params 
    const {data} = await axios.get<Pizza[]>(
      `https://65d63e23f6967ba8e3bdc5bc.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`)

      return data
  }
)


const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
       .addCase(fetchPizzas.pending, (state) => {
          state.status = Status.LOADING
          state.items = []
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
          state.status = Status.SUCCESS
          state.items = action.payload
          
       })
       .addCase(fetchPizzas.rejected, (state) => {
          state.status = Status.ERROR
          state.items = []
       })
 }
});

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
