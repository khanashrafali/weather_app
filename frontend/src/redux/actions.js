// action types
export const ADD_SEARCH_HISTORY = "ADD_SEARCH_HISTORY";

// action creators
export const addSearchHistory = (userId, city) => ({
  type: ADD_SEARCH_HISTORY,
  payload: { userId, city },
});
