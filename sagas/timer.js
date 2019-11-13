import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
  START_TIMER_SUCCESS,
  START_TIMER_FAILURE,
  START_TIMER_REQUEST,
} from '../reducers/timer';

function startTimerAPI(todoTimerData) {
  return axios.get(`/todo`, todoTimerData, {
    withCredentials: true,
  });
}

function* startTimer(action) {
  try {
    const result = yield call(startTimerAPI, action.payload);
    yield put({
      type: START_TIMER_SUCCESS,
      data: result.data.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: START_TIMER_FAILURE,
      error: e,
    });
  }
}

function* watchStartTimer() {
  yield takeLatest(START_TIMER_REQUEST, startTimer);
}

function* todoHistorySaga() {
  yield all([fork(watchStartTimer)]);
}

export default todoHistorySaga;
