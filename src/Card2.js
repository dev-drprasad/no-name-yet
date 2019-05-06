import React, { forwardRef } from "react";
import AceEditor from "react-ace";

import "brace/mode/golang";
// import "brace/theme/dracula";

import "./Card2.css";
import ContentEditor from "./ContentEditor";

const Card = forwardRef(
  ({ cardBGColor, onEditorLoad, onBeforeLoad, theme }, ref) => {
    return (
      <div
        className="Card2"
        ref={ref.cardRef}
        style={{ backgroundColor: cardBGColor }}
      >
        <ContentEditor className="CardHeading" />
        <div className="Card2Inner">
          <AceEditor
            className="CodeEditor"
            mode="golang"
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
        <ContentEditor className="CardFooter" />
      </div>
    );
  }
);

export default Card;
