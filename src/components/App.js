import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContestPreview from './ContestPreview';
import Header from './Header';

class App extends Component {
  state = {
    pageHeader: 'Default header',
    contests: this.props.initialContests,
  };

  componentDidMount() {
    // timers, listeners and ajax calls
  }

  componentWillUnmount() {
    // clean timers, listeners
  }

  render() {
    const { contests, pageHeader } = this.state;

    return (
      <div className="App">
        <Header message={pageHeader} />
        {contests.map((contest) => (
          <ContestPreview key={contest.id} {...contest} />
        ))}
      </div>
    );
  }
}

App.propTypes = {
  contests: PropTypes.array,
  initialContests: PropTypes.array.isRequired,
};

export default App;
