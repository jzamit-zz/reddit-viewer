import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { startPolling , stopPolling} from '../actions/actions';
import { Post } from '../components/Post';
import '../App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLoad: false,
      allItems: [],
      showItems: [],
      page: 1,
      newItems: false,
      isLoading: true
    };
  }
  componentDidMount() {
    this.props.startPolling();
  }

  componentWillUnmount() {
    this.props.stopPolling();
  }

  loadMore = () => {
    if (this.state.page * 25 < this.state.allItems.length) {
      const page = this.state.page + 1;
      const showItems = this.state.allItems.slice(0, 25 * page);
      this.setState({ showItems, page });
    }
  };

  componentWillReceiveProps(nextProps) {
    this.handleNextProps(nextProps);
  }

  handleNextProps = nextProps => {
    if (nextProps.subreddit.items) {
      if (nextProps.subreddit.items.length > 0 && !this.state.initialLoad) {
        this.setState({
          showItems: nextProps.subreddit.items,
          allItems: nextProps.subreddit.items,
          initialLoad: true,
          isLoading: false
        });
      } else {
        this.setState({
          allItems: nextProps.subreddit.items
        });
      }
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    //Only re render the components if these conditions are met.
    if (
      this.state.allItems.length !== nextState.allItems.length ||
      this.state.showItems.length !== nextState.showItems.length
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { allItems, showItems, isLoading } = this.state;
    const hasError = this.props.subreddit.error;

    return (
      <Fragment>
        <header className="header">
          <h1> Welcome to Reddit Viewer </h1>
        </header>

        <section className="section">
          {hasError && <h2>Some error happended: {hasError.message}</h2>}
          {isLoading && showItems.length === 0 && !hasError && (
            <h2>Loading...</h2>
          )}
          {!isLoading && showItems.length === 0 && !hasError && <h2>Empty.</h2>}

          {showItems.length > 0 &&
            showItems.map((post, i) => <Post key={post.id} {...post} />)}
        </section>
        {allItems.length > showItems.length && (
          <section className="section">
            <button
              onClick={this.loadMore.bind(this)}
              style={{ height: '80px', width: '200px' }}
            >
              Load More
            </button>
          </section>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ subreddit }) {
  return { subreddit };
}

const mapDispatchToProps = {
  startPolling, stopPolling
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
