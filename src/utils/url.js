export default {
  login: () => "/login",
  getProductList: (path, page, pageSize) =>
    `/product_${path}?_page=${page}&_limit=${pageSize}`,
  getProductDetail: id => `/product_details/${id}`,
  getShop: id => `/shops/${id}`,
  getSearchKeywords: () => "/keywords",
  getSearchedShops: keyword => `/searched_shops?keyword=${keyword}`,
  getOrders: () => "/orders?_sort=id&order=desc",
  addOrder: id => "/orders",
  deleteOrder: id => `/orders/${id}`,
  addComment: () => "/comments",
  patchOrder: id => `/orders/${id}`
};
