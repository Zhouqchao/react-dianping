import createReducer from "../../../utils/createReducer";

export const schema = {
  id: "id",
  name: "comments"
};

// actions
const types = {
  GET_COMMENTS_REQEUST: "COMMENTS/GET_COMMENTS_REQEUST",
  GET_COMMENTS_SUCCESS: "COMMENTS/GET_COMMENTS_SUCCESS",
  GET_COMMENTS_FAILURE: "COMMENTS/GET_COMMENTS_FAILURE"
};

export const actions = {};

// reducers
const reducer = createReducer(schema.name);

export default reducer;

// selectors
export const getComments = state => state.entities.comments;
