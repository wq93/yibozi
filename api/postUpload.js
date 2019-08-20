import Fetch from './Fetch';

export default params => {
  return Fetch.post('/image/upload', params);
};