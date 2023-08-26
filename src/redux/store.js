import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";

import  blockchainReducer  from "./blockchain/blockchainReducer";
import storeReducer from "./store/reducers/storeReducer";
import productReducers from "./store/reducers/productReducers";
import orderReducer from "./store/reducers/orderReducer";
import categoryReducer from "./store/reducers/categoryReducer";
import cartReducers from "./store/reducers/cartReducers";
import adminOrdersReducer from "./store/reducers/adminOrdersReducer";
import userReducer from "./store/reducers/userReducer";
import tokenPriceReducer from "./store/reducers/tokenPriceReducer";
import subCategoryReducer from "./store/reducers/subCategoryReducer";


const rootReducer = combineReducers({
    blockchain: blockchainReducer,

    user: userReducer,
    store: storeReducer,
    product: productReducers,
    orders: orderReducer,
    category: categoryReducer,
    cart: cartReducers,
    adminOrders: adminOrdersReducer,
    tokenPrice: tokenPriceReducer,
    subcategory: subCategoryReducer
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers);
}

const store = configureStore();

export default store;