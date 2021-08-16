import React, { Component } from 'react';
import PropType from 'prop-types';

class Contest extends Component {
  render() {
    const { contestListClick } = this.props;
    return (
      <div className="Contest">
        <div className="contest-description">{this.props.description}</div>
        <div className="home-link link" onClick={contestListClick}>
          Contest List
        </div>
      </div>
    );
  }
}

Contest.propTypes = {
  description: PropType.string.isRequired,
  contestListClick: PropType.func.isRequired,
};

export default Contest;
