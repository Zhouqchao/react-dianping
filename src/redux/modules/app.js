// state
const initialState = {
  error: null
};

// actions
export const types = {
  CLEAR_ERROR: "APP/CLEAR_ERROR"
};

export const actions = {
  clearError: () => ({ type: types.CLEAR_ERROR })
};

// reducers
const reducer = (state = initialState, action) => {
  const { type, error } = action;
  if (type === types.CLEAR_ERROR) {
    return { ...state, error: null };
  } else if (error) {
    return { ...state, error };
  }

  return state;
};

export default reducer;

// selectors
export const getError = state => state.app.error;
