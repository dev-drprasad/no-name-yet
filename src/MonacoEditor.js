import React from "react";
import MonacoEditor from "react-monaco-editor";

import "./MonacoEditor.css";

const Editor = () => {
  const editorRef = React.useRef(null);
  const numLines = React.useRef(null);
  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  };
  const editorWillMount = monaco => {};
  const onChange = (newValue, e) => {
    if (editorRef.current) {
      // const newNumLines = editorRef.current._domElement.getElementsByClassName(
      //   "view-line"
      // ).length;
      const newNumLines = editorRef.current._modelData.viewModel.getLineCount();
      const w = editorRef.current._domElement.clientWidth;
      editorRef.current._domElement.style.width = `${w + 15}px`;
      // console.log("editorRef.current.viewModel :", editorRef.current.viewModel);
      if (numLines.current !== newNumLines) {
        // numLines.current = newNumLines;
        console.log("editorRef.current :", editorRef.current);
        // editorRef.current._domElement
        //   .getElementsByClassName("monaco-editor")[0]
        //   .removeAttribute("style");
        setTimeout(() => {
          // const newNumLines = editorRef.current._domElement.getElementsByClassName(
          //   "view-line"
          // ).length;
          const lineHeight = editorRef.current._domElement.getElementsByClassName(
            "view-line"
          )[0].clientHeight;
          console.log("lineHeight :", lineHeight);
          editorRef.current._domElement.style.height = `${lineHeight *
            newNumLines +
            30}px`;
        }, 0);
      }
    }
  };
  const options = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: false
    },
    lineNumbers: "off",
    links: false,
    matchBrackets: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: "on",
    selectionHighlight: false,
    lineDecorationsWidth: 0,
    folding: false
  };

  return (
    <MonacoEditor
      width="100%"
      height="100%"
      language="javascript"
      theme="vs-dark"
      value="// Type your code"
      options={options}
      onChange={onChange}
      editorWillMount={editorWillMount}
      editorDidMount={editorDidMount}
    />
  );
};

export default Editor;

// https://stackoverflow.com/questions/47017753/monaco-editor-dynamically-resizable/
// https://stackoverflow.com/questions/53448735/is-there-a-way-to-completely-hide-the-gutter-of-monaco-editor
