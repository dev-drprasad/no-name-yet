import React, { forwardRef } from "react";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/dracula";

import "./Card2.css";

const Card = forwardRef(({ cardBGColor }, ref) => {
  return (
    <div className="Card2" ref={ref} style={{ backgroundColor: cardBGColor }}>
      <div className="Heading" contentEditable />
      <div className="Card2Inner">
        <AceEditor
          className="CodeEditor"
          mode="javascript"
          theme="dracula"
          name="code-editor"
          width="100%"
          height="100%"
          fontSize={20}
          showGutter={false}
          tabSize={2}
          highlightActiveLine={false}
          highlightGutterLine={false}
        />
      </div>
      <div className="Footer" contentEditable />
    </div>
  );
});

export default Card;
