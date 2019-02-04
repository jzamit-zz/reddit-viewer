This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


Custom Notes

Architecture:

For this app, I used React, Redux, Redux Saga and Redux Logger for development purposes. For displaying time as reddit I used date-fns library.

I decided to use Redux Saga because I researched about automatic polling and understood that this was a good fit for my requirement, also as I never used Redux Saga before so it was a good time to learn to use such popular tool.


Code Structure:

Generated code is under src/ folder.

_tests_:
    contains test made.

actions:
    contains action types and actionCreators.

components:
    contains components without local state (dumb components) or redux access.

containers:
    contains components with redux access and can have local state also.

libs:
    contains code that can be reused in the app.

reducers: 
    contains combineReducers configuration and subreddit reducer.

sagas:
    contains Sagas implementation code.


About requirements:

Regarding the automatic polling, as already mention before what I did was to setup redux saga, I put in the middlewares to get it connected to redux, after that I reasearched how to wire things up, so I could call action creators to start the polling process, call the api with the required parameters, and later I need to get access to my store data in redux from there, so I could continue passing "after" param and "count" param so Reddit api give me both params (after and before) that change between calls to the Reddit Api.

After getting this working I need to decide how I would show the data in my component, so I created some local state variables, one allItems array to hold the automatic polling that is getting from redux state via props, and the other, showItems array, to hold only the partial items, so when I need to show the items I map over and render the posts limiting to be 25 per time. When I know that the automatic polling has more posts, more than the ones in showPosts, I render a button to load more items. What I did was simply slice the allItems arrays, to get from 25 to 25 and so on.

Testing:

I had to do some research also because I didn't know how to test Redux Saga, after that I started to test each step in the process of the automatic polling, also the catch block in case of some failure when consumming the api.







