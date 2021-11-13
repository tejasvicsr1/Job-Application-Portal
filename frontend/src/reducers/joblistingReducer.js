import { GET_JOBLISTINGS, ADD_JOBLISTINGS, DELETE_JOBLISTING, GET_MYJOBLISTING } from '../actions/types';
const initialState = {
    // joblistings: [
    //     { id: uuid(), title: "SDE" },
    //     { id: uuid(), title: "SDE-5" },
    //     { id: uuid(), title: "SDE-4" },
    //     { id: uuid(), title: "SDE-3" },
    //     { id: uuid(), title: "SDE-2" },
    //   ],
    joblistings: [],
    myjoblistings: [],
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_JOBLISTINGS:
            console.log("reducer", state);
            return {
                ...state,
                joblistings: action.payload
            };
        case DELETE_JOBLISTING:
            return {
                ...state,
                joblistings: state.joblistings.filter(joblisting => joblisting.id !== action.payload)
            };
        case ADD_JOBLISTINGS:
            return {
                ...state,
                joblistings: action.payload
            }
        case GET_MYJOBLISTING:
            return {
                ...state,
                myjoblistings: action.payload
            }
        default:
            return state;
    }
}