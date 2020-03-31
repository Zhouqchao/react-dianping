export default {
  getProductList: (path, page, pageSize) =>
    `/product_${path}?_page=${page}&_limit=${pageSize}`
};
