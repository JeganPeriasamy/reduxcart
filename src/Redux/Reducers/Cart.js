// Importing the slice from the toolkit
import { createSlice } from "@reduxjs/toolkit";

// Create Slice for the - Respective Task ( CART), 
const CartSlice = createSlice({
  // THIS ARE VALUES GOING TO BE IN STATE 
  name: "Cart",
  initialState: {
    items: [],
    subTotal: 0,
    total: 0,
  },
  reducers: {
    // To Save all the Products 
    saveAllProducts: (state, action) => {
      return { ...state, items: action.payload };
    },
    // To store the value with respective change
    quantityChange: (state, action) => {
      return {
        ...state,
        items: state.items.map((item) => {    // FOR ITEMS NOT EQUAL TO ID - Returning the items
          if (item.id !== action.payload.id) {
            return item;
          }

          return {
            ...item, // here we are copying thr item
            quantity: action.payload.value, // For items equal to it - returning the items with the quantity given 
          }; 
        }),
      };
    },
    updateSubTotal: (state, action) => {
      return {
        ...state,
        subTotal: action.payload,
      };
    },
    updateTotal: (state, action) => {
      return {
        ...state,
        total: action.payload,
      };
    },
    // quantityChange: (state, action) => {
    //   console.log(state.items);
    //   const itemsCopy = [...state.items];
    //   const matchingItem = itemsCopy.find(
    //     (data) => data.id == action.payload.id
    //   );
    //   matchingItem.quantity = action.payload.value;
    //   return { ...state, items: itemsCopy };
    // },
  },
});

// Exporting the Declared actions 
export const { saveAllProducts, quantityChange, updateSubTotal, updateTotal } =
  CartSlice.actions;
export default CartSlice.reducer;
