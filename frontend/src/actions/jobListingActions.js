import { v1 as uuid } from "uuid";
import axios from "axios";
import { GET_JOBLISTINGS, ADD_JOBLISTINGS, DELETE_JOBLISTING, GET_MYJOBLISTING } from "./types";

export const getJoblistings = (id) => (dispatch) => {
  console.log("actions");
  //   return {
  //     type: GET_JOBLISTINGS,
  //   };
  axios.post("/api/joblistings", id).then((res) => {
    console.log("PAYLOAD RECEIVED", res.data)
    dispatch({
      type: GET_JOBLISTINGS,
      payload: res.data,
    })
  }
  );
};

export const deleteJoblisting = (id) => {
  return {
    type: DELETE_JOBLISTING,
    payload: id,
  };
};

export const addJoblistings = (joblisting) => (dispatch) => {
  console.log("Yahaan hoon main");
  axios.post("/api/joblistings/add", joblisting).then(
    (res) =>
      dispatch({
        type: ADD_JOBLISTINGS,
        payload: joblisting,
      })
    // console.log("what the fuck?")
  );
  //   return {
  //     type: ADD_JOBLISTINGS,
  //     payload: item,
  //   };
};

export const getMyJoblistings = (email) => (dispatch) => {
  console.log("My job listings");
  axios.post("/api/joblistings/Myjoblistings", email).then(
    (res) => {
      console.log(res.data)
    dispatch({
      type: GET_MYJOBLISTING,
      payload: res.data
    }) }
  );
}
