import Fetch from './Fetch';

export default id => {
  console.log(id);
  return Fetch.get(`/article/${ id }`);
};