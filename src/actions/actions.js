import { START_POLLING, STOP_POLLING, REQUEST_POSTS, REQUEST_POSTS_SUCCESS, REQUEST_POSTS_ERROR } from '../actions/types';

//ACTION CREATORS
  export function requestPosts() {
    return {
      type: REQUEST_POSTS
    }
  }

  export function requestPostsSuccess( data ) {
    return {
      type: REQUEST_POSTS_SUCCESS,
      posts: data.posts,
      before:data.before,
      after: data.after,
    }
  }

  export function requestPostsError(error) {
    return {
      type: REQUEST_POSTS_ERROR,
      error
    }
  }

export const startPolling = () => ({
  type: START_POLLING
});

export const stopPolling = () => ({
  type: STOP_POLLING
});