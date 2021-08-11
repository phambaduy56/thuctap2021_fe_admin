import * as Types from './../constants/ActionType'


var initialState = '';

const editProduct = (state = initialState, action) => {
    switch (action.type) {

        case Types.EDIT_PRODUCT:
            return action.id

        default: return state
    }
}

export default editProduct;