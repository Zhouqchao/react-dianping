import axios from "axios";

// create axios instance
const ajax = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

// request interceptor
ajax.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

// response interceptor
ajax.interceptors.response.use(
  response => handleResponse(response),
  err => Promise.reject(err)
);

const handleResponse = response => {
  const SUCCESS_CODES = [200, 201, 206];
  if (SUCCESS_CODES.includes(response.status)) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject({
      error: { message: "Request failed due to server error" }
    });
  }
};

// http methods
export const get = (url, params) => ajax.get(url, params);
export const post = (url, data) => ajax.post(url, data);
export const put = (url, data) => ajax.put(url, data);
export const patch = (url, data) => ajax.patch(url, data);
export const remove = url => ajax.delete(url);
