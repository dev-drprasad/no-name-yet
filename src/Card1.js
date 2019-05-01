import React, { forwardRef } from "react";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/dracula";

const Card = forwardRef(({ cardBGColor }, ref) => {
  return (
    <div className="Card" ref={ref} style={{ backgroundColor: cardBGColor }}>
      <div className="CardInner">
        <div className="Content" contentEditable />
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
    </div>
  );
});

export default Card;
