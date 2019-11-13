export const START_TIMER = 'START_TIMER';
export const START_TIMER_REQUEST = 'START_TIMER_REQUEST';
export const START_TIMER_SUCCESS = 'START_TIMER_SUCCESS';
export const START_TIMER_FAILURE = 'START_TIMER_FAILURE';

export const STOP_TIMER = 'STOP_TIMER';
export const PAUSE_TIMER = 'PAUSE_TIMER';
export const RESET_TIMER = 'RESET_TIMER';
export const SET_TIMER = 'SET_TIMER';
export const ADD_SECOND = 'ADD_SECOND';

const DEFAULT_TIME = 25 * 60;
const initialState = {
  totalTime: DEFAULT_TIME,
  elapsedTime: 0,
  isStarted: false,
  isRunning: false,
  startError: '',
  todoContent: '',
  doneContent: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER: {
      return {
        ...state,
        isStarted: false,
        isRunning: true,
      };
    }
    case START_TIMER_REQUEST: {
      return applyStartTimerRequest(state, action);
    }
    case STOP_TIMER: {
      return {
        ...state,
        isRunning: false,
      };
    }
    case RESET_TIMER: {
      return {
        ...state,
        isRunning: false,
        elapsedTime: 0,
        totalTime: DEFAULT_TIME,
      };
    }
    case SET_TIMER: {
      return {
        ...state,
        isRunning: false,
        elapsedTime: 0,
        totalTime: action.time * 60,
      };
    }
    case ADD_SECOND: {
      if (state.elapsedTime < state.totalTime) {
        return {
          ...state,
          elapsedTime: state.elapsedTime + 1,
        };
      } else {
        return {
          ...state,
          isRunning: false,
        };
      }
    }
    default: {
      return state;
    }
  }
};

const applyStartTimerRequest = (state, action) => {
  return {
    ...state,
    isStarted: false,
    isRunning: true,
  };
};
export default reducer;
