import BaseApiService from './base-api-service.js';

class _ApiService extends BaseApiService {
  signUp(data) {
    return this.request({
      method: 'POST',
      url: '/api/v1/signup',
      data,
    });
  }

  login(values) {
    return this.request({
      method: 'POST',
      url: '/api/v1/login',
      data: values,
    });
  }

  getChatData() {
    return this.request({
      method: 'GET',
      url: '/api/v1/data',
    });
  }
}

const ApiService = new _ApiService();

export default ApiService;
