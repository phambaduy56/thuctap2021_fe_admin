import * as Types from './../constants/ActionType'

var initialState = []

const listCategory = (state=initialState, action) => {
    switch(action.type) {
        case Types.LIST_CATEGORY:  
            return action.category

        case Types.ADD_CATEGORY:
            console.log(action.category)
            return action.category

        default: return state
    }
}

export default listCategory;