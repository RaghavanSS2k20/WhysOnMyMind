import * as React from "react";
export const EditSVGComponent = (props) => (
  <svg
    fill="#000000"
    width={props.w}
    height={props.h}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M2,21H8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM20.207,9.293a1,1,0,0,0-1.414,0l-6.25,6.25a1.011,1.011,0,0,0-.241.391l-1.25,3.75A1,1,0,0,0,12,21a1.014,1.014,0,0,0,.316-.051l3.75-1.25a1,1,0,0,0,.391-.242l6.25-6.25a1,1,0,0,0,0-1.414Zm-5,8.583-1.629.543.543-1.629L19.5,11.414,20.586,12.5Z" />
  </svg>
);
export const HamburgerSVGComponent = (props) => (
  <svg
    fill="#000000"
    width={props.w}
    height={props.h}
    viewBox="-2.5 0 19 19"
    xmlns="http://www.w3.org/2000/svg"
    className="cf-icon-svg"
    {...props}
  >
    <path d="M.789 4.836a1.03 1.03 0 0 1 1.03-1.029h10.363a1.03 1.03 0 1 1 0 2.059H1.818A1.03 1.03 0 0 1 .79 4.836zm12.422 4.347a1.03 1.03 0 0 1-1.03 1.029H1.819a1.03 1.03 0 0 1 0-2.059h10.364a1.03 1.03 0 0 1 1.029 1.03zm0 4.345a1.03 1.03 0 0 1-1.03 1.03H1.819a1.03 1.03 0 1 1 0-2.059h10.364a1.03 1.03 0 0 1 1.029 1.03z" />
  </svg>
);

