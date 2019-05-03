import React, { forwardRef } from "react";
import AceEditor from "react-ace";

import "brace/mode/javascript";
// import "brace/theme/dracula";

const Card = forwardRef(
  ({ cardBGColor, onEditorLoad, onBeforeLoad, theme }, ref) => {
    return (
      <div
        className="Card"
        ref={ref.cardRef}
        style={{ backgroundColor: cardBGColor }}
      >
        <div className="CardInner">
          <div className="Content" spellCheck="false" contentEditable />
          <AceEditor
            ref={ref.editorRef}
            className="CodeEditor"
            mode="javascript"
            theme={theme}
            name="code-editor"
            width="100%"
            maxLines={Infinity}
            minLines={15}
            fontSize={18}
            showGutter={false}
            wrapEnabled
            tabSize={2}
            highlightActiveLine={false}
            highlightGutterLine={false}
            onLoad={onEditorLoad}
            onBeforeLoad={onBeforeLoad}
          />
        </div>
      </div>
    );
  }
);

export default Card;
