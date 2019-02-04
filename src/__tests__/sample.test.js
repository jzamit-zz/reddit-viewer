import { call, put, select } from 'redux-saga/effects';
import { fetchPosts, delay } from '../libs/libs';
import * as ACTIONS from '../actions/actions';
import { poll, getSubredditSelector, TIME_TO_POLL_POSTS } from '../sagas/sagas';

// If we alter the order of our Saga Generator steps, tests will fail.
describe('fetchPosts', () => {
  const postGenerated = poll();
  let output = null;

  it('selector in place', () => {
    output = postGenerated.next().value;
    let expected = select(getSubredditSelector);
    expect(output).toEqual(expected);
  });

  it('dispatch request post', () => {
    output = postGenerated.next({}).value;
    let expected = put(ACTIONS.requestPosts());
    expect(output).toEqual(expected);
  });

  it('should hit api', () => {
    output = postGenerated.next().value;
    let expected = call(
      fetchPosts,
      `https://www.reddit.com/r/reactjs.json?limit=25`
    );
    expect(output).toEqual(expected);
  });

  it('on success dispatch success action', () => {
    const response = { data: [] };
    output = postGenerated.next(response).value;
    let expected = put(ACTIONS.requestPostsSuccess(response.data));
    expect(output).toEqual(expected);
  });

  it('delays before starting again', () => {
    output = postGenerated.next().value;
    let expected = call(delay, TIME_TO_POLL_POSTS);
    expect(output).toEqual(expected);
  });

  it('should dispatch error action if fetching fails', () => {
    output = postGenerated.next().value;
    select(getSubredditSelector);
    const error = {};
    output = postGenerated.throw(error).value;
    let expected = put(ACTIONS.requestPostsError(error));
    expect(output).toEqual(expected);
  });
});
