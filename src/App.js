import React from "react";
import AceEditor from "react-ace";
import domtoimage from "dom-to-image";

import "brace/mode/javascript";
import "brace/theme/dracula";

import "./App.css";

function App() {
  const ref = React.useRef(null);

  const download = () => {
    domtoimage.toBlob(ref.current).then(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `card-${Date.now() + Math.floor(Math.random() * 5000)}`;
      a.click();
    });
  };
  return (
    <div className="App">
      <div className="CardWrapper-CropBug">
        <div className="Card" ref={ref}>
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
      </div>
      <div>
        <button type="button" onClick={download}>
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
