import { APPLYFOR_JOB } from "../actions/types";

const initialState = {
    jobapplication: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case APPLYFOR_JOB:
            console.log('It has come to the reducer');
            return {
                ...state,
                jobapplication: action.payload,
            } ;
        default:
            return state;
    }
    
}