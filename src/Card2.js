import React, { forwardRef, useState } from "react";
import AceEditor from "react-ace";

import "brace/mode/golang";
// import "brace/theme/dracula";

import "./Card2.css";
import ContentEditor from "./ContentEditor";
import CodeEditor from "./CodeEditor";

import Padding from "./Padding";

const Card = forwardRef(({ cardBGColor, theme, mode }, ref) => {
  const [padding, setPadding] = useState({ x: 40, y: 40 });
  return (
    <>
      <Padding defaults={padding} onChange={padding => setPadding(padding)} />
      <div
        className="Card2"
        ref={ref.cardRef}
        style={{
          backgroundColor: cardBGColor,
          padding: `${padding.y}px ${padding.x}px`
        }}
      >
        <ContentEditor className="CardHeading" />
        <div className="Card2Inner">
          <CodeEditor ref={ref.editorRef} theme={theme} mode={mode} />
        </div>
        <ContentEditor className="CardFooter" />
      </div>
    </>
  );
});

export default Card;
