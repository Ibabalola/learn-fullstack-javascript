import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchContest, fetchContestList } from '../api';
import ContestList from './ContestList';
import Contest from './Contest';
import Header from './Header';

const pushState = (obj, url) => window.history.pushState(obj, '', url);
const onPopState = (handler) => (window.onpopstate = handler);

class App extends Component {
  state = this.props.initialData;

  componentDidMount() {
    // timers, listeners and ajax calls
    onPopState((event) => {
      this.setState({
        currentContestId: (event.state || {}).currentContestId,
      });
    });
  }

  componentWillUnmount() {
    // clean timers, listeners
    onPopState(null);
  }

  doFetchContest = (contestId) => {
    pushState({ currentContestId: contestId }, `/contest/${contestId}`);
    fetchContest(contestId).then((contest) => {
      this.setState({
        currentContestId: contestId,
        contests: {
          ...this.state.contests,
          [contest.id]: contest,
        },
      });
    });
  };

  doFetchContestList = () => {
    pushState({ currentContestId: null }, '/');
    fetchContestList().then((contests) => {
      this.setState({
        currentContestId: null,
        contests,
      });
    });
  };

  pageHeader = () =>
    this.state.currentContestId
      ? this.currentContest().contestName
      : 'Naming Contests';

  currentContest = () => this.state.contests[this.state.currentContestId];

  currentContent = () =>
    this.state.currentContestId ? (
      <Contest
        contestListClick={this.doFetchContestList}
        {...this.currentContest()}
      />
    ) : (
      <ContestList
        onContestClick={this.doFetchContest}
        contests={this.state.contests}
      />
    );

  render() {
    return (
      <div className="App">
        <Header message={this.pageHeader()} />
        {this.currentContent()}
      </div>
    );
  }
}

App.propTypes = {
  contests: PropTypes.array,
  initialData: PropTypes.object.isRequired,
};

export default App;
