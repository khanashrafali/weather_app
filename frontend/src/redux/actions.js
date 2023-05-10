// action types
export const ADD_SEARCH_HISTORY = "ADD_SEARCH_HISTORY";
export const LOGOUT = "LOGOUT";

// action creators
export const addSearchHistory = (userId, city) => ({
  type: ADD_SEARCH_HISTORY,
  payload: { userId, city },
});

export const logout = (isLoggedOut) => ({
  type: LOGOUT,
  payload: { isLoggedOut },
});
