import React, { useRef } from "react";

const Padding = ({ defaults, onChange }) => {
  const paddingRef = useRef({ ...defaults });

  const handlePaddingXChange = paddingX => {
    paddingRef.current.x = paddingX;
    onChange({ x: paddingX, y: paddingRef.current.y });
  };

  const handlePaddingYChange = paddingY => {
    paddingRef.current.y = paddingY;
    onChange({ x: paddingRef.current.x, y: paddingY });
  };
  return (
    <>
      <label>
        Padding (X):
        <input
          type="number"
          onChange={e => handlePaddingXChange(e.target.value)}
          defaultValue={defaults.x}
          min={40}
          max={120}
        />
      </label>
      <label>
        Padding (Y):
        <input
          type="number"
          onChange={e => handlePaddingYChange(e.target.value)}
          defaultValue={defaults.y}
          min={40}
          max={120}
        />
      </label>
    </>
  );
};

export default Padding;
