import {combineReducers} from 'redux';
import test from './test';
import navigation from './navigation';

export default combineReducers({
  testList: test,
  navigation: navigation,
});