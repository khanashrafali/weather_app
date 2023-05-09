import { ADD_SEARCH_HISTORY } from "./actions";

// initial state
const initialState = {
  searchHistory: {},
};

// reducers
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SEARCH_HISTORY:
      const { userId, city } = action.payload;
      const searchHistory = { ...state.searchHistory };
      searchHistory[userId] = [...(searchHistory[userId] || []), city];
      return {
        ...state,
        searchHistory,
      };
    default:
      return state;
  }
};

export default rootReducer;
