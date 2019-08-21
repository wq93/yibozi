import Fetch from './Fetch';

export default (url, params) => {
  return Fetch.get(url, params);
};