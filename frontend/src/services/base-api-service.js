import axios from 'axios';

const defaultHeaderConfig = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export default (config) => {
  const newConfig = config.headers
    ? { ...config, headers: { ...config.headers, ...defaultHeaderConfig() } }
    : { ...config, headers: { ...defaultHeaderConfig() } };

  return axios(newConfig).then((result) => result).catch((error) => Promise.reject(error));
};
