import React, { forwardRef } from "react";
import AceEditor from "react-ace";

import "brace/mode/javascript";
// import "brace/theme/dracula";

import "./Card2.css";

const Card = forwardRef(
  ({ cardBGColor, onEditorLoad, onBeforeLoad, theme }, ref) => {
    return (
      <div
        className="Card2"
        ref={ref.cardRef}
        style={{ backgroundColor: cardBGColor }}
      >
        <div className="Heading" spellCheck="false" contentEditable />
        <div className="Card2Inner">
          <AceEditor
            className="CodeEditor"
            mode="javascript"
            theme={theme}
            name="code-editor"
            width="100%"
            ref={ref.editorRef}
            maxLines={Infinity}
            minLines={15}
            fontSize={20}
            showGutter={false}
            wrapEnabled
            tabSize={2}
            highlightActiveLine={false}
            highlightGutterLine={false}
            onLoad={onEditorLoad}
            onBeforeLoad={onBeforeLoad}
          />
        </div>
        <div className="Footer" spellCheck="false" contentEditable />
      </div>
    );
  }
);

export default Card;
