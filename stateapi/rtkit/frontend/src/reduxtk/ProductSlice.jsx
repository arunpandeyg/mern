import  { createAsyncThunk, createSlice } from "@reduxjs/toolkit"



export const fetchProducts = createAsyncThunk ('products', async () => {
    const response = await fetch (
        'https://dummyjson.com/products'
    );    
    const data = await response.json();
   
    return data.products;
} )

const initialState = {
    products: [],
    status: undefined,
    error: null,
};

const productSlice = createSlice ({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export default productSlice.reducer;
