export const START_TIMER = 'START_TIMER';
export const START_TIMER_AND_TODO_CREATE_REQUEST =
  'START_TIMER_AND_TODO_CREATE_REQUEST';
export const START_TIMER_AND_TODO_CREATE_SUCCESS =
  'START_TIMER_AND_TODO_CREATE_SUCCESS';
export const START_TIMER_AND_TODO_CREATE_FAILURE =
  'START_TIMER_AND_TODO_CREATE_FAILURE';

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
  isStarting: false,
  isRunning: false,
  todoCreateError: '',
  todoContent: '',
  doneContent: '',
  todoId: 0,
  timelineId: 0,
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
    case START_TIMER_AND_TODO_CREATE_REQUEST: {
      return applyStartTimerAndTodoCreateRequest(state, action);
    }
    case START_TIMER_AND_TODO_CREATE_SUCCESS: {
      return applyStartTimerAndTodoCreateSuccess(state, action);
    }
    case START_TIMER_AND_TODO_CREATE_FAILURE: {
      return applyStartTimerAndTodoCreateFailure(state, action);
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

const applyStartTimerAndTodoCreateRequest = (state, action) => {
  return {
    ...state,
    isStarted: false,
    isStarting: true,
    isRunning: false,
  };
};

const applyStartTimerAndTodoCreateSuccess = (state, action) => {
  // console.log('REDUCER: ', action.payload);
  return {
    ...state,
    isStarted: true,
    isStarting: false,
    isRunning: true,
    todoId: action.payload.todoId,
    timelineId: action.payload.timelineId,
  };
};

const applyStartTimerAndTodoCreateFailure = (state, action) => {
  return {
    ...state,
    isStarted: false,
    isStarting: false,
    isRunning: false,
    todoCreateError: action.error,
  };
};
export default reducer;
