import axios from "axios";
import { APPLYFOR_JOB } from "./types";

export const applyForJob = (id) => (dispatch) => {
  console.log("Applying for a job");
  axios.post("/api/jobapplications/", id).then(
    (res) => {
      console.log("111");
      console.log(res.data.jobid);
      dispatch({
        type: APPLYFOR_JOB,
        payload: res.data,
      });
    }
    // console.log("what the fuck?")
  )
  .catch(err => console.log(err.response.data));
  //   return {
  //     type: ADD_JOBLISTINGS,
  //     payload: item,
  //   };
};
