import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart, DiscountCode, Price } from '@commercetools/platform-sdk';
import type { RootState } from '../../store';
import { createCart } from '../../asyncThunks/createCart';
import { updateCart } from '../../asyncThunks/updateCart';
import { deleteCart } from '../../asyncThunks/deleteCart';
import { fetchDiscountCodes } from '../../asyncThunks/fetchDiscountCodes';

type CartState = {
  cart: Cart | null;
  status: 'loading' | 'idle' | 'error';
  subtotalPrice: number;
  totalPrice: number;
  error: string | undefined;
  isLimit: boolean;
  activeLineItem: string;
  discountCodes: DiscountCode[];
};

const initialState: CartState = {
  cart: null,
  status: 'idle',
  subtotalPrice: 0,
  totalPrice: 0,
  error: undefined,
  isLimit: false,
  activeLineItem: '',
  discountCodes: []
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setActiveCartItem: (state, action: PayloadAction<string>) => {
      state.activeLineItem = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCart.fulfilled, (state, action) => {
        const { payload: cart } = action;

        state.cart = cart;
        state.totalPrice = cart.totalPrice.centAmount / 100;
        state.subtotalPrice = cart.lineItems.reduce((acc, item) => {
          const {
            variant: { prices },
            quantity,
          } = item;

          const [generalPrice] = prices as Price[];
          const originalPrice = generalPrice.value.centAmount;
          const discountedPrice = generalPrice.discounted?.value.centAmount;
          const priceInDollars = (discountedPrice || originalPrice) / 100;
          return acc + priceInDollars * quantity
        }, 0);
        state.status = 'idle';
        state.error = undefined;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(updateCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const { payload: cart } = action;

        state.cart = cart;
        if (cart) {
          state.totalPrice = cart.totalPrice.centAmount / 100;
          state.subtotalPrice = cart.lineItems.reduce((acc, item) => {
            const {
              variant: { prices },
              quantity,
            } = item;

            const [generalPrice] = prices as Price[];
            const originalPrice = generalPrice.value.centAmount;
            const discountedPrice = generalPrice.discounted?.value.centAmount;
            const priceInDollars = (discountedPrice || originalPrice) / 100;
            return acc + priceInDollars * quantity
          }, 0);
        }
        state.status = 'idle';
        state.error = undefined;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(deleteCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.cart = null;
        state.totalPrice = 0;
        state.subtotalPrice = 0;
        state.status = 'idle';
        state.error = undefined;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(fetchDiscountCodes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDiscountCodes.fulfilled, (state, action) => {
        const { payload: discounts } = action;
        state.discountCodes = discounts
        state.status = 'idle';
        state.error = undefined;
      })
      .addCase(fetchDiscountCodes.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
  },
});

export default cartSlice.reducer;
export const { setActiveCartItem } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cartSlice.cart;
export const selectTotalPrice = (state: RootState) => state.cartSlice.totalPrice;
export const selectSubtotalPrice = (state: RootState) => state.cartSlice.subtotalPrice;
export const selectLineItems = (state: RootState) => state.cartSlice.cart?.lineItems;
export const selectAcativeLineItem = (state: RootState) => state.cartSlice.activeLineItem;
export const selectIsItemInCart = (state: RootState, id: string) => {
  return state.cartSlice.cart?.lineItems.some(({ productId }) => productId === id)
};
export const selectCartItem = (state: RootState, id: string) => {
  return state.cartSlice.cart?.lineItems.find(({ productId }) => productId === id)
};
export const selectDiscounts = (state: RootState) => state.cartSlice.discountCodes;
export const selectError = (state: RootState) => state.cartSlice.error;
