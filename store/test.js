import { createAction, handleAction } from 'redux-actions';

const setTest = createAction('SET_TEST');

export default handleAction(
  setTest,
  (state, { payload }) => {
    return [ ...payload ];
  },
  ['wangqi', 'wangfang', 'wangyibo']
);