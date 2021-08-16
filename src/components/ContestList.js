import React from 'react';
import PropTypes from 'prop-types';
import ContestPreview from './ContestPreview';

const ContestList = ({ contests, onContestClick }) => {
  return Object.keys(contests).map((contestId) => (
    <ContestPreview
      key={contestId}
      onClickHandler={onContestClick}
      {...contests[contestId]}
    />
  ));
};

ContestList.propTypes = {
  contests: PropTypes.object,
  onContestClick: PropTypes.func.isRequired,
};

export default ContestList;
