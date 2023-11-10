import { createReducer } from "@reduxjs/toolkit";


const initialState = { cartItems: [], subTotal: 0, shipping: 0, tax: 0, total: 0 };

export const cartReducer = createReducer(
    initialState, {

    addToCart: (state, action) => {
        const isItemExistInCart = state.cartItems.find((i) => i.id === action.payload.id);
        if (isItemExistInCart) {
            state.cartItems.forEach((i) => {
                if (i.id === action.payload.id) {
                    i.quantity += 1;
                }
            })
        } else {
            state.cartItems.push(action.payload)
        }
    },

    decrementFromCart: (state, action) => {
        const addedItem = state.cartItems.find((i) => i.id === action.payload);
        if (addedItem.quantity > 1) {
            state.cartItems.forEach((i) => {
                if (i.id === addedItem.id) i.quantity -= 1;
            })
        }
    },

    deleteFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter((i) => i.id !== action.payload)

    },

    calculateCartPrice: (state, action) => {
        let sum = 0;
        state.cartItems.forEach((i) => (sum += i.price * i.quantity));
        state.subTotal = sum;
        state.shipping = state.subTotal > 1000 ? 0 : 250;
        state.tax = +(state.subTotal * 0.18).toFixed();
        state.total = state.subTotal + state.shipping + state.tax;
    }

})