import { all, call } from 'redux-saga/effects';
import axios from 'axios';

import todoHistory from './todoHistory';
import user from './user';
import timer from './timer';

// axios.defaults.baseURL = `http://15.164.163.120:8085/api`;
// axios.defaults.baseURL = `http://api.mygraphr.com:8085/api`;
axios.defaults.baseURL = `http://localhost:8085/api`;

function* rootSaga() {
  yield all([call(todoHistory), call(user), call(timer)]);
}

export default rootSaga;
