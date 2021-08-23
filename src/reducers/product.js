import { scryRenderedDOMComponentsWithClass } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as Types from './../constants/ActionType'


var initialState = []

var findIndex = (product,id) => {
    var result = -1;
    product.forEach((product, index) => {
        if(product.id === id){
            result = index;
        }
    })

    return result;
}

const product = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {

        case Types.LIST_PRODUCT:
            return action.product

        case Types.DELETE_PRODUCT:
            index = findIndex(state, action.id);
            state.splice(index, 1);
            return [...state];
        default: return state
    }
}

export default product;