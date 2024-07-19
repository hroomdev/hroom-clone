/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Arrowdropupfilled2 = ({ color = "black", opacity = "unset", className }) => {
  return (
    <svg
      className={`arrowdropupfilled-2 ${className}`}
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path-4"
        d="M4.66666 9.33333L7.99999 6L11.3333 9.33333H4.66666Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
};

Arrowdropupfilled2.propTypes = {
  color: PropTypes.string,
  opacity: PropTypes.string,
};
