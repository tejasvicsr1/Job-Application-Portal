import { GET_EMPLOYERPROFILE } from "../actions/types";

const initialState = {
    employerprofile: [],
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_EMPLOYERPROFILE:
            console.log("It came here", state);
            return {
                ...state,
                employerprofile: action.payload
            };
        default:
            return state
    }
}