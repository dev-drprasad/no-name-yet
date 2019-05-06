import React from "react";

import "./ContentEditor.css";

const ContentEditor = () => {
  return (
    <div className="ContentEditor" contentEditable spellCheck="false">
      <div className="TextFormatBar">
        <input
          className="TextColorButton"
          type="button"
          value="A"
          title="text color"
        />
        <input
          className="BGColorButton"
          type="button"
          title="background color"
        />
      </div>
    </div>
  );
};

export default ContentEditor;
