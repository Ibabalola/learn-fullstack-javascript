import React, { Component } from 'react';
import PropType from 'prop-types';

class ContestPreview extends Component {
  onClick = () => {
    this.props.onClickHandler(this.props.id);
  };

  render() {
    const { categoryName, contestName } = this.props;

    return (
      <div className="link ContestPreview" onClick={this.onClick}>
        <div className="category-name">{categoryName}</div>
        <div className="contest-name">{contestName}</div>
      </div>
    );
  }
}

ContestPreview.propTypes = {
  id: PropType.number.isRequired,
  categoryName: PropType.string.isRequired,
  contestName: PropType.string.isRequired,
  onClickHandler: PropType.func.isRequired,
};

export default ContestPreview;
