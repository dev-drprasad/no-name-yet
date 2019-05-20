import React, { forwardRef, useState } from "react";
import CodeEditor from "./CodeEditor";

import Options from "./Options";

import "./Card1.css";

const DEFAULT_SETTINGS = {
  padding: { x: 50, y: 60 },
  theme: "one-dark",
  mode: "javascript",
  cardBGColor: "#00a8f0",
};

const Card = forwardRef((_, ref) => {
  const [options, setOptions] = useState(() => DEFAULT_SETTINGS);

  const { padding, theme, mode, cardBGColor } = options;

  return (
    <>
      <Options defaults={DEFAULT_SETTINGS} onChange={options => setOptions(options)} />
      <div
        className="Card"
        ref={ref.cardRef}
        style={{
          backgroundColor: cardBGColor,
          padding: `${padding.y}px ${padding.x}px`,
        }}
      >
        <div className="CardInner">
          <div className="Content" spellCheck="false" contentEditable />
          <CodeEditor ref={ref.editorRef} theme={theme} mode={mode} />
        </div>
      </div>
    </>
  );
});

export default Card;
