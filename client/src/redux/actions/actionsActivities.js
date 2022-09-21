import axios from "axios";

export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";

export const getAllActivities = () => {
  return async function (dispatch) {
    const res = await axios.get("http://localhost:3001/activities");
    return dispatch({
      type: GET_ALL_ACTIVITIES,
      payload: res.data,
    });
  };
};

export const createActivity = (payload) => {
  return async function (dispatch) {
    await axios.post("http://localhost:3001/", payload);
    return dispatch({ type: CREATE_ACTIVITY, payload });
  };
};

export const filterByActivity = (payload) => {
  return {
    type: FILTER_BY_ACTIVITY,
    payload,
  };
};
