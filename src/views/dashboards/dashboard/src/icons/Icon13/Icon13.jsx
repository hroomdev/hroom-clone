/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Icon13 = ({ color = "#56CA00", opacity = "unset", className }) => {
  return (
    <svg
      className={`icon-13 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 24 25"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path-4"
        d="M7.41 16.0767L12 11.4967L16.59 16.0767L18 14.6667L12 8.66675L6 14.6667L7.41 16.0767Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
};

Icon13.propTypes = {
  color: PropTypes.string,
  opacity: PropTypes.string,
};
