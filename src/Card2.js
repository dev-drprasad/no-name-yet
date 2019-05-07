import React, { forwardRef } from "react";
import AceEditor from "react-ace";

import "brace/mode/golang";
// import "brace/theme/dracula";

import "./Card2.css";
import ContentEditor from "./ContentEditor";
import CodeEditor from "./CodeEditor";

const Card = forwardRef(({ cardBGColor, theme, mode }, ref) => {
  return (
    <div
      className="Card2"
      ref={ref.cardRef}
      style={{ backgroundColor: cardBGColor }}
    >
      <ContentEditor className="CardHeading" />
      <div className="Card2Inner">
        <CodeEditor ref={ref.editorRef} theme={theme} mode={mode} />
      </div>
      <ContentEditor className="CardFooter" />
    </div>
  );
});

export default Card;
