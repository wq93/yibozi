import { createAction, handleAction } from 'redux-actions';

const setTest = createAction('SET_TEST')

export default handleAction(
  setTest,
  (state, { payload }) => {
    return [ ...payload ];
  },
  [1,2,3]
);