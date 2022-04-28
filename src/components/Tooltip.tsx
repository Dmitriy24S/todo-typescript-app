import React, { useState } from "react";

type TooltipProps = {
  text: string;
  children: JSX.Element;
};

const Tooltip = ({ children, text, ...rest }: TooltipProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="tooltip-container">
      {/* tooltip text */}
      <div className={show ? "tooltip-box visible" : "tooltip-box"}>
        {text}
        {/* <span className="tooltip-arrow" /> */}
      </div>
      {/* button content */}
      <div
        className="flex items-center"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        // {...rest}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
