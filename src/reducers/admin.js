import * as Types from './../constants/ActionType'

var initialState = null;

const admin = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return action.token;
        default: return state;
    }
};

export default admin;