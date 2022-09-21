import axios from "axios";
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_BY_ID = "GET_BY_ID";
export const GET_BY_NAME = "GET_BY_NAME";
export const SORT_COUNTRIES = "SORT_COUNTRIES";
export const SORT_BY_POPULATION = "SORT_BY_POPULATION";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";

export const getAllCountries = () => {
  return async (dispatch) => {
    let pedidoApi = await axios.get("http://localhost:3001/countries/all");
    dispatch({ type: GET_ALL_COUNTRIES, payload: pedidoApi.data });
  };
};

export const getById = (idL) => {
  return async function (dispatch) {
    const res = await axios.get(`http://localhost:3001/countries/${idL}`);
    return dispatch({ type: GET_BY_ID, payload: res.data });
  };
};

export const getByName = (name) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      dispatch({ type: GET_BY_NAME, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sortCountries = (payload) => {
  return {
    type: SORT_COUNTRIES,
    payload,
  };
};

export const sortByPopulations = (payload) => {
  return {
    type: SORT_BY_POPULATION,
    payload,
  };
};

export const filterByContinent = (payload) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
};

