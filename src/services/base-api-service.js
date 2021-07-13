/* eslint-disable functional/no-this-expression, functional/no-class, class-methods-use-this */
import axios from 'axios';

const defaultHeaderConfig = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export default class BaseApiService {
  request(config) {
    const newConfig = config.headers
      ? { ...config, headers: { ...config.headers, ...defaultHeaderConfig() } }
      : { ...config, headers: { ...defaultHeaderConfig() } };

    return axios(newConfig).then((result) => result).catch((error) => Promise.reject(error));
  }
}
