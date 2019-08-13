import Fetch from './Fetch';

export default (id, params) => {
  return Fetch.put(`/article/${ id }`, params);
};