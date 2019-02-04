import {
  REQUEST_POSTS,
  REQUEST_POSTS_SUCCESS,
  REQUEST_POSTS_ERROR,
  START_POLLING,
  STOP_POLLING
} from '../actions/types';

const initalState = {
  after: null,
  before: null,
  count: 0,
  error: null,
  isFetching: false,
  isPolling: false,
  items: []
};

export default function posts(state = initalState, action) {
  switch (action.type) {
    case START_POLLING:
      return Object.assign({}, state, {
        isPolling: true
      });

    case STOP_POLLING:
      return Object.assign({}, state, {
        isPolling: false
      });

    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      });

    case REQUEST_POSTS_SUCCESS:
      return Object.assign({}, state, {
        after: action.after,
        before: action.before,
        count: state.count + action.posts.length,
        isFetching: false,
        items: [...state.items, ...action.posts]
      });

    case REQUEST_POSTS_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: false
      });

    default:
      return state;
  }
}
