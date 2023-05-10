import { ADD_SEARCH_HISTORY } from "./actions";
import { LOGOUT } from "./actions";
import { combineReducers } from "redux";

// initial state
const initialState = {
  searchHistory: {},
};

const initialLogoutState = {
  isLoggedOut: true,
};

// reducers
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SEARCH_HISTORY:
      const { userId, city } = action.payload;
      const searchHistory = { ...state.searchHistory };
      const cities = searchHistory[userId] || [];
      if (cities.includes(city)) {
        return state; // city already exists, return current state
      }
      searchHistory[userId] = [...cities, city];
      console.log("reducers==>", {
        ...state,
        searchHistory,
      });
      return {
        ...state,
        searchHistory,
      };
    default:
      return state;
  }
};

const logoutReducer = (state = initialLogoutState, action) => {
  switch (action.type) {
    case LOGOUT:
      const { isLoggedOut } = action.payload;
      return isLoggedOut;
    default:
      return state.isLoggedOut;
  }
};

export default rootReducer;
// export default combineReducers({ searchReducer, logoutReducer });
