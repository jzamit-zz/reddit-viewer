import { call, put, take, race, all, select } from 'redux-saga/effects';
import * as ACTIONS from '../actions/actions';
import { delay, fetchPosts } from '../libs/libs';

//Default config
export const TIME_TO_POLL_POSTS = '60000';

export const getSubredditSelector = state => state.subreddit;

export function* poll(action) {
  while (true) {
    try {
      const subreddit = yield select(getSubredditSelector);
      const { after, count } = subreddit;
      let baseUrl = `https://www.reddit.com/r/reactjs.json?limit=25`;
      baseUrl += after ? `&after=${after}` : '';
      baseUrl += count ? `&count=${count}` : '';

      yield put(ACTIONS.requestPosts());
      const response = yield call(fetchPosts, baseUrl);
      yield put(ACTIONS.requestPostsSuccess(response));
      yield call(delay, TIME_TO_POLL_POSTS);
    } catch (e) {
      // API call was unsuccessful
      yield put(ACTIONS.requestPostsError(e));
    }
  }
}

function* watchPollingTasks() {
  while (true) {
    const action = yield take(ACTIONS.startPolling().type);
    yield race([call(poll, action), take(ACTIONS.stopPolling().type)]);
  }
}

export default function* rootSaga() {
  yield all([watchPollingTasks()]);
}
