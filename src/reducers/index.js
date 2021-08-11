import { combineReducers } from "redux";
import admin from "./admin";
import listCategory from './listCategory'
import product from './product'
import editProduct from './editProduct'

const appReducers = combineReducers({
    admin,
    listCategory,
    product,
    editProduct
});

export default appReducers;