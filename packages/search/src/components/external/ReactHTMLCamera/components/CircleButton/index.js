import React from 'react';
import PropTypes from 'prop-types';

import './styles/circleButton.css';

export const CircleButton = ({ onClick, isClicked }) => {
  const innerCircleClasses = isClicked ? 'is-clicked' : '';
  return (
    <div id="containerd-circles">
      <div
        id="outerd-circle"
        onClick = {
          (e) => {
            if (!isClicked) {
              onClick();
            }
          }
        }
      >
        <div id="innerd-circle" className={innerCircleClasses}>
        </div>
      </div>
    </div>
  );
};

CircleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired
};

export default CircleButton;
