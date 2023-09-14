import * as React from "react";
const LikeSVGComponent = (props) => (
  <svg
    id="Uploaded to svgrepo.com"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={props.w}
    height={props.h}
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    {...props}
  >
    <path
      stroke="black"
      fill={props.fill}
      strokeWidth={2}
      d="M23,3c-3.014,0-5.636,1.668-7,4.13C14.636,4.668,12.014,3,9,3c-4.418,0-8,3.582-8,8 c0,11,12.857,18,15,18s15-7,15-18C31,6.582,27.418,3,23,3z M9,7c-2.206,0-4,1.794-4,4c0,0.552-0.448,1-1,1s-1-0.448-1-1 c0-3.309,2.691-6,6-6c0.552,0,1,0.448,1,1S9.552,7,9,7z"
    />
  </svg>
);
export default LikeSVGComponent;
