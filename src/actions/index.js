import * as Types from './../constants/ActionType';


export const actLogin = (token) => {
    return {
        type: Types.LOGIN,
        token,
    }
}

export const listCategory = (category) => {
    return {
        type: Types.LIST_CATEGORY,
        category
    }
}

export const addCategory = (category, value) => {
    return {
        type: Types.ADD_CATEGORY,
        category,
        value,
    }
}

export const SearchCategory = (value) => {
    return {
        type: Types.SEARCH_CATEGORY,
        value,
    }
}
// ACTION PRODUCT

export const listProduct = (product) => {
    return {
        type: Types.LIST_PRODUCT,
        product,
    }
}

export const editProduct = (id) => {
    return {
        type: Types.EDIT_PRODUCT,
        id
    }
}

export const deleteProduct = (id) => {
    return {
        type: Types.DELETE_PRODUCT,
        id,
    }
} 