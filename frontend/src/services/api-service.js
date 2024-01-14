import request from './base-api-service.js';

const ApiService = {
  signUp(data) {
    return request({
      method: 'POST',
      url: '/api/v1/signup',
      data,
    });
  },
  login(values) {
    return request({
      method: 'POST',
      url: '/api/v1/login',
      data: values,
    });
  },
  getChatData() {
    return request({
      method: 'GET',
      url: '/api/v1/data',
    });
  },
};

export default ApiService;
