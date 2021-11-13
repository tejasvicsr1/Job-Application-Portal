import axios from "axios";
import { GET_EMPLOYERPROFILE } from "./types";

// export const getEmployerProfile = (id) => (dispatch) => {
//     axios.post("api/profiles/getemployerprofile", id)
//     .then((res) => {
//         console.log("Axios chal raha hai.")
//         dispatch({
//             type: GET_EMPLOYERPROFILE,
//             payload: res.data,
//         })
//     });
// };

export const getEmployerProfile = (id) => (dispatch) => {
    console.log("Axios chal raha hai");
    axios.post("/api/profiles/getemployerprofile", id).then(
      (res) => {
        console.log(id, "THIS IS THE ONE");
        dispatch({
          type: GET_EMPLOYERPROFILE,
          payload: res.data,
        })
      }
        
      // console.log("what the fuck?")
    );
    //   return {
    //     type: ADD_JOBLISTINGS,
    //     payload: item,
    //   };
  };