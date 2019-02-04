import { combineReducers } from 'redux';
import SubredditReducer from './subreddit_reducer';

const rootReducer = combineReducers({
  subreddit: SubredditReducer
});
export default rootReducer;
