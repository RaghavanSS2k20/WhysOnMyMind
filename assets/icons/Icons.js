export const PinBoardSVGComponent = (props) => (
    <svg
      fill="#5F6B7C"
      width={props.size}
      height={props.size}
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <title>{"pinboard-solid"}</title>
      <path
        className="clr-i-solid clr-i-solid-path-1"
        d="M30,30,6,30,6,6H22V4H6A2,2,0,0,0,4,6V30a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V14H30Z"
      />
      <path
        className="clr-i-solid clr-i-solid-path-2"
        d="M33.57,9.33l-7-7a1,1,0,0,0-1.41,1.41l1.38,1.38-4,4c-2-.87-4.35.14-5.92,1.68l-.72.71,3.54,3.54-3.67,3.67,1.41,1.41,3.67-3.67L24.37,20l.71-.72c1.54-1.57,2.55-3.91,1.68-5.92l4-4,1.38,1.38a1,1,0,1,0,1.41-1.41Z"
      />
      <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
    </svg>
  );
  
  