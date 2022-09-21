/* eslint-disable no-fallthrough */
import {
  GET_ALL_COUNTRIES,
  GET_BY_ID,
  GET_BY_NAME,
  SORT_COUNTRIES,
  SORT_BY_POPULATION,
  FILTER_BY_CONTINENT,
} from "./actions/actionsCountries";
import {
  GET_ALL_ACTIVITIES,
  CREATE_ACTIVITY,
  FILTER_BY_ACTIVITY,
} from "./actions/actionsActivities";
import { RESET_FILTERS } from "./actions/index";

const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  details: {},
  actFiltered: [],
  contFiltered: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    }
    case GET_BY_ID: {
      return {
        ...state,
        details: { ...action.payload },
      };
    }
    case GET_BY_NAME: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case SORT_COUNTRIES:
      let countriesOrdered = [...state.countries];
      countriesOrdered.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      if (action.payload === "Desendente") {
        countriesOrdered = countriesOrdered.reverse();
      }
      return {
        ...state,
        countries: [...countriesOrdered],
      };

    case SORT_BY_POPULATION:
      let countriesByPopulation = [...state.countries];
      countriesByPopulation.sort((a, b) => {
        if (a.pupulation > b.population) {
          return action.payload === "mayor" ? 1 : -1;
        }
        if (a.population < b.population) {
          return action.payload === "menor" ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        countries: countriesByPopulation,
      };
    case FILTER_BY_CONTINENT:
      let arrayFilter = [];
      const allCountries = action.payload[1]
        ? [...state.actFiltered]
        : [...state.allCountries];
      for (let i = 0; i < allCountries.length; i++) {
        if (allCountries[i].hasOwnProperty("continent")) {
          if (allCountries[i].continent === action.payload[0]) {
            arrayFilter.push(allCountries[i]);
          }
        }
      }
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case CREATE_ACTIVITY:
      return {
        ...state,
      };

    case FILTER_BY_ACTIVITY:
      const activityFiltered = [];
      const aux = action.payload[1]
        ? [...state.contFiltered]
        : [...state.allCountries];
      aux.forEach((country) => {
        country.activities.forEach((act) => {
          if (act.name === action.payload[0]) {
            activityFiltered.push(country);
          }
        });
      });
      return {
        ...state,
        countries:
          action.payload[0] === "All" ? [...aux] : [...activityFiltered],
        actFiltered: [...activityFiltered],
      };
    case RESET_FILTERS:
      return {
        ...state,
        countries: [...state.allCountries],
        actFiltered: [...state.allCountries],
        contFiltered: [...state.allCountries],
      };
    default:
      return state;
  }
}
