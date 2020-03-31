import createReducer from "../../../utils/createReducer";

export const schema = {
  id: "id",
  name: "comments"
};

export const actions = {};

// reducers
const reducer = createReducer(schema.name);

export default reducer;

// selectors
export const getComments = state => state.entities.comments;
