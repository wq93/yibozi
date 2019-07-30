import { createAction, handleAction } from 'redux-actions';
import { fetchNavigation } from '../api';

const setNavigationList= createAction('SET_NAVIGATION_LIST');

export default handleAction(
  setNavigationList,
  (state, { payload }) => {
    return [ ...payload ];
  },
  []
);

export const fetchNavigationList = () => {
  return async dispatch => {
    try {
      const data = await fetchNavigation();
      dispatch(setNavigationList(data.data.list));
    } catch (error) {
      console.warn(error);
    }
  };
};