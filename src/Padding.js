import React, { useRef } from "react";

const Padding = ({ defaults, onChange }) => {
  const paddingRef = useRef({ ...defaults });

  const handlePaddingXChange = paddingX => {
    paddingRef.current.x = Number(paddingX);
    onChange({ ...paddingRef.current });
  };

  const handlePaddingYChange = paddingY => {
    paddingRef.current.y = Number(paddingY);
    onChange({ ...paddingRef.current });
  };
  return (
    <>
      <label>
        Padding (X):
        <input
          type="number"
          onChange={e => handlePaddingXChange(e.target.value)}
          defaultValue={defaults.x}
          min={10}
          max={120}
        />
      </label>
      <label>
        Padding (Y):
        <input
          type="number"
          onChange={e => handlePaddingYChange(e.target.value)}
          defaultValue={defaults.y}
          min={10}
          max={120}
        />
      </label>
    </>
  );
};

export default Padding;
