export default {
  getProductList: (path, page, pageSize) =>
    `/product_${path}?_page=${page}&_limit=${pageSize}`,
  getProductDetail: id => `/product_details/${id}`,
  getShop: id => `/shops/${id}`,
  getSearchKeywords: () => "/keywords"
};
