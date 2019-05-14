import React, { forwardRef, useState } from "react";
import CodeEditor from "./CodeEditor";

import Padding from "./Padding";

import "./Card1.css";

const Card = forwardRef(({ cardBGColor, theme, mode }, ref) => {
  const [padding, setPadding] = useState({ x: 40, y: 40 });

  return (
    <>
      <Padding defaults={padding} onChange={padding => setPadding(padding)} />
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
