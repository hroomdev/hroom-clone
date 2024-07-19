/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const RemixIconsLineUserStarSmileLine = ({ color = "#2E263D", className }) => {
  return (
    <svg
      className={`remix-icons-line-user-star-smile-line ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path-4"
        d="M12 0.5L16.226 6.683L23.413 8.792L18.838 14.722L19.053 22.208L12 19.69L4.94698 22.208L5.16198 14.722L0.586975 8.792L7.77398 6.683L12 0.5ZM12 4.044L9.02198 8.402L3.95697 9.887L7.18198 14.065L7.02898 19.34L12 17.566L16.97 19.34L16.818 14.065L20.042 9.887L14.978 8.402L12 4.044ZM9.99998 12C9.99998 12.5304 10.2107 13.0391 10.5858 13.4142C10.9608 13.7893 11.4695 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12H16C16 13.0609 15.5785 14.0783 14.8284 14.8284C14.0783 15.5786 13.0608 16 12 16C10.9391 16 9.92169 15.5786 9.17155 14.8284C8.4214 14.0783 7.99998 13.0609 7.99998 12H9.99998Z"
        fill={color}
        fillOpacity="0.9"
      />
    </svg>
  );
};

RemixIconsLineUserStarSmileLine.propTypes = {
  color: PropTypes.string,
};
