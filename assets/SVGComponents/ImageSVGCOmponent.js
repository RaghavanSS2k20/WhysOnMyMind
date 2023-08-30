import * as React from "react";
const ImageSVGComponent = (props) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#000000"
    strokeWidth={1}
    strokeLinecap="round"
    strokeLinejoin="miter"
    {...props}
  >
    <polygon points="22 15.5 17 10 10.59 16.99 6.5 13 2 17.5 2 22 22 22 22 15.5" />
    <rect x={2} y={2} width={20} height={20} rx={0} />
    <line
      x1={6.99}
      y1={7}
      x2={7}
      y2={7}
      strokeLinecap="round"
      strokeWidth={2}
    />
  </svg>
);
export default ImageSVGComponent;
