import createReducer from "../../../utils/createReducer";
export const schema = {
  id: "id",
  name: "shops"
};

const reducer = createReducer(schema.name);

export default reducer;

// selectors
export const getShopById = (state, id) => state.entities.shops[id];
