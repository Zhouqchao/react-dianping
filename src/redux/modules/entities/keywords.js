import createReducer from "../../../utils/createReducer";

export const schema = {
  id: "id",
  name: "keywords"
};

const reducer = createReducer(schema.name);

export default reducer;
