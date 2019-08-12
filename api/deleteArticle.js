import Fetch from './Fetch';

export default id => {
  return Fetch.delete(`/article/${ id }`);
};