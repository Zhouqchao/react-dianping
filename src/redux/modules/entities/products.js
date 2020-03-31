import createReducer from "../../../utils/createReducer";

export const schema = {
  id: "id",
  name: "products"
};

const reducer = createReducer(schema.name);

export default reducer;

// selectors
export const getProductDetail = (state, id) => {
  const product = state.entities.products[id];
  return product && product.detail && product.purchaseNotes ? product : null;
};
