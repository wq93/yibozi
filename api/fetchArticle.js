import Fetch from './Fetch';

export default id => {
  return Fetch.get(`/article/${ id }`);
};