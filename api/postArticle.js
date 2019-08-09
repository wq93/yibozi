import Fetch from './Fetch';

export default params => {
  return Fetch.post('/article', params);
};