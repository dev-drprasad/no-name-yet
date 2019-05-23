import React, { forwardRef, useState } from "react";
import AceEditor from "react-ace";

import "brace/mode/golang";
// import "brace/theme/dracula";

import "./Card2.css";
import ContentEditor from "./ContentEditor";
import CodeEditor from "./CodeEditor";

import Options from "./Options";

const DEFAULT_SETTINGS = {
  padding: { x: 50, y: 60 },
  theme: "one-dark",
  mode: "javascript",
  cardBGColor: "#00a8f0",
};

const Card = forwardRef((_, ref) => {
  const [options, setOptions] = useState(DEFAULT_SETTINGS);

  const { padding, theme, mode, cardBGColor } = options;
  return (
    <>
      <Options defaults={DEFAULT_SETTINGS} onChange={options => setOptions(options)} />
      <div
        className="Card2"
        ref={ref.cardRef}
        style={{
          backgroundColor: cardBGColor,
          padding: `${padding.y}px ${padding.x}px`,
        }}
      >
        <ContentEditor className="CardHeading" defaultFontSize={20} />
        <div className="Card2Inner">
          <CodeEditor ref={ref.editorRef} theme={theme} mode={mode} />
        </div>
        <ContentEditor className="CardFooter" />
      </div>
    </>
  );
});

export default Card;
