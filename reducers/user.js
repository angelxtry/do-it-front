// ACTION
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

// INITIAL
const initialState = {
  isLoggingIn: false,
  loginError: '',
  signupError: '',
  me: null,
};

// me: {
//   userId: 1,
//   nickname: 'aaa',
// }

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return applySignupRequest(state, action);
    case SIGN_UP_SUCCESS:
      return applySignupSuccess(state, action);
    case SIGN_UP_FAILURE:
      return applySignupFailure(state, action);

    case LOG_IN_REQUEST:
      return applyLoginRequest(state, action);
    case LOG_IN_SUCCESS:
      return applyLoginSuccess(state, action);
    case LOG_IN_FAILURE:
      return applyLoginFailure(state, action);
    case LOG_OUT_REQUEST:
      return applyLogoutRequest(state, action);
    case LOG_OUT_SUCCESS:
      return applyLogoutRequest(state, action);
    case LOG_OUT_FAILURE:
      return applyLogoutRequest(state, action);
    case LOAD_USER_REQUEST:
      return applyLoadUserRequest(state, action);
    case LOAD_USER_SUCCESS:
      return applyLoadUserSuccess(state, action);
    case LOAD_USER_FAILURE:
      return applyLoadUserFailure(state, action);
    default: {
      return state;
    }
  }
};

const applySignupRequest = (state, action) => {
  return {
    ...state,
    signupError: '',
  };
};

const applySignupSuccess = (state, action) => {
  return {
    ...state,
  };
};

const applySignupFailure = (state, action) => {
  return {
    ...state,
    signupError: action.error,
  };
};

const applyLoginRequest = (state, action) => {
  return {
    ...state,
    isLoggingIn: true,
    loginError: '',
    me: null,
  };
};

const applyLoginSuccess = (state, action) => {
  return {
    ...state,
    isLoggingIn: false,
    me: action.payload,
  };
};

const applyLoginFailure = (state, action) => {
  return {
    ...state,
    isLoggingIn: false,
    loginError: action.error,
    me: null,
  };
};

const applyLogoutRequest = (state, action) => {
  return {
    ...state,
    me: null,
  };
};

const applyLoadUserRequest = (state, action) => {
  return {
    ...state,
    loginError: '',
    me: null,
  };
};

const applyLoadUserSuccess = (state, action) => {
  return {
    ...state,
    me: action.payload,
  };
};

const applyLoadUserFailure = (state, action) => {
  return {
    ...state,
    loginError: action.error,
    me: null,
  };
};

export default reducer;
